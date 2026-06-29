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

  const renderIcon = (sizeClass = "w-12 h-12", logoName = "logo.jpeg") => (
    <div className={`${sizeClass} shrink-0 relative flex items-center justify-center bg-white rounded-md overflow-hidden shadow-sm border border-slate-700/10`}>
      <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${logoName}`} alt="KI&RS Logo" className="w-full h-full object-contain" />
    </div>
  );

  if (variant === "icon") {
    return renderIcon(className || "w-12 h-12", "logo-header.jpeg");
  }

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        {renderIcon("w-14 h-14 sm:w-16 sm:h-16", "logo-header.jpeg")}
        <div className="flex items-center gap-3">
          <div className="h-11 sm:h-12 w-[1px] bg-slate-700/50 hidden sm:block"></div>
          <div className="flex flex-col justify-center leading-none">
            <span
              className="font-serif text-2xl sm:text-3xl font-bold tracking-wider"
              style={{ color: light ? "#FFFFFF" : "#0F172A" }}
            >
              KI<span style={{ color: goldColor }}>&</span>RS
            </span>
            <div className="hidden sm:flex flex-col gap-0.5 mt-0.5">
              <span
                className="text-[8.5px] sm:text-[9px] font-sans tracking-widest uppercase font-semibold"
                style={{ color: textGray }}
              >
                Kalavati Investment & Recovery Services
              </span>
              <span
                className="text-[7.5px] sm:text-[8px] font-sans tracking-wider uppercase font-semibold"
                style={{ color: goldColor }}
              >
                Your Money, Your Rights - Our Responsibility
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: variant === "full"
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Logo Icon */}
      {renderIcon("w-24 h-24 sm:w-28 sm:h-28", "logo.jpeg")}

      {/* KI&RS Text */}
      <h2
        className="font-serif text-3xl sm:text-4xl font-bold tracking-widest mt-3"
        style={{ color: light ? "#FFFFFF" : "#0F172A" }}
      >
        KI<span style={{ color: goldColor }}>&</span>RS
      </h2>

      {/* Decorative Gold Line with Center Diamond */}
      <div className="w-full max-w-[320px] flex items-center justify-center gap-2 my-2.5 select-none">
        <div className="h-[1px] flex-1" style={{ backgroundColor: goldColor }} />
        <div
          className="w-2 h-2 rotate-45 shrink-0"
          style={{ backgroundColor: goldColor }}
        />
        <div className="h-[1px] flex-1" style={{ backgroundColor: goldColor }} />
      </div>

      {/* Subtitle */}
      <p
        className="text-[11px] sm:text-xs font-serif tracking-wide uppercase font-medium"
        style={{ color: light ? "#ECEFF1" : "#334155" }}
      >
        Kalavati Investment & Recovery Services
      </p>
      {/* Tagline */}
      <p
        className="text-[10px] sm:text-[11px] font-serif tracking-wide mt-1.5"
        style={{ color: goldColor }}
      >
        Your Money, Your Rights - Our Responsibility
      </p>
    </div>
  );
}
