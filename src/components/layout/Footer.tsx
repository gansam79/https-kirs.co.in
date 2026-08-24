import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, MessageCircle, AlertCircle, ShieldCheck, Loader2, ChevronUp } from "lucide-react";
import Logo from "./Logo";
import { submitLeadForm } from "../../lib/apiSubmit";
import { getBasePath } from "../../lib/basePath";

const coreServices = [
  { name: "Recovery of Shares (IEPF)", href: "/recovery-of-shares" },
  { name: "IEPF & Lost Shares Process", href: "/services/iepf-process-lost-shares-dividend" },
  { name: "Lost Mutual Fund", href: "/services/lost-mutual-fund" },
  { name: "Bank & NBFC Deposit", href: "/services/unclaimed-bank-nbfc-deposit" },
  { name: "Unclaimed Insurance", href: "/services/unclaimed-insurance-policy" },
  { name: "Pension Amount", href: "/services/missing-unclaimed-pension-amount" },
  { name: "Court Support", href: "/services/court-support" },
  { name: "ISIN Activation (Pvt & Ltd)", href: "/services/isin-activation-limited-pvt-company" },
  { name: "Trademark Registration", href: "/services/trademark-registration" },
];

const specialDesks = [
  { name: "Indian - Individual & HUF", href: "/services/indian-desk-individual-huf-proprietorship-partnership" },
  { name: "Indian - Corporate & LLP", href: "/services/indian-desk-corporate-llp" },
  { name: "Foreign - NRI / NRE / NRO", href: "/services/foreign-desk-nri-nre-nro" },
  { name: "Foreign - FII & FPI Desk", href: "/services/foreign-desk-fii-fpi" },
  { name: "Trademark Registration", href: "/services/trademark-registration" },
  { name: "ISIN Activation Desk", href: "/services/isin-activation-limited-pvt-company" },
];

