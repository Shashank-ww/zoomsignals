import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="antialiased">
        <Navbar />
        
        {/* Sticky Ticker - Using TrendTicker as requested 
        <div 
          className="sticky top-14 z-40 bg-white border-b border-gray-200"
          id="ticker-wrapper"
        >
          <TrendTicker />
        </div>
        */}

        <main>{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}