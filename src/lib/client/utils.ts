import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn - merge Tailwind classes conditionally and remove duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

