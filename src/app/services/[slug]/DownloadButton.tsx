"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";

export default function DownloadButton() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] px-3.5 py-2 rounded flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
    >
      <Download className="w-3.5 h-3.5 text-secondary" />
      {downloaded ? "Sent to email!" : "Download PDF Checklist"}
    </button>
  );
}
