"use server";

import { neon } from "@neondatabase/serverless";

export type WaitlistResponse = {
  success: boolean;
  message?: string;
  alreadyJoined?: boolean;
};

/**
 * Normalizes an email address to detect duplicates and prevent alias spam.
 * Specifically handles Gmail/Googlemail dot removal, plus-addressing (+tag),
 * and domain canonicalization.
 */
function normalizeEmail(rawEmail: string): string {
  const trimmed = rawEmail.trim().toLowerCase();
  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex === -1) return trimmed;

  let local = trimmed.slice(0, atIndex);
  let domain = trimmed.slice(atIndex + 1);

  // Canonicalize googlemail.com -> gmail.com
  if (domain === "googlemail.com") {
    domain = "gmail.com";
  }

  if (domain === "gmail.com") {
    // 1. Gmail ignores dots entirely in the username (e.g., j.o.h.n -> john)
    local = local.replace(/\./g, "");
    // 2. Gmail sub-addressing (+tag) routes to the main address
    const plusIndex = local.indexOf("+");
    if (plusIndex !== -1) {
      local = local.slice(0, plusIndex);
    }
  } else {
    // Standard sub-addressing (+tag) for other providers (e.g. user+news@domain.com)
    const plusIndex = local.indexOf("+");
    if (plusIndex !== -1) {
      local = local.slice(0, plusIndex);
    }
  }

  return `${local}@${domain}`;
}

export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    const trimmedEmail = email?.trim().toLowerCase();

    // Standard RFC-compliant email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    const normalizedEmail = normalizeEmail(trimmedEmail);

    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      console.error("DATABASE_URL environment variable is not defined.");
      return {
        success: false,
        message: "Server configuration error. Please try again later.",
      };
    }

    const sql = neon(databaseUrl);

    // Check if the email or canonical/normalized version already exists
    const existing = await sql`
      SELECT id, email FROM waitlist_users 
      WHERE email = ${normalizedEmail} OR email = ${trimmedEmail} 
      LIMIT 1
    `;

    if (existing.length > 0) {
      return {
        success: true,
        alreadyJoined: true,
        message: "You are already on the waitlist!",
      };
    }

    // Generate unique ID
    const id = `wl_${Math.random().toString(36).substring(2, 11)}_${Date.now().toString(36)}`;

    // Insert canonical normalized email into PostgreSQL
    const insertResult = await sql`
      INSERT INTO waitlist_users (id, email, "createdAt", "updatedAt")
      VALUES (${id}, ${normalizedEmail}, NOW(), NOW())
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;

    if (insertResult.length === 0) {
      return {
        success: true,
        alreadyJoined: true,
        message: "You are already on the waitlist!",
      };
    }

    return {
      success: true,
      alreadyJoined: false,
      message: "Successfully joined the waitlist!",
    };
  } catch (error) {
    console.error("Error saving to waitlist:", error);
    return {
      success: false,
      message: "Unable to join the waitlist right now. Please try again later.",
    };
  }
}
