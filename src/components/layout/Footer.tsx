import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, MessageCircle, AlertCircle, ShieldCheck, Loader2 } from "lucide-react";
import Logo from "./Logo";
import { getBasePath } from "@/lib/basePath";

const coreServices = [
  { name: "Recovery of Shares (IEPF)", href: "/recovery-of-shares" },
  { name: "IEPF & Lost Shares Process", href: "/services/iepf-process-lost-shares-dividend" },
  { name: "Lost Mutual Fund", href: "/services/lost-mutual-fund" },
  { name: "Bank & NBFC Deposit", href: "/services/unclaimed-bank-nbfc-deposit" },
  { name: "Unclaimed Insurance", href: "/services/unclaimed-insurance-policy" },
  { name: "Pension Amount", href: "/services/missing-unclaimed-pension-amount" },
  { name: "Court Support", href: "/services/court-support" },
];

const specialDesks = [
  { name: "Indian - Individual & HUF", href: "/services/indian-desk-individual-huf-proprietorship-partnership" },
  { name: "Indian - Corporate & LLP", href: "/services/indian-desk-corporate-llp" },
  { name: "Foreign - NRI / NRE / NRO", href: "/services/foreign-desk-nri-nre-nro" },
  { name: "Foreign - FII & FPI Desk", href: "/services/foreign-desk-fii-fpi" },
  { name: "Trademark Registration", href: "/services/trademark-registration" },
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
        const basePath = getBasePath();
        const response = await fetch(`${basePath}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "subscribe",
            email: email
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to subscribe.");
        }

        setSubscribed(true);
        setEmail("");
      } catch (error: any) {
        console.error("Error subscribing to newsletter", error);
      } finally {
        setSubscribeLoading(false);
      }
    }
  };

  return (
    <footer className="bg-primary text-slate-300 font-sans border-t border-slate-800">
      {/* Top CTA Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold">
              Ready to Recover Your Unclaimed Investments?
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Speak with a dedicated relationships manager for a free eligibility analysis.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <Link
              to="/eligibility-checker"
              className="w-full sm:w-auto text-center bg-secondary hover:bg-yellow-600 text-primary font-bold px-6 py-3 rounded text-sm transition-all duration-200"
            >
              Analyze Eligibility
            </Link>
            <a
              href="https://wa.me/919823662901"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center border border-slate-700 hover:border-white text-white font-semibold px-6 py-3 rounded text-sm flex items-center justify-center gap-2 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              WhatsApp Experts
            </a>
          </div>
        </div>
      </div>

      {/* Main Links Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* About Column */}
        <div className="md:col-span-6 lg:col-span-3 space-y-4">
          <Link to="/" className="inline-block text-left" aria-label="KIRS - Kalavati Investment & Recovery Services">
            <Logo variant="horizontal" light={true} className="!items-start" />
          </Link>
          <p className="text-slate-400 text-xs leading-relaxed">
            India's premier financial consultancy dedicated to recovering lost assets, IEPF claims, dividends, and forgotten inheritance shares.
          </p>
          <div className="pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Subscribe to Investor Alerts
            </h4>
            {subscribed ? (
              <p className="text-secondary text-xs font-medium flex items-center gap-1.5 animate-pulse">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                Successfully joined updates!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="bg-slate-900 border border-slate-800 text-slate-100 text-xs px-3 py-2.5 rounded-l focus:outline-none focus:border-secondary flex-1 disabled:opacity-50"
                  required
                  disabled={subscribeLoading}
                />
                <button
                  type="submit"
                  disabled={subscribeLoading}
                  className="bg-slate-800 text-secondary hover:bg-secondary hover:text-primary px-3 rounded-r transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
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
          <h4 className="font-serif text-sm text-white font-semibold mb-4 uppercase tracking-wider">Recovery Services</h4>
          <ul className="space-y-2 text-xs">
            {coreServices.map((service) => (
              <li key={service.name}>
                <Link to={service.href} className="text-slate-400 hover:text-white transition-colors">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Special Desks Column */}
        <div className="md:col-span-6 lg:col-span-2">
          <h4 className="font-serif text-sm text-white font-semibold mb-4 uppercase tracking-wider">Special Desks</h4>
          <ul className="space-y-2 text-xs">
            {specialDesks.map((desk) => (
              <li key={desk.name}>
                <Link to={desk.href} className="text-slate-400 hover:text-white transition-colors">
                  {desk.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-6 lg:col-span-2">
          <h4 className="font-serif text-sm text-white font-semibold mb-4 uppercase tracking-wider">Resources</h4>
          <ul className="space-y-2 text-xs">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="text-slate-400 hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="md:col-span-6 lg:col-span-3 space-y-4">
          <h4 className="font-serif text-sm text-white font-semibold mb-4 uppercase tracking-wider">Expert Office</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex gap-2.5 items-start">
              <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <span className="text-slate-400">
                33/1B/1, Datta Nagar, Katraj,
                <br />
                Pune, Maharashtra, 411046, India
              </span>
            </li>
            <li className="flex gap-2.5 items-center">
              <Phone className="w-4 h-4 text-secondary shrink-0" />
              <a href="tel:+919823662901" className="text-slate-400 hover:text-white transition-colors">
                +91 98236 62901
              </a>
            </li>
            <li className="flex gap-2.5 items-center">
              <Mail className="w-4 h-4 text-secondary shrink-0" />
              <a href="mailto:info@kirs.co.in" className="text-slate-400 hover:text-white transition-colors">
                info@kirs.co.in
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Compliance Warning & Legal Disclaimer */}
      <div className="bg-slate-950 text-slate-400 text-xs py-8 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex gap-2.5 items-start bg-slate-900/50 p-4 rounded border border-slate-900">
            <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-slate-200">Legal Disclaimer & Compliance</p>
              <p className="leading-relaxed">
                KIRS (Kalavati Investment & Recovery Services) is an independent consultancy and documentation assistance service provider. KIRS is not affiliated with the Securities and Exchange Board of India (SEBI), Reserve Bank of India (RBI), Insurance Regulatory and Development Authority of India (IRDA), Pension Fund Regulatory and Development Authority (PFRDA), Investor Education and Protection Fund (IEPF) Authority or any other Government Authority or regulatory body in India.
              </p>
              <p className="leading-relaxed mt-1.5">
                We assist investors with procedural advisory, records tracking, and compilation of standard legal documentation (succession applications, duplicate bond declarations, demat checklists, etc.). KIRS does not guarantee the approval or final resolution of claims, as approvals are strictly subject to review, audits, and verification by the respective corporate registries, RTAs, and governmental regulatory entities.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 text-[11px] text-slate-500">
            <p>© {new Date().getFullYear()} KIRS. All Rights Reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-use" className="hover:text-slate-300 transition-colors">Terms of Use</Link>
              <Link to="/compliance-notice" className="hover:text-slate-300 transition-colors">Compliance Notice</Link>
              <Link to="/cookie-policy" className="hover:text-slate-300 transition-colors">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
