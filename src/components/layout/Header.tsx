"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck, Scale, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const navLinks = [
  { name: "About KIRS", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Regulatory Awareness", href: "/regulatory-awareness" },
  { name: "Eligibility Checker", href: "/eligibility-checker" },
  { name: "Doc Checklist", href: "/document-checklist" },
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
      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
            ? "bg-primary/95 backdrop-blur-md border-b border-slate-800 shadow-lg py-3"
            : "bg-primary py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="KIRS - Kalavati Investment & Recovery Services">
              <Logo variant="horizontal" light={true} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                const words = link.name.split(" ");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-wider text-center flex flex-col justify-center items-center h-12 transition-colors hover:text-secondary relative px-1 group/link ${isActive ? "text-secondary" : "text-slate-300"
                      }`}
                  >
                    {words.length === 1 ? (
                      <span className="py-2">{words[0]}</span>
                    ) : (
                      <div className="flex flex-col leading-[1.25] items-center py-1">
                        <span>{words[0]}</span>
                        <span>{words[1]}</span>
                      </div>
                    )}
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover/link:w-full"
                      }`}></span>
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4.5 shrink-0">
              <Link
                href="/contact"
                className="text-slate-300 text-[10px] xl:text-[11px] font-bold uppercase tracking-wider hover:text-white flex items-center gap-1.5 transition-colors whitespace-nowrap h-12"
              >
                <PhoneCall className="w-3.5 h-3.5 text-secondary" />
                Schedule Call
              </Link>
              <Link
                href="/eligibility-checker"
                className="bg-secondary hover:bg-yellow-600 hover:shadow-lg hover:shadow-secondary/20 active:scale-95 text-primary font-bold text-[9.5px] xl:text-[11px] px-3 xl:px-4 py-2 rounded shadow-md transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wider hover:scale-[1.03] group/cta whitespace-nowrap"
              >
                Check Eligibility
                <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
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
                      className={`block py-2 px-3 rounded text-base font-medium transition-colors ${isActive
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
