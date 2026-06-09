import type { Metadata } from "next";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import AIChatAssistant from "@/components/chat/AIChatAssistant";
import CookieConsent from "@/components/layout/CookieConsent";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KIRS | Recovering Forgotten Wealth & Unclaimed Investments",
  description: "India's trusted partner for IEPF claims, lost shares, duplicate share certificates, transmission of shares, physical to demat conversion, and NRI investment recovery. Kalavati Investment & Recovery Services.",
  keywords: "IEPF Claim Recovery, Lost Shares Recovery India, Unclaimed Dividend Recovery, Share Transmission Services, Physical Share to Demat, NRI Share Recovery, Investor Claim Assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-800">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <FloatingActions />
        <AIChatAssistant />
        <CookieConsent />
      </body>
    </html>
  );
}
