"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem("kirs-cookie-consent");
    if (!consent) {
      // Show banner after 2 seconds
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("kirs-cookie-consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("kirs-cookie-consent", "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-slate-900 border border-slate-800 text-white rounded-lg shadow-2xl p-5 z-50 font-sans"
        >
          <div className="space-y-4">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-secondary">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Data Consent & Privacy Audit</span>
              </div>
              <button
                onClick={handleDecline}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close Consent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-[10px] text-slate-300 leading-relaxed">
              We collect essential details to evaluate asset recoverability (e.g. folio data). Under India's Digital Personal Data Protection (DPDP) Act and GDPR rules, we request your consent to process submitted documents for documentation audits. We do not sell data. View our{" "}
              <Link href="/privacy-policy" className="text-secondary hover:underline">
                Privacy Policy
              </Link>{" "}
              for specifics.
            </p>

            {/* Actions */}
            <div className="flex gap-3 justify-end text-[10px]">
              <button
                onClick={handleDecline}
                className="px-3.5 py-2 border border-slate-800 hover:border-slate-650 hover:bg-slate-800 rounded font-semibold text-slate-350 transition-colors uppercase tracking-wider"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-3.5 py-2 bg-secondary hover:bg-yellow-600 text-primary rounded font-bold transition-colors uppercase tracking-wider"
              >
                I Agree
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
