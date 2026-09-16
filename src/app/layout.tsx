import type { Metadata } from "next";
import { akzidenzGrotesk, georgia, holiday } from "@/lib/fonts";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "SUOS — ORIGINALS (EDIT 01)",
  description: "SUOS ORIGINALS EDIT 01 • Straight Fit Denim • 100% Cotton Non Stretch",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${akzidenzGrotesk.variable} ${georgia.variable} ${holiday.variable} h-full antialiased dark`}
    >
      <body className="min-h-full m-0 p-0 flex flex-col font-sans bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
