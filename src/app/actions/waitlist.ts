"use server";

import { neon } from "@neondatabase/serverless";

export type WaitlistResponse = {
  success: boolean;
  message?: string;
  alreadyJoined?: boolean;
};

export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    const trimmedEmail = email?.trim().toLowerCase();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    const databaseUrl =
      process.env.DATABASE_URL ||
      "postgresql://neondb_owner:npg_LkP8bjgNS5Bo@ep-withered-wildflower-b365o5es-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

    const sql = neon(databaseUrl);

    // Check if email already exists
    const existing = await sql`
      SELECT id, email FROM waitlist_users WHERE email = ${trimmedEmail} LIMIT 1
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

    // Insert new waitlist record into PostgreSQL
    await sql`
      INSERT INTO waitlist_users (id, email, "createdAt", "updatedAt")
      VALUES (${id}, ${trimmedEmail}, NOW(), NOW())
    `;

    return {
      success: true,
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
