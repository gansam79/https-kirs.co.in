import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, PhoneCall, MapPin, Mail, Clock, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const servicesDropdown = [
  { name: "RECOVERY OF SHARES (IEPF)", href: "/recovery-of-shares" },
  { name: "IEPF & SHARES PROCESS", href: "/services/iepf-process-lost-shares-dividend" },
  { name: "LOST MUTUAL FUND", href: "/services/lost-mutual-fund" },
  { name: "BANK & NBFC DEPOSIT", href: "/services/unclaimed-bank-nbfc-deposit" },
  { name: "INSURANCE POLICY", href: "/services/unclaimed-insurance-policy" },
  { name: "PENSION & RETIREMENT", href: "/services/missing-unclaimed-pension-amount" },
  { name: "COURT SUPPORT", href: "/services/court-support" },
  { name: "TRADEMARK REGISTRATION", href: "/services/trademark-registration" },
  { name: "ISIN ACTIVATION (PVT & LTD)", href: "/services/isin-activation-limited-pvt-company" },
];

const desksDropdown = [
  { name: "INDIAN - INDIVIDUAL / HUF", href: "/services/indian-desk-individual-huf-proprietorship-partnership" },
  { name: "INDIAN - CORPORATE / LLP", href: "/services/indian-desk-corporate-llp" },
  { name: "FOREIGN - NRI / NRE / NRO", href: "/services/foreign-desk-nri-nre-nro" },
  { name: "FOREIGN - FII / FPI DESK", href: "/services/foreign-desk-fii-fpi" },
  { name: "TRADEMARK REGISTRATION", href: "/services/trademark-registration" },
  { name: "ISIN ACTIVATION (PVT & LTD)", href: "/services/isin-activation-limited-pvt-company" },
];

const navLinks = [
  { name: "About KIRS", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true, items: servicesDropdown },
  { name: "Special Desks", href: "/services", hasDropdown: true, items: desksDropdown },
  { name: "Regulatory Awareness", href: "/regulatory-awareness" },
  { name: "Eligibility Checker", href: "/eligibility-checker" },
  { name: "Doc Checklist", href: "/document-checklist" },
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
    <header className="sticky top-0 z-50 shadow-md">
      {/* Stocker Topbar Start */}
      <div className="hidden lg:block bg-[#0B1920] text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+919823662901" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>+91 98236 62901</span>
            </a>
            <a href="mailto:info@kirs.co.in" className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>info@kirs.co.in</span>
            </a>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Mon - Sat: 9:30 AM - 6:30 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Pune | PAN India Service</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-[#D4AF37]/15 text-[#D4AF37] px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border border-[#D4AF37]/40">
              <ShieldCheck className="w-3 h-3" /> SEBI & IEPF Framework Compliance
            </span>
          </div>
        </div>
      </div>
      {/* Stocker Topbar End */}

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#17303B]/95 backdrop-blur-md py-2.5 border-b border-slate-700/60 shadow-xl"
            : "bg-[#17303B] py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="KIRS - Kalavati Investment & Recovery Services">
              <Logo variant="horizontal" light={true} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5">
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
                        className={`text-[11px] xl:text-[12px] font-roboto font-bold uppercase tracking-wider text-center flex flex-col justify-center items-center h-12 transition-colors hover:text-[#D4AF37] px-2.5 relative ${
                          isActive ? "stocker-nav-active" : "text-slate-100"
                        }`}
                      >
                        {words.length === 1 ? (
                          <span className="py-2 flex items-center gap-1">
                            {words[0]}
                            <span className="text-[8px] transition-transform duration-200 group-hover/dropdown:rotate-180 text-[#D4AF37]">▼</span>
                          </span>
                        ) : (
                          <div className="flex flex-col leading-tight items-center py-1">
                            <span>{words[0]}</span>
                            <span className="flex items-center gap-1">
                              {words[1]}
                              <span className="text-[7.5px] transition-transform duration-200 group-hover/dropdown:rotate-180 text-[#D4AF37]">▼</span>
                            </span>
                          </div>
                        )}
                      </Link>
                      
                      {/* Dropdown Panel */}
                      <div className="absolute top-full left-0 w-64 bg-[#0B1920] border border-slate-700/80 rounded-xl shadow-2xl p-2 hidden group-hover/dropdown:block hover:block z-50">
                        {link.items.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="block px-3.5 py-2.5 text-[11px] font-roboto font-bold uppercase tracking-wider text-slate-100 hover:text-[#D4AF37] hover:bg-[#17303B] rounded-lg transition-colors"
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
                    className={`text-[11px] xl:text-[12px] font-roboto font-bold uppercase tracking-wider text-center flex flex-col justify-center items-center h-12 transition-colors hover:text-[#D4AF37] relative px-2.5 group/link ${
                      isActive ? "stocker-nav-active" : "text-slate-100"
                    }`}
                  >
                    {words.length === 1 ? (
                      <span className="py-2">{words[0]}</span>
                    ) : (
                      <div className="flex flex-col leading-tight items-center py-1">
                        <span>{words[0]}</span>
                        <span>{words[1]}</span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="text-slate-200 text-[11px] xl:text-[12px] font-roboto font-bold uppercase tracking-wider hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors whitespace-nowrap h-12"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
                Contact Us
              </Link>
              <Link
                to="/eligibility-checker"
                className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B1920] font-roboto font-extrabold text-[10.5px] xl:text-[11.5px] px-4 py-2.5 rounded-full shadow-lg shadow-[#D4AF37]/25 transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wider hover:scale-[1.03] group/cta whitespace-nowrap"
              >
                Check Eligibility
                <ArrowRight className="w-3.5 h-3.5 group-hover/cta:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-slate-200 hover:text-[#D4AF37] p-1.5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
            className="lg:hidden bg-[#0B1920] border-t border-slate-800"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="space-y-1 py-1">
                      <span className="block px-3 text-xs font-sans font-bold text-slate-400 uppercase tracking-wider">
                        {link.name}
                      </span>
                      <div className="pl-4 border-l border-[#D4AF37]/40 space-y-1">
                        {link.items.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              onClick={() => setIsOpen(false)}
                              className={`block py-1.5 px-3 rounded text-sm font-sans font-semibold transition-colors ${
                                isSubActive
                                  ? "bg-[#17303B] text-[#D4AF37]"
                                  : "text-slate-300 hover:bg-[#17303B] hover:text-white"
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
                    className={`block py-2 px-3 rounded text-sm font-sans font-semibold transition-colors ${
                      isActive
                        ? "bg-[#17303B] text-[#D4AF37]"
                        : "text-slate-300 hover:bg-[#17303B] hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded text-base font-sans font-semibold text-slate-200 hover:bg-[#17303B]"
                >
                  <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                  Contact Us
                </Link>
                <Link
                  to="/eligibility-checker"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B1920] font-bold text-center py-3 rounded-full text-sm font-sans uppercase tracking-wider block shadow-lg"
                >
                  Check Eligibility Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

