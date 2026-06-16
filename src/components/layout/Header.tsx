"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck, Scale, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Regulatory Awareness", href: "/regulatory-awareness" },
  { name: "Eligibility Checker", href: "/eligibility-checker" },
  { name: "Doc Checklist", href: "/document-checklist" },
  { name: "About KIRS", href: "/about" },
  { name: "Knowledge Center", href: "/knowledge-center" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Compliance Bar */}
      <div className="bg-primary text-slate-300 text-[10px] sm:text-xs py-2 px-4 border-b border-slate-800 text-center font-medium select-none z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
          <span className="inline-flex items-center gap-1 text-[#D4AF37]">
            <ShieldCheck className="w-3.5 h-3.5" />
            Compliance Notice:
          </span>
          <span>
            KIRS is a consultancy & documentation assistance service provider. KIRS is not affiliated with SEBI, RBI, IEPF Authority or any Government Authority.
          </span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-md border-b border-slate-800 shadow-lg py-3"
            : "bg-primary py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="KIRS - Kalavati Investment & Recovery Services">
              <Logo variant="horizontal" light={true} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-secondary ${
                      isActive ? "text-secondary border-b-2 border-secondary pb-1" : "text-slate-300 pb-1"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/contact"
                className="text-slate-300 text-sm font-medium hover:text-white flex items-center gap-1 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-secondary" />
                Schedule Call
              </Link>
              <Link
                href="/eligibility-checker"
                className="bg-secondary hover:bg-yellow-600 text-primary font-semibold text-xs px-5 py-2.5 rounded shadow-md transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wider"
              >
                Check Eligibility
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-slate-300 hover:text-white p-1"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-primary border-t border-slate-800"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 px-3 rounded text-base font-medium transition-colors ${
                        isActive
                          ? "bg-slate-800 text-secondary"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 py-2 px-3 rounded text-base font-medium text-slate-300 hover:bg-slate-800"
                  >
                    <PhoneCall className="w-4 h-4 text-secondary" />
                    Book Free Consultation
                  </Link>
                  <Link
                    href="/eligibility-checker"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-secondary hover:bg-yellow-600 text-primary font-bold text-center py-3 rounded text-sm uppercase tracking-wider block"
                  >
                    Check Eligibility Now
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
