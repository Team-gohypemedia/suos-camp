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
    <main className="min-h-screen w-full bg-[#121212] flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none">
      {/* Outer Card Container */}
      <div className="w-full max-w-[940px] bg-black border border-neutral-900 rounded-sm overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-2">
        
        {/* Mobile Brand Logo (Rendered above image on mobile) */}
        <div className="md:hidden flex items-center justify-center pt-6 pb-4 px-6 bg-black border-b border-neutral-900/50">
          <Image
            src="/logo.svg"
            alt="SUOS Logo"
            width={92}
            height={42}
            priority
            className="h-7 w-auto invert object-contain"
          />
        </div>

        {/* Left Column: Visual Artwork */}
        <div className="relative w-full aspect-[4/5] md:aspect-auto min-h-[320px] sm:min-h-[400px] md:min-h-[460px] bg-black overflow-hidden">
          <Image
            src="/images/suos-portal.jpg"
            alt="SUOS Portal Artwork"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {/* Subtle inner shadow / gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* Right Column: Waitlist Content & Form */}
        <div className="relative flex flex-col justify-between p-8 sm:p-10 lg:p-12 bg-black text-white">
          
          {/* Desktop Brand Logo */}
          <div className="hidden md:flex items-center">
            <Image
              src="/logo.svg"
              alt="SUOS Logo"
              width={100}
              height={46}
              priority
              className="h-7 sm:h-8 w-auto invert object-contain"
            />
          </div>

          {/* Form & Copy Area */}
          <div className="my-auto py-8 sm:py-10 flex flex-col items-center text-center max-w-[340px] mx-auto w-full">
            <h1 className="font-sans text-base sm:text-lg font-normal tracking-[0.2em] uppercase text-white mb-2">
              JOIN THE WAITLIST
            </h1>
            
            <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-neutral-400 font-normal mb-8">
              BE FIRST IN LINE - WE&apos;LL NOTIFY YOU THE MOMENT WE LAUNCH
            </p>

            {status === "success" ? (
              <div className="w-full py-5 px-4 bg-neutral-950 border border-neutral-800 rounded-none flex flex-col items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
                <div className="size-7 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Check className="size-3.5" />
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
                  className="font-sans mt-2 text-[10px] text-neutral-500 hover:text-white underline underline-offset-4 transition-colors"
                >
                  Register another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-3">
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
                    className="font-sans w-full bg-transparent border border-neutral-700/80 text-white placeholder:text-neutral-500 px-3.5 py-2.5 text-xs focus:outline-none focus:border-white transition-all rounded-none disabled:opacity-60"
                  />
                  {errorMessage && (
                    <p className="font-sans text-[10px] text-red-400 pl-0.5">{errorMessage}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="font-sans w-full bg-white hover:bg-neutral-200 active:bg-neutral-300 text-black font-normal text-xs sm:text-[13px] py-2.5 px-4 transition-colors rounded-none flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
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

            <p className="font-sans text-[10px] text-neutral-400 font-normal tracking-wide mt-5">
              No spam. Unsubscribe any time.
            </p>
          </div>

          {/* Bottom spacer / aesthetic balance */}
          <div className="hidden sm:block h-2" />
        </div>

      </div>
    </main>
  );
}
