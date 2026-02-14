import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TrendingSignals from "./components/TrendingSignals";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        
        {/* Sticky Ticker */}
        <div className="sticky top-14 z-40 bg-white border-b border-gray-200 transition-shadow duration-300 data-[scrolled=true]:shadow-sm"
             id="ticker-wrapper">
          <TrendingSignals />
        </div>

        {children}
        <Footer />
      </body>
    </html>
  );
}
