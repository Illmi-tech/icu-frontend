import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";
import { logError } from "@/lib/server/utils";

const ROWS = 5;
const COLUMNS = 10;
const SEAT_PRICE = 500;

export async function GET() {
  try {
    const seats = await prisma.seat.findMany({
      select: { row: true, column: true, full_name: true },
    });
    return NextResponse.json(
      { rows: ROWS, columns: COLUMNS, price: SEAT_PRICE, taken: seats },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching seats:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fullName = body.fullName?.toString().trim();
    const cardNumber = body.cardNumber?.toString().replace(/\s/g, "");
    const expiry = body.expiry?.toString().trim();
    const cvv = body.cvv?.toString().trim();
    const seats: { row: number; column: number }[] = Array.isArray(body.seats)
      ? body.seats
      : [];

    if (!fullName) {
      return NextResponse.json({ message: "Full name is required" }, { status: 400 });
    }
    // Simulated payment: validate card format only, nothing is charged or stored
    if (!cardNumber || !/^\d{13,19}$/.test(cardNumber)) {
      return NextResponse.json({ message: "Invalid card number" }, { status: 400 });
    }
    if (!expiry || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      return NextResponse.json({ message: "Invalid expiry date (use MM/YY)" }, { status: 400 });
    }
    if (!cvv || !/^\d{3,4}$/.test(cvv)) {
      return NextResponse.json({ message: "Invalid CVV" }, { status: 400 });
    }
    if (seats.length === 0) {
      return NextResponse.json({ message: "Select at least one seat" }, { status: 400 });
    }

    const invalid = seats.some(
      (s) =>
        !Number.isInteger(s.row) ||
        !Number.isInteger(s.column) ||
        s.row < 0 ||
        s.row >= ROWS ||
        s.column < 0 ||
        s.column >= COLUMNS
    );
    if (invalid) {
      return NextResponse.json({ message: "Invalid seat selection" }, { status: 400 });
    }

    const alreadyTaken = await prisma.seat.findMany({
      where: {
        OR: seats.map((s) => ({ row: s.row, column: s.column })),
      },
      select: { row: true, column: true },
    });
    if (alreadyTaken.length > 0) {
      return NextResponse.json(
        { message: "Some seats were already taken", taken: alreadyTaken },
        { status: 409 }
      );
    }

    await prisma.seat.createMany({
      data: seats.map((s) => ({ row: s.row, column: s.column, full_name: fullName })),
      skipDuplicates: true,
    });

    const amount = seats.length * SEAT_PRICE;

    await prisma.sponsor.create({
      data: {
        category: "seat",
        amount,
        full_name: fullName,
        seats_count: seats.length,
      },
    });

    return NextResponse.json(
      { success: true, amount },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error purchasing seats:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