const quickLinks = [
  { name: "Regulatory Awareness Hub", href: "/regulatory-awareness" },
  { name: "Eligibility Checker Tool", href: "/eligibility-checker" },
  { name: "Document Checklist Generator", href: "/document-checklist" },
  { name: "About KIRS", href: "/about" },
  { name: "Client Reviews & Feedback", href: "/reviews" },
  { name: "Knowledge Center / Blog", href: "/knowledge-center" },
  { name: "Contact Consultation", href: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribeLoading(true);
      try {
        await submitLeadForm({
          type: "newsletter_subscription",
          email: email
        });

        setSubscribed(true);
        setEmail("");
      } catch (error: any) {
        console.error("Error subscribing to newsletter", error);
      } finally {
        setSubscribeLoading(false);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#17303B] text-slate-300 font-sans border-t border-slate-700/60 relative">
      {/* Top CTA Banner */}
      <div className="bg-[#0B1920] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct Recovery Support
              </div>
              <h3 className="font-roboto text-xl sm:text-2xl text-white font-bold tracking-tight">
                Ready to Recover Your Unclaimed Shares & Dividends?
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Speak directly with a dedicated relationship specialist for a confidential eligibility analysis.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Link
                to="/eligibility-checker"
                className="w-full sm:w-auto text-center bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B1920] font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#D4AF37]/25 hover:scale-105"
              >
                Analyze Eligibility Now
              </Link>
              <a
                href="https://wa.me/919823662901"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white font-semibold px-6 py-3 rounded-full text-xs flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#D4AF37]/10"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Advisory Desk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* About Column */}
        <div className="md:col-span-6 lg:col-span-4 space-y-4">
          <Link to="/" className="inline-block text-left" aria-label="KIRS - Kalavati Investment & Recovery Services">
            <Logo variant="horizontal" light={true} />
          </Link>
          <p className="text-slate-300 text-xs leading-relaxed">
            India's premier financial consultancy dedicated to recovering lost assets, IEPF claims, dividends, and forgotten inheritance shares.
          </p>
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">
              Subscribe to Investor Alerts
            </h4>
            {subscribed ? (
              <p className="text-[#D4AF37] text-xs font-semibold flex items-center gap-1.5 animate-pulse">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                Successfully joined updates!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-[#0B1920] border border-slate-700/80 text-slate-100 text-xs px-3.5 py-2.5 rounded-l-full focus:outline-none focus:border-[#D4AF37] flex-1 disabled:opacity-50"
                  required
                  disabled={subscribeLoading}
                />
                <button
                  type="submit"
                  disabled={subscribeLoading}
                  className="bg-[#D4AF37] text-[#0B1920] hover:bg-[#C5A028] font-bold px-4 rounded-r-full transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Subscribe"
                >
                  {subscribeLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Core Services Column */}
        <div className="md:col-span-6 lg:col-span-2">
          <h4 className="font-roboto text-sm text-white font-bold mb-4 uppercase tracking-wider border-b border-[#D4AF37]/40 pb-1.5 inline-block">
            Recovery Services
          </h4>
          <ul className="space-y-2 text-xs">
            {coreServices.map((service) => (
              <li key={service.name}>
                <Link to={service.href} className="text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                  <span className="text-[#D4AF37] font-bold">›</span> {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Special Desks Column */}
        <div className="md:col-span-6 lg:col-span-2">
          <h4 className="font-roboto text-sm text-white font-bold mb-4 uppercase tracking-wider border-b border-[#D4AF37]/40 pb-1.5 inline-block">
            Special Desks
          </h4>
          <ul className="space-y-2 text-xs">
            {specialDesks.map((desk) => (
              <li key={desk.name}>
                <Link to={desk.href} className="text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                  <span className="text-[#D4AF37] font-bold">›</span> {desk.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-6 lg:col-span-2">
          <h4 className="font-roboto text-sm text-white font-bold mb-4 uppercase tracking-wider border-b border-[#D4AF37]/40 pb-1.5 inline-block">
            Resources
          </h4>
          <ul className="space-y-2 text-xs">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                  <span className="text-[#D4AF37] font-bold">›</span> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-6 lg:col-span-2 space-y-4">
          <h4 className="font-roboto text-sm text-white font-bold mb-4 uppercase tracking-wider border-b border-[#D4AF37]/40 pb-1.5 inline-block">
            Expert Office
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex gap-2.5 items-start">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <a
                href="https://maps.google.com/?q=33/1B/1,+Datta+Nagar,+Katraj,+Pune,+Maharashtra,+411046,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-[#D4AF37] transition-colors leading-normal"
              >
                33/1B/1, Datta Nagar, Katraj,
                <br />
                Pune, Maharashtra, 411046, India
              </a>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a href="tel:+919823662901" className="text-slate-300 hover:text-[#D4AF37] transition-colors font-semibold">
                +91 98236 62901
              </a>
            </li>
            <li className="flex gap-2.5 items-center">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a href="mailto:info@kirs.co.in" className="text-slate-300 hover:text-[#D4AF37] transition-colors">
                info@kirs.co.in
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance Warning & Legal Disclaimer */}
      <div className="bg-[#0B1920] text-slate-400 text-xs py-8 px-4 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex gap-2.5 items-start bg-[#17303B]/60 p-4 rounded-xl border border-slate-800">
            <AlertCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-slate-200">Legal Disclaimer & Regulatory Notice</p>
              <p className="leading-relaxed text-[11px]">
                KIRS (Kalavati Investment & Recovery Services) is an independent consultancy and documentation assistance service provider. KIRS is not affiliated with the Securities and Exchange Board of India (SEBI), Reserve Bank of India (RBI), Insurance Regulatory and Development Authority of India (IRDA), Pension Fund Regulatory and Development Authority (PFRDA), Investor Education and Protection Fund (IEPF) Authority or any other Government Authority or regulatory body in India.
              </p>
              <p className="leading-relaxed text-[11px] mt-1">
                We assist investors with procedural advisory, records tracking, and compilation of standard legal documentation (succession applications, duplicate bond declarations, demat checklists, etc.). KIRS does not guarantee the approval or final resolution of claims, as approvals are strictly subject to review, audits, and verification by the respective corporate registries, RTAs, and governmental regulatory entities.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 text-[11px] text-slate-400">
            <p>© {new Date().getFullYear()} KIRS. Kalavati Investment & Recovery Services. All Rights Reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-use" className="hover:text-[#D4AF37] transition-colors">Terms of Use</Link>
              <Link to="/compliance-notice" className="hover:text-[#D4AF37] transition-colors">Compliance Notice</Link>
              <Link to="/cookie-policy" className="hover:text-[#D4AF37] transition-colors">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

