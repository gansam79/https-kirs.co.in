"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp, CalendarRange, X, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }

      if (!showBadge && window.scrollY > 200) {
        setShowBadge(true);
      } else if (showBadge && window.scrollY <= 200) {
        setShowBadge(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll, showBadge]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const whatsappMessage = encodeURIComponent(
    "Hello KIRS Team, I would like to check my eligibility for recovering unclaimed shares/dividends. Please guide me."
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* Side consultation badge (shows up after initial scroll) */}
      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="hidden sm:block"
          >
            <Link
              href="/contact"
              className="bg-primary hover:bg-slate-900 border border-secondary text-white text-xs font-semibold py-2.5 px-4 rounded shadow-2xl flex items-center gap-2 transition-all duration-200 group"
            >
              <CalendarRange className="w-4 h-4 text-secondary group-hover:rotate-12 transition-transform" />
              Book Call
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Chat Trigger */}
      <motion.a
        href={`https://wa.me/919823662901?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-colors relative group animate-pulse-gold"
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        
        {/* Help tooltip */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-800">
          Chat with Experts
        </span>
      </motion.a>

      {/* Back to Top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="bg-white hover:bg-slate-100 text-primary border border-slate-200 p-3 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
