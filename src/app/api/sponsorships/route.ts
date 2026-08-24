import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/server/prisma";
import { getDecodedToken, logError } from "@/lib/server/utils";

const CATEGORIES = [
  "csr",
  "general_sponsorship",
  "school_day",
  "happiness",
  "seat",
] as const;

type Category = (typeof CATEGORIES)[number];

function isCategory(value: unknown): value is Category {
  return typeof value === "string" && CATEGORIES.includes(value as Category);
}

export async function GET(req: NextRequest) {
  try {
    const tokenData = await getDecodedToken();
    if (!tokenData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const unreadOnly = req.nextUrl.searchParams.get("unread") === "true";

    const sponsors = await prisma.sponsor.findMany({
      where: unreadOnly ? { is_read: false } : undefined,
      orderBy: { created_at: "desc" },
    });

    const unreadCount = await prisma.sponsor.count({
      where: { is_read: false },
    });

    return NextResponse.json({ sponsors, unreadCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching sponsorships:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const category = body.category;
    const amount = Number(body.amount);
    const fullName = body.fullName?.toString().trim();
    const email = body.email?.toString().trim() || null;
    const phone = body.phone?.toString().trim() || null;
    const organizationName = body.organizationName?.toString().trim() || null;
    const celebration = body.celebration?.toString().trim() || null;
    const schoolDays =
      body.schoolDays != null ? Number(body.schoolDays) : null;
    const seatsCount =
      body.seatsCount != null ? Number(body.seatsCount) : null;

    if (!isCategory(category)) {
      return NextResponse.json(
        { message: "Invalid sponsorship category" },
        { status: 400 }
      );
    }
    if (!fullName) {
      return NextResponse.json(
        { message: "Full name is required" },
        { status: 400 }
      );
    }
    if (!Number.isFinite(amount) || amount < 1) {
      return NextResponse.json(
        { message: "Valid amount is required" },
        { status: 400 }
      );
    }

    if (category === "csr" || category === "general_sponsorship") {
      if (!organizationName) {
        return NextResponse.json(
          { message: "Organisation name is required" },
          { status: 400 }
        );
      }
    }
    if (category === "happiness" && !celebration) {
      return NextResponse.json(
        { message: "Celebration details are required" },
        { status: 400 }
      );
    }
    if (
      category === "school_day" &&
      (!schoolDays || !Number.isInteger(schoolDays) || schoolDays < 1)
    ) {
      return NextResponse.json(
        { message: "Valid number of school days is required" },
        { status: 400 }
      );
    }

    const sponsor = await prisma.sponsor.create({
      data: {
        category,
        amount: Math.floor(amount),
        full_name: fullName,
        email,
        phone,
        organization_name: organizationName,
        celebration,
        school_days:
          schoolDays != null && Number.isFinite(schoolDays)
            ? Math.floor(schoolDays)
            : null,
        seats_count:
          seatsCount != null && Number.isFinite(seatsCount)
            ? Math.floor(seatsCount)
            : null,
      },
    });

    return NextResponse.json({ success: true, sponsor }, { status: 201 });
  } catch (error) {
    console.error("Error creating sponsorship:", error);
    logError(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
