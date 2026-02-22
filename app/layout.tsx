import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import TrendTicker from "./components/TrendTicker";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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