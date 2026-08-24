import React from "react";
import { getBasePath } from "../../lib/basePath";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon" | "horizontal";
  light?: boolean;
}

export default function Logo({ className = "", variant = "full", light = false }: LogoProps) {
  const emeraldColor = "#D4AF37";
  const textGray = light ? "#E2E8F0" : "#475569";
  const basePath = getBasePath();

  const renderIcon = (sizeClass = "w-12 h-12", logoName = "logo.jpeg") => (
    <div className={`${sizeClass} shrink-0 relative flex items-center justify-center bg-white rounded-md overflow-hidden shadow-sm border border-slate-700/10`}>
      <img src={`${basePath}/${logoName}`} alt="KI&RS Logo" className="w-full h-full object-contain" />
    </div>
  );

  if (variant === "icon") {
    return renderIcon(className || "w-12 h-12", "logo-header.jpeg");
  }

  if (variant === "horizontal") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderIcon("w-12 h-12 sm:w-14 sm:h-14", "logo-header.jpeg")}
        <div className="flex flex-col justify-center leading-tight">
          <span
            className="font-roboto text-xl sm:text-2xl font-black tracking-wider uppercase"
            style={{ color: light ? "#FFFFFF" : "#0F172A" }}
          >
            KI<span style={{ color: emeraldColor }}>&</span>RS
          </span>
          <span
            className="text-[8.5px] sm:text-[9.5px] font-roboto tracking-wider uppercase font-bold leading-tight mt-0.5 whitespace-nowrap"
            style={{ color: textGray }}
          >
            Kalavati Investment & Recovery Services
          </span>
          <span
            className="text-[7.5px] sm:text-[8.5px] font-roboto tracking-wider uppercase font-extrabold leading-tight mt-0.5 whitespace-nowrap"
            style={{ color: emeraldColor }}
          >
            Your Money, Your Rights - Our Responsibility
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {renderIcon("w-24 h-24 sm:w-28 sm:h-28", "logo.jpeg")}

      <h2
        className="font-roboto text-3xl sm:text-4xl font-black tracking-widest mt-3 uppercase"
        style={{ color: light ? "#FFFFFF" : "#0F172A" }}
      >
        KI<span style={{ color: emeraldColor }}>&</span>RS
      </h2>

      <div className="w-full max-w-[320px] flex items-center justify-center gap-2 my-2.5 select-none">
        <div className="h-[1px] flex-1" style={{ backgroundColor: emeraldColor }} />
        <div
          className="w-2 h-2 rotate-45 shrink-0"
          style={{ backgroundColor: emeraldColor }}
        />
        <div className="h-[1px] flex-1" style={{ backgroundColor: emeraldColor }} />
      </div>

      <p
        className="text-[11px] sm:text-xs font-roboto tracking-wider uppercase font-bold"
        style={{ color: light ? "#ECEFF1" : "#334155" }}
      >
        Kalavati Investment & Recovery Services
      </p>
      <p
        className="text-[10px] sm:text-[11px] font-roboto tracking-wider uppercase font-extrabold mt-1.5"
        style={{ color: emeraldColor }}
      >
        Your Money, Your Rights - Our Responsibility
      </p>
    </div>
  );
}
