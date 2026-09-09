"use server";

import { prisma } from "@/lib/prisma";

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

    // Check if user is already registered
    const existing = await prisma.waitlistUser.findUnique({
      where: { email: trimmedEmail },
    });

    if (existing) {
      return {
        success: true,
        alreadyJoined: true,
        message: "You are already on the waitlist!",
      };
    }

    // Insert new waitlist record
    await prisma.waitlistUser.create({
      data: {
        email: trimmedEmail,
      },
    });

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
