import type { Metadata } from "next";
import { akzidenzGrotesk, georgia, holiday } from "@/lib/fonts";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "SUOS - Join the Waitlist",
  description: "Be the first one in line - we'll notify you the moment we launch.",
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
      <body className="min-h-full flex flex-col font-sans bg-black text-white selection:bg-white selection:text-black">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
