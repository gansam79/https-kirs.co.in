import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const interactiveToolsDropdown = [
  { name: "Unclaimed Asset Calculator", href: "/asset-calculator" },
  { name: "RTA & IEPF Search Directory", href: "/rta-directory" },
  { name: "7-Step Recovery Roadmap", href: "/recovery-roadmap" },
  { name: "Claim Eligibility Checker", href: "/eligibility-checker" },
  { name: "RTA Document Checklist", href: "/document-checklist" },
];

const servicesDropdown = [
  { name: "IEPF & Shares", href: "/services/iepf-process-lost-shares-dividend" },
  { name: "Lost Mutual Fund", href: "/services/lost-mutual-fund" },
  { name: "Bank & NBFC Deposit", href: "/services/unclaimed-bank-nbfc-deposit" },
  { name: "Insurance Policy", href: "/services/unclaimed-insurance-policy" },
  { name: "Pension & Retirement", href: "/services/missing-unclaimed-pension-amount" },
  { name: "Court Support", href: "/services/court-support" },
];

const desksDropdown = [
  { name: "Indian - Individual/HUF", href: "/services/indian-desk-individual-huf-proprietorship-partnership" },
  { name: "Indian - Corporate/LLP", href: "/services/indian-desk-corporate-llp" },
  { name: "Foreign - NRI/NRE/NRO", href: "/services/foreign-desk-nri-nre-nro" },
  { name: "Foreign - FII/FPI", href: "/services/foreign-desk-fii-fpi" },
  { name: "Trademark Registration", href: "/services/trademark-registration" },
];

const navLinks = [
  { name: "About KIRS", href: "/about" },
  { name: "Interactive Tools", href: "/asset-calculator", hasDropdown: true, items: interactiveToolsDropdown, isHighlighted: true },
  { name: "Services", href: "/services", hasDropdown: true, items: servicesDropdown },
  { name: "Special Desks", href: "/services", hasDropdown: true, items: desksDropdown },
  { name: "Regulatory Awareness", href: "/regulatory-awareness" },
  { name: "Knowledge Center", href: "/knowledge-center" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

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
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md border-b border-slate-800 shadow-lg py-3"
          : "bg-primary py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="KIRS - Kalavati Investment & Recovery Services">
            <Logo variant="horizontal" light={true} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4.5">
            {navLinks.map((link) => {
              const isActive = link.hasDropdown
                ? link.items.some((sub) => pathname === sub.href)
                : pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
              
              const words = link.name.split(" ");

              if (link.hasDropdown) {
                return (
                  <div key={link.name} className="relative group/dropdown h-12 flex items-center">
                    <Link
                      to={link.href}
                      className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-wider text-center flex flex-col justify-center items-center h-12 transition-colors hover:text-secondary px-1 relative ${
                        isActive ? "text-secondary" : link.isHighlighted ? "text-[#D4AF37]" : "text-slate-300"
                      }`}
                    >
                      {words.length === 1 ? (
                        <span className="py-2 flex items-center gap-1">
                          {words[0]}
                          <span className="text-[7px] opacity-75 group-hover/dropdown:rotate-180 transition-transform">▼</span>
                        </span>
                      ) : (
                        <div className="flex flex-col leading-[1.25] items-center py-1">
                          <span className="flex items-center gap-1">
                            {link.isHighlighted && <Sparkles className="w-3 h-3 text-secondary animate-pulse" />}
                            {words[0]}
                          </span>
                          <span className="flex items-center gap-1">
                            {words[1]}
                            <span className="text-[6px] opacity-75 group-hover/dropdown:rotate-180 transition-transform">▼</span>
                          </span>
                        </div>
                      )}
                      <span className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover/dropdown:w-full"
                      }`}></span>
                    </Link>
                    
                    {/* Dropdown Panel */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-primary border border-slate-800 rounded shadow-2xl p-2 hidden group-hover/dropdown:block hover:block z-50">
                      {link.items.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="block px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-slate-100 hover:text-secondary hover:bg-slate-900 rounded transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-[10px] xl:text-[11px] font-bold uppercase tracking-wider text-center flex flex-col justify-center items-center h-12 transition-colors hover:text-secondary relative px-1 group/link ${
                    isActive ? "text-secondary" : "text-slate-300"
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
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-secondary transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover/link:w-full"
                  }`}></span>
                </Link>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            <Link
              to="/asset-calculator"
              className="bg-[#D4AF37] hover:bg-yellow-500 text-primary font-bold text-[9.5px] xl:text-[11px] px-3.5 py-2 rounded shadow transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wider hover:scale-[1.03]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Valuation Calculator
            </Link>
            <Link
              to="/eligibility-checker"
              className="border border-secondary/50 hover:border-secondary text-white font-bold text-[9.5px] xl:text-[11px] px-3 py-2 rounded transition-all duration-200 flex items-center gap-1 uppercase tracking-wider hover:scale-[1.03]"
            >
              Check Eligibility
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-300 hover:text-white p-1 cursor-pointer"
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
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="space-y-1 py-1">
                      <span className="block px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {link.name}
                      </span>
                      <div className="pl-4 border-l border-slate-800 space-y-1">
                        {link.items.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => setIsOpen(false)}
                              className={`block py-1.5 px-3 rounded text-sm font-medium transition-colors ${
                                isSubActive
                                  ? "bg-slate-800 text-secondary"
                                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"));
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-3 rounded text-sm font-medium transition-colors ${
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
                  to="/asset-calculator"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-secondary hover:bg-yellow-600 text-primary font-bold text-center py-3 rounded text-sm uppercase tracking-wider block"
                >
                  Unclaimed Asset Calculator
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
