"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { joinWaitlist } from "@/app/actions/waitlist";

export default function Home() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [alreadyJoined, setAlreadyJoined] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setErrorMessage("");
    setStatus("loading");

    try {
      const res = await joinWaitlist(email);
      if (res.success) {
        setAlreadyJoined(!!res.alreadyJoined);
        setStatus("success");
      } else {
        setStatus("idle");
        setErrorMessage(res.message || "Failed to join waitlist");
      }
    } catch {
      setStatus("idle");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="w-full min-h-screen md:h-screen bg-black flex flex-col md:grid md:grid-cols-2 overflow-x-hidden md:overflow-hidden select-none">
      
      {/* Left Column (Desktop) / Top Section (Mobile): Visual Artwork */}
      <div className="relative w-full h-[40vh] sm:h-[46vh] md:h-full min-h-[260px] md:min-h-0 bg-black overflow-hidden shrink-0">
        <Image
          src="/images/suos-portal.jpg"
          alt="SUOS Portal Artwork"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        {/* Soft edge blend overlay: horizontal on desktop, vertical on mobile */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 pointer-events-none" />
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      </div>

      {/* Right Column (Desktop) / Bottom Section (Mobile): Waitlist Content & Form */}
      <div className="relative flex-1 flex flex-col justify-center items-center p-6 sm:p-10 md:p-12 lg:p-16 xl:p-20 bg-black text-white md:h-full md:overflow-y-auto">
        
        {/* Form & Copy Area */}
        <div className="my-auto py-6 sm:py-8 md:py-10 flex flex-col items-center text-center max-w-[380px] mx-auto w-full">
          
          {/* Brand Logo - perfectly centre aligned to the texts */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <Image
              src="/logo.svg"
              alt="SUOS Logo"
              width={120}
              height={55}
              priority
              className="h-8 sm:h-9 lg:h-10 w-auto invert object-contain"
            />
          </div>

          <h1 className="font-sans text-base sm:text-lg lg:text-xl font-normal tracking-[0.22em] uppercase text-white mb-2">
            JOIN THE WAITLIST
          </h1>
          
          <p className="font-sans text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.14em] uppercase text-neutral-400 font-normal mb-8">
            BE THE FIRST ONE IN LINE - WE&apos;LL NOTIFY YOU THE MOMENT WE LAUNCH
          </p>

          {status === "success" ? (
            <div className="w-full py-6 px-5 bg-neutral-950 border border-neutral-800 rounded-none flex flex-col items-center gap-2.5 animate-in fade-in zoom-in-95 duration-300">
              <div className="size-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Check className="size-4" />
              </div>
              <p className="font-sans text-xs font-normal text-white tracking-widest uppercase">
                {alreadyJoined ? "Already on the list" : "You're on the list"}
              </p>
              <p className="font-sans text-[11px] text-neutral-400 font-light">
                {alreadyJoined ? (
                  <>This email is already registered on our waitlist.</>
                ) : (
                  <>We&apos;ve reserved your spot for <span className="text-white">{email}</span>.</>
                )}
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setEmail("");
                  setAlreadyJoined(false);
                }}
                className="font-sans mt-2 text-[11px] text-neutral-500 hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
              >
                Register another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full space-y-3.5">
              <div className="space-y-1 text-left">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="Your Email Address"
                  disabled={status === "loading"}
                  className="font-sans w-full bg-transparent border border-neutral-700/80 text-white placeholder:text-neutral-500 px-4 py-3 text-xs sm:text-[13px] focus:outline-none focus:border-white transition-all rounded-none disabled:opacity-60"
                />
                {errorMessage && (
                  <p className="font-sans text-[10px] text-red-400 pl-0.5">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="font-sans w-full bg-white hover:bg-neutral-200 active:bg-neutral-300 text-black font-normal text-xs sm:text-[13px] py-3 px-4 transition-colors rounded-none flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer uppercase tracking-wider"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin text-black" />
                    <span>Reserving spot...</span>
                  </>
                ) : (
                  <span>Reserve my spot</span>
                )}
              </button>
            </form>
          )}

          <p className="font-sans text-[10px] sm:text-[11px] text-neutral-400 font-normal tracking-wide mt-6">
            No spam. Unsubscribe any time.
          </p>
        </div>
      </div>
    </main>
  );
}
