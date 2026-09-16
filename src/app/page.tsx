"use client";

import * as React from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

export default function Home() {
  const [selectedImage, setSelectedImage] = React.useState<{
    src: string;
    alt: string;
    title?: string;
    caption?: string;
  } | null>(null);

  return (
    <main className="w-full min-h-screen bg-black text-white p-0 m-0 select-none overflow-x-hidden flex flex-col justify-start">
      {/* Desktop / Large Screen: Full width edge-to-edge with natural uncropped aspect ratio */}
      <div className="hidden md:block relative w-full aspect-[1905/1065] group bg-black overflow-hidden">
        <Image
          src="/images/originals-lookbook.webp"
          alt="SUOS EDIT 01 - ORIGINALS Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.005]"
        />

        {/* Subtle fullscreen button */}
        <button
          onClick={() =>
            setSelectedImage({
              src: "/images/originals-lookbook.webp",
              alt: "SUOS ORIGINALS - EDIT 01 Campaign Lookbook",
              title: "SUOS ORIGINALS",
              caption: "EDIT 01 • STRAIGHT FIT DENIM • 100% COTTON • NON STRETCH",
            })
          }
          className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/60 hover:bg-black/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-neutral-300 hover:text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg"
          aria-label="View Fullscreen"
        >
          <ZoomIn className="size-3.5" />
          <span>Fullscreen</span>
        </button>
      </div>

      {/* Mobile Screen: Zero Gap, Full Bleed Responsive Editorial Flow */}
      <div className="md:hidden flex flex-col w-full bg-black">
        {/* Main Hero Look with Typography */}
        <div className="relative w-full aspect-[1011/693] overflow-hidden">
          <Image
            src="/images/panel-hero.jpg"
            alt="SUOS ORIGINALS - EDIT 01"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* 2-Column Vertical Editorial Grid */}
        <div className="grid grid-cols-2 gap-0 w-full bg-black">
          <div
            className="relative aspect-[382/693] overflow-hidden cursor-pointer"
            onClick={() =>
              setSelectedImage({
                src: "/images/panel-portrait.jpg",
                alt: "SUOS Portrait",
                title: "EDIT 01 - PORTRAIT",
                caption: "100% Cotton Straight Fit",
              })
            }
          >
            <Image
              src="/images/panel-portrait.jpg"
              alt="SUOS Portrait Look"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div
            className="relative aspect-[382/693] overflow-hidden cursor-pointer"
            onClick={() =>
              setSelectedImage({
                src: "/images/panel-hallway.jpg",
                alt: "SUOS Corridor Walking Look",
                title: "EDIT 01 - HALLWAY",
                caption: "Classic Denim & Black Tee",
              })
            }
          >
            <Image
              src="/images/panel-hallway.jpg"
              alt="SUOS Hallway Look"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div
            className="relative aspect-[535/372] overflow-hidden cursor-pointer"
            onClick={() =>
              setSelectedImage({
                src: "/images/panel-mural.jpg",
                alt: "SUOS Street Look",
                title: "EDIT 01 - STREET",
                caption: "Raw Heritage Denim",
              })
            }
          >
            <Image
              src="/images/panel-mural.jpg"
              alt="SUOS Street Look"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div
            className="relative aspect-[486/372] overflow-hidden cursor-pointer"
            onClick={() =>
              setSelectedImage({
                src: "/images/panel-newspaper.jpg",
                alt: "SUOS Cafe Look",
                title: "EDIT 01 - CAFE",
                caption: "Timeless Tailoring",
              })
            }
          >
            <Image
              src="/images/panel-newspaper.jpg"
              alt="SUOS Cafe Look"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div
            className="relative aspect-[424/372] overflow-hidden cursor-pointer"
            onClick={() =>
              setSelectedImage({
                src: "/images/panel-balcony.jpg",
                alt: "SUOS Balcony Look",
                title: "EDIT 01 - BALCONY",
                caption: "Authentic Silhouette",
              })
            }
          >
            <Image
              src="/images/panel-balcony.jpg"
              alt="SUOS Balcony Look"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>

          <div
            className="relative aspect-[460/372] overflow-hidden cursor-pointer"
            onClick={() =>
              setSelectedImage({
                src: "/images/panel-staircase.jpg",
                alt: "SUOS Architecture",
                title: "EDIT 01 - ATMOSPHERE",
                caption: "Vintage Architecture",
              })
            }
          >
            <Image
              src="/images/panel-staircase.jpg"
              alt="SUOS Architecture"
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="size-6" />
          </button>

          <div
            className="relative max-w-7xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[75vh]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            {(selectedImage.title || selectedImage.caption) && (
              <div className="mt-4 text-center">
                {selectedImage.title && (
                  <h2 className="text-sm font-sans tracking-[0.2em] uppercase text-white font-medium">
                    {selectedImage.title}
                  </h2>
                )}
                {selectedImage.caption && (
                  <p className="text-xs text-neutral-400 font-light mt-1 tracking-wider uppercase">
                    {selectedImage.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

/*
=============================================================================
PREVIOUS HOMEPAGE IMPLEMENTATION (SAVED FOR LATER USE)
=============================================================================

"use client";

import * as React from "react";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { joinWaitlist } from "@/app/actions/waitlist";

export function PreviousHome() {
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
      
      {/!* Left Column (Desktop) / Top Section (Mobile): Visual Artwork *!/}
      <div className="relative w-full h-[40vh] sm:h-[46vh] md:h-full min-h-[260px] md:min-h-0 bg-black overflow-hidden shrink-0">
        <Image
          src="/images/suos-portal.jpg"
          alt="SUOS Portal Artwork"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        {/!* Soft edge blend overlay: horizontal on desktop, vertical on mobile *!/}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 pointer-events-none" />
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      </div>

      {/!* Right Column (Desktop) / Bottom Section (Mobile): Waitlist Content & Form *!/}
      <div className="relative flex-1 flex flex-col justify-center items-center p-6 sm:p-10 md:p-12 lg:p-16 xl:p-20 bg-black text-white md:h-full md:overflow-y-auto">
        
        {/!* Form & Copy Area *!/}
        <div className="my-auto py-6 sm:py-8 md:py-10 flex flex-col items-center text-center max-w-[380px] mx-auto w-full">
          
          {/!* Brand Logo - perfectly centre aligned to the texts *!/}
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
*/
