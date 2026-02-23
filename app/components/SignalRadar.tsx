"use client"

import { useState, useEffect } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube, FaRedditAlien, FaGoogle, FaFacebook } from "react-icons/fa";

const signalsData = [
  { id: 1, angle: 20, radius: 0.8, icon: FaFacebook, color: "#1877F2" },
  { id: 2, angle: 135, radius: 0.6, icon: AiFillInstagram, color: "#C13584" },
  { id: 3, angle: 230, radius: 0.65, icon: FaYoutube, color: "#FF0000" },
  { id: 4, angle: 180, radius: 0.85, icon: FaRedditAlien, color: "#FF4500" },
  { id: 5, angle: 310, radius: 0.9, icon: FaGoogle, color: "#4285F4" },
];

export default function SignalRadar() {
  const [sweepAngle, setSweepAngle] = useState(0);
  const [activeSignals, setActiveSignals] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false); 

  // Sweep rotation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) setSweepAngle((prev) => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Determine which icons are under the sweep
  useEffect(() => {
    const visible = signalsData
      .filter((s) => {
        const diff = Math.abs((s.angle - sweepAngle + 360) % 360);
        return diff <= 10 || diff >= 350;
      })
      .map((s) => s.id);

    setActiveSignals(visible);
  }, [sweepAngle]);

  return (
    <div className="relative w-72 h-72 mx-auto">
      
      {/* Radar rings */}
      <div className="absolute inset-0 rounded-full border border-blue-400/20" />
      <div className="absolute inset-8 rounded-full border border-blue-400/30" />
      <div className="absolute inset-16 rounded-full border border-blue-400/40" />

      {/* Rotating sweep */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{ transform: `rotate(${sweepAngle}deg)` }}
      >
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-linear-to-r from-amber-400/80 to-transparent origin-left rounded-full" />
      </div>

      {/* Radar core */}
      <div
        className="absolute inset-24 rounded-full bg-blue-500/10 backdrop-blur-sm flex items-center justify-center border border-blue-400/20 scale-90 transition-transform duration-300 hover:scale-110"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/40" />
      </div>

      {/* Social media icons */}
      {signalsData.map((signal) => {
        const rawX = 50 + signal.radius * 50 * Math.cos((signal.angle * Math.PI) / 180);
        const rawY = 50 + signal.radius * 50 * Math.sin((signal.angle * Math.PI) / 180);
        const x = Number(rawX.toFixed(2));
        const y = Number(rawY.toFixed(2));
        const isActive = activeSignals.includes(signal.id);
        const IconComponent = signal.icon;

        return (
          <div
            key={signal.id}
            className="absolute flex items-center justify-center"
            style={{
              top: `${y}%`,
              left: `${x}%`,
              transform: "translate(-50%, -50%)",
            }}
          >

            {/* Ping halo appears only when sweep is over */}

            {isActive && <span className="absolute w-6 h-6 rounded-full bg-emerald-400/60 animate-ping"></span>}
            <IconComponent
              size={24}
              className={`transition-all duration-300 transform ${
                isActive ? "scale-125 filter-none opacity-100" : "scale-90 filter grayscale opacity-50"
              }`}
              style={{ color: signal.color }}
            />
          </div>
        );
      })}
    </div>
  );
}