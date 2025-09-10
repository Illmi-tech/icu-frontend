import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
  email?: string;
  role?: string;
  
}

export async function getDecodedToken(): Promise<DecodedToken | null> {
  try {
    const cookieStore = await cookies(); 
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as DecodedToken;

    return decoded;
  } catch (error) {
    console.error("Invalid or missing token:", error);
    return null;
  }
}

export function generateSlug(title: string): string {
  // Lowercase, remove special characters, replace spaces with hyphens
  const baseSlug = title
    .toLowerCase()
    .replace(/\s+/g, "-")        // spaces → hyphens
    .replace(/[^a-z0-9-]/g, ""); // remove non-alphanumeric except -

  // Add random 3-digit number
  const randomNumber = Math.floor(Math.random() * 900 + 100); // 100–999
  return `${baseSlug}-${randomNumber}`;
}