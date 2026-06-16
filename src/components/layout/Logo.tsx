"use client";

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "horizontal";
  light?: boolean;
}

export default function Logo({ className = "", variant = "full", light = false }: LogoProps) {
  // Deep Navy Blue
  const blueColor = light ? "#FFFFFF" : "#0F172A";
  // Classic Gold
  const goldColor = "#D4AF37";
  // Subtext gray/slate
  const textGray = light ? "#E2E8F0" : "#475569";

  const renderIcon = (sizeClass = "w-12 h-12") => (
    <div className={`${sizeClass} shrink-0 relative flex items-center justify-center bg-white rounded-md overflow-hidden`}>
      <img src="/logo4.png" alt="KI&RS Logo" className="w-full h-full object-contain" />
    </div>
  );

  if (variant === "icon") {
    return renderIcon(className || "w-12 h-12");
  }

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderIcon("w-10 h-10")}
        <div className="flex items-center gap-2">
          <div className="h-8 w-[1px] bg-slate-700/50 hidden sm:block"></div>
          <div className="flex flex-col leading-none">
            <span
              className="font-serif text-xl sm:text-2xl font-bold tracking-wider"
              style={{ color: light ? "#FFFFFF" : "#0F172A" }}
            >
              KI<span style={{ color: goldColor }}>&</span>RS
            </span>
            <span
              className="text-[9px] font-sans tracking-widest uppercase font-semibold hidden sm:block mt-0.5"
              style={{ color: textGray }}
            >
              Kalavati Investment & Recovery Services
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default: variant === "full"
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Logo Icon */}
      {renderIcon("w-20 h-20")}

      {/* KI&RS Text */}
      <h2
        className="font-serif text-3xl sm:text-4xl font-bold tracking-widest mt-2"
        style={{ color: light ? "#FFFFFF" : "#0F172A" }}
      >
        KI<span style={{ color: goldColor }}>&</span>RS
      </h2>

      {/* Decorative Gold Line with Center Diamond */}
      <div className="w-full max-w-[280px] flex items-center justify-center gap-2 my-2 select-none">
        <div className="h-[1px] flex-1" style={{ backgroundColor: goldColor }} />
        <div
          className="w-2 h-2 rotate-45 shrink-0"
          style={{ backgroundColor: goldColor }}
        />
        <div className="h-[1px] flex-1" style={{ backgroundColor: goldColor }} />
      </div>

      {/* Subtitle */}
      <p
        className="text-[10px] sm:text-xs font-serif tracking-wide uppercase font-medium"
        style={{ color: light ? "#ECEFF1" : "#334155" }}
      >
        Kalavati Investment & Recovery Services
      </p>
    </div>
  );
}
