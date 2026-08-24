import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Users,
  Search,
  BookOpen,
  Award,
  ChevronRight,
  ChevronLeft,
  Download,
  CheckCircle,
  Building,
  UserCheck,
  Scale,
  Sparkles,
  Play,
  MessageCircle,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/data/servicesData";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/layout/JsonLd";
import { submitLeadForm } from "@/lib/apiSubmit";
import { getBasePath, getApiBasePath } from "@/lib/basePath";

const authorityLogos = [
  { name: "IEPF", desc: "Investor Education & Protection Fund" },
  { name: "SEBI Framework", desc: "Securities & Exchange Board of India Guidelines" },
  { name: "NSDL Ecosystem", desc: "National Securities Depository Ecosystem" },
  { name: "CDSL Ecosystem", desc: "Central Depository Services Ecosystem" },
  { name: "MCA Portal", desc: "Ministry of Corporate Affairs filings" },
];

const steps = [
  { title: "Eligibility Check", desc: "We audit company and RTA records to confirm share ownership and claim eligibility." },
  { title: "Document Collection", desc: "We gather and inspect your proof of identity, old certificate details, and bank records." },
  { title: "RTA Verification", desc: "We cross-reference details with the corporate registrar to eliminate spelling or signature mismatches." },
  { title: "Claim Preparation", desc: "Our legal team drafts customized indemnity bonds, affidavits, and files MCA IEPF-5 forms." },
  { title: "Submission Guidance", desc: "We submit physical dossiers to company offices and ensure compliance verification is stamped." },
  { title: "RTA Follow-Up", desc: "We track processing stages and address queries raised by corporate auditors." },
  { title: "Wealth Restored", desc: "Shares are dematerialized and credited directly into your active Demat portfolio." },
];

const heroSlides = [
  {
    subtitle: "WELCOME TO KIRS",
    title: "RECOVER YOUR UNCLAIMED SHARES WITH HIGHER SUCCESS",
    desc: "India's premier investor recovery platform for physical share dematerialization, deceased inheritance transmission, signature updates, and IEPF claim recovery.",
    bgImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1920"
  },
  {
    subtitle: "UNCLAIMED WEALTH ADVISORY",
    title: "RESTORE LOST MUTUAL FUNDS & BANK DEPOSITS TO YOUR FAMILY",
    desc: "Reclaim misplaced mutual fund folios, dormant bank accounts, and unclaimed NBFC fixed deposits with complete legal drafting support.",
    bgImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1920"
  },
  {
    subtitle: "LEGAL HEIR SPECIALIZATION",
    title: "INHERITED ASSET TRANSMISSION & SUCCESSION COURT SUPPORT",
    desc: "Specialized assistance for legal heir documentation, succession certificates, Will probates, and corporate RTA filings.",
    bgImage: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1920"
  }
];

export default function Home() {
  const [guideForm, setGuideForm] = useState({ name: "", email: "", phone: "" });
  const [guideSubmitted, setGuideSubmitted] = useState(false);
  const [guideLoading, setGuideLoading] = useState(false);
  const [guideErrorMsg, setGuideErrorMsg] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [services, setServices] = useState(servicesData);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [currentSlide]);

  React.useEffect(() => {
    async function fetchData() {
      const apiPath = getApiBasePath();
      try {
        const reviewsRes = await fetch(`${apiPath}/api/reviews`);
        if (reviewsRes.ok) {
          const data = await reviewsRes.json();
          if (data && !data.offline && Array.isArray(data) && data.length > 0) {
            setReviews(data);
          }
        }
      } catch (err) {
        console.warn("Reviews fetch notice (using default reviews):", err);
      }

      try {
        const servicesRes = await fetch(`${apiPath}/api/services`);
        if (servicesRes.ok) {
          const data = await servicesRes.json();
          if (data && !data.offline && Array.isArray(data) && data.length > 0) {
            setServices(data);
          }
        }
      } catch (err) {
        console.warn("Services fetch notice (using default services):", err);
      }
    }
    fetchData();
  }, []);

  const activeSlideData = heroSlides[currentSlide];

  const handleGuideSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (guideForm.name && guideForm.email && guideForm.phone) {
      setGuideLoading(true);
      setGuideErrorMsg("");
      try {
        await submitLeadForm({
          type: "investor_guide_request",
          ...guideForm
        });

        setGuideSubmitted(true);
      } catch (error: any) {
        console.error("Error submitting guide request", error);
        setGuideErrorMsg(error.message || "Failed to submit. Please try again.");
      } finally {
        setGuideLoading(false);
      }
    }
  };

  return (
    <div className="font-sans bg-[#0B1920] text-slate-100 min-h-screen">
      <OrganizationSchema />
      <LocalBusinessSchema />

      {/* 1. Stocker Demo Hero Carousel Banner */}
      <section
        className="relative overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center border-b border-slate-800 transition-all duration-700"
        style={{
          background: `linear-gradient(rgba(11, 25, 32, 0.88), rgba(11, 25, 32, 0.94)), url('${activeSlideData.bgImage}') center/cover no-repeat`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Left/Center Content */}
            <div className="lg:col-span-10 lg:col-start-2 text-center space-y-6">
              <div className="inline-block">
                <span className="text-[#D4AF37] font-roboto font-extrabold text-sm sm:text-base tracking-[0.2em] uppercase bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full shadow-lg">
                  {activeSlideData.subtitle}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-roboto font-black text-white leading-tight uppercase tracking-tight max-w-5xl mx-auto drop-shadow-md">
                {activeSlideData.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
                {activeSlideData.desc}
              </p>

              {/* Stocker Template Dual Pill Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  to="/eligibility-checker"
                  className="bg-white hover:bg-slate-100 text-[#0B1920] font-bold px-7 py-3.5 rounded-full shadow-xl flex items-center justify-center gap-2.5 text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105"
                >
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                  </span>
                  Check Claim Eligibility
                </Link>
                <Link
                  to="/services"
                  className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B1920] font-extrabold px-8 py-3.5 rounded-full shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105"
                >
                  Explore Services
                </Link>
              </div>

              {/* Follow Us / Quick Contact Bar (as seen in Stocker Demo Screenshot) */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-slate-700/60 max-w-2xl mx-auto text-xs text-slate-300">
                <span className="font-roboto font-bold uppercase tracking-wider text-slate-200">Follow Us / Direct Desk:</span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://wa.me/919823662901"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white text-[#0B1920] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center transition-all shadow"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <a
                    href="tel:+919823662901"
                    className="w-8 h-8 rounded-full bg-white text-[#0B1920] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center transition-all shadow"
                    aria-label="Call Office"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:info@kirs.co.in"
                    className="w-8 h-8 rounded-full bg-white text-[#0B1920] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center transition-all shadow"
                    aria-label="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href="https://maps.google.com/?q=Pune"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white text-[#0B1920] hover:bg-[#D4AF37] hover:text-white flex items-center justify-center transition-all shadow"
                    aria-label="View Location"
                  >
                    <MapPin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stocker Carousel Bottom-Left Navigation Arrow Controls */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B1920] flex items-center justify-center shadow-2xl transition-all hover:scale-110 focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6 stroke-[3]" />
          </button>
          <button
            onClick={nextSlide}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B1920] flex items-center justify-center shadow-2xl transition-all hover:scale-110 focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1.5 ml-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? "w-6 bg-[#D4AF37]" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Featured Section: Recovery of Shares From IEPF */}
      <section className="bg-gradient-to-r from-[#17303B] via-[#0B1920] to-[#17303B] text-white py-16 border-y border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Info Column */}
            <div className="lg:w-1/2 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Featured Specialization
              </div>
              <h2 className="font-roboto text-3xl sm:text-4xl text-white font-extrabold leading-tight">
                Recovery of Shares From IEPF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#C5A028]">
                  Claim Unclaimed & Lost Shares
                </span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Under Section 124(6) of the Companies Act 2013, physical or demat shares with unclaimed dividends for 7 consecutive years are transferred to the IEPF Authority. We offer specialized legal drafting, RTA coordination, duplicate certificate issuance (Form ISR-4), and MCA Form IEPF-5 filing.
              </p>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-[#0B1920]/80 p-3 rounded-xl border border-slate-800 text-left">
                  <div className="font-bold text-[#D4AF37] text-xs sm:text-sm">Form IEPF-5 Claim</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">MCA Portal & Nodal Verification</div>
                </div>
                <div className="bg-[#0B1920]/80 p-3 rounded-xl border border-slate-800 text-left">
                  <div className="font-bold text-[#D4AF37] text-xs sm:text-sm">Duplicate Shares</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">ISR-4 & Newspaper Notice</div>
                </div>
                <div className="bg-[#0B1920]/80 p-3 rounded-xl border border-slate-800 text-left">
                  <div className="font-bold text-[#D4AF37] text-xs sm:text-sm">Transmission Claim</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Deceased Shareholder Succession</div>
                </div>
                <div className="bg-[#0B1920]/80 p-3 rounded-xl border border-slate-800 text-left">
                  <div className="font-bold text-[#D4AF37] text-xs sm:text-sm">Direct Demat Credit</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Shares & Dividends Refunded</div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  to="/recovery-of-shares"
                  className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B1920] font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/25 flex items-center gap-2 transition-all hover:scale-105"
                >
                  Explore Complete Share Recovery Guide <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/eligibility-checker"
                  className="bg-[#0B1920] hover:bg-[#17303B] border border-[#D4AF37]/40 text-white font-semibold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all"
                >
                  Check Claim Eligibility
                </Link>
              </div>
            </div>

            {/* Right Interactive Highlights Card */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-[#0B1920]/90 backdrop-blur border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-4">
                <h3 className="font-roboto font-bold text-white text-lg flex items-center justify-between border-b border-slate-800 pb-3">
                  <span>IEPF & Share Recovery Spectrum</span>
                  <Award className="w-5 h-5 text-[#D4AF37]" />
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-[#17303B]/60 p-3.5 rounded-xl border border-slate-700/50 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">Lost Physical Share Certificates</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Filing FIR, publishing newspaper notices, drafting indemnity bonds & Form ISR-4.</p>
                    </div>
                  </div>

                  <div className="bg-[#17303B]/60 p-3.5 rounded-xl border border-slate-700/50 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">Unclaimed Dividends & IEPF Transfers</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Tracking MCA IEPF master ledgers, filing Form IEPF-5, and coordinating with RTA Nodal Officers.</p>
                    </div>
                  </div>

                  <div className="bg-[#17303B]/60 p-3.5 rounded-xl border border-slate-700/50 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">Inherited Shares Transmission</h4>
                      <p className="text-slate-400 text-xs mt-0.5">Legal heir documentation, NOCs, family genealogy, and Succession Certificate support.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link to="/recovery-of-shares" className="text-xs text-[#D4AF37] font-bold hover:underline inline-flex items-center gap-1">
                    View full scenario matrix, checklists & turnaround timeline <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flyers and Specific Focus Areas */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Our Core Expertise</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold mt-2">
              Individual, Corporate & NRI Investment
            </h2>
            <div className="w-16 h-[2px] bg-secondary mx-auto mt-4 mb-4"></div>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              With millions of accounts remaining inactive, regulatory bodies like the RBI, IEPF, IRDA and PFRDA encourage citizens to actively trace their forgotten assets. We provide dedicated solutions to track, consolidate, and retrieve lost wealth across multiple financial asset classes for individuals, corporates, and NRIs, ensuring your rightful legacy is secured.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Link to="/services/iepf-process-lost-shares-dividend" className="group">
              <div className="bg-[#17303B] p-6 rounded-2xl shadow-lg border border-slate-700/60 hover:border-[#D4AF37] hover:shadow-[#D4AF37]/10 transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-[#D4AF37]/15 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B1920] transition-colors">
                    <TrendingUp className="w-7 h-7" />
                  </div>
                  <h4 className="font-roboto font-bold text-white mb-2 text-sm sm:text-base">1) IEPF Process & Lost Shares, Dividend</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">Advisory on Form IEPF-5 filing, dividend recoveries, and SEBI compliance guidelines.</p>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider mt-5 flex items-center justify-center gap-1">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link to="/services/lost-mutual-fund" className="group">
              <div className="bg-[#17303B] p-6 rounded-2xl shadow-lg border border-slate-700/60 hover:border-[#D4AF37] hover:shadow-[#D4AF37]/10 transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-[#D4AF37]/15 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B1920] transition-colors">
                    <Award className="w-7 h-7" />
                  </div>
                  <h4 className="font-roboto font-bold text-white mb-2 text-sm sm:text-base">2) Lost Mutual Fund Retrieval</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">Reclaim misplaced folios, resolve duplicate certificate issues, and process registry corrections.</p>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider mt-5 flex items-center justify-center gap-1">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link to="/services/unclaimed-bank-nbfc-deposit" className="group">
              <div className="bg-[#17303B] p-6 rounded-2xl shadow-lg border border-slate-700/60 hover:border-[#D4AF37] hover:shadow-[#D4AF37]/10 transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-[#D4AF37]/15 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B1920] transition-colors">
                    <Building className="w-7 h-7" />
                  </div>
                  <h4 className="font-roboto font-bold text-white mb-2 text-sm sm:text-base">3) Unclaimed Bank & NBFC Deposit</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">Retrieve long-term inactive savings, current accounts, and dormant fixed deposits (FD).</p>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider mt-5 flex items-center justify-center gap-1">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link to="/services/unclaimed-insurance-policy" className="group">
              <div className="bg-[#17303B] p-6 rounded-2xl shadow-lg border border-slate-700/60 hover:border-[#D4AF37] hover:shadow-[#D4AF37]/10 transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-[#D4AF37]/15 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B1920] transition-colors">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <h4 className="font-roboto font-bold text-white mb-2 text-sm sm:text-base">4) Unclaimed Insurance Policy</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">Claim pending life insurance maturity proceed sums, death claims, and survival benefits.</p>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider mt-5 flex items-center justify-center gap-1">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link to="/services/missing-unclaimed-pension-amount" className="group">
              <div className="bg-[#17303B] p-6 rounded-2xl shadow-lg border border-slate-700/60 hover:border-[#D4AF37] hover:shadow-[#D4AF37]/10 transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-[#D4AF37]/15 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B1920] transition-colors">
                    <Users className="w-7 h-7" />
                  </div>
                  <h4 className="font-roboto font-bold text-white mb-2 text-sm sm:text-base">5) Missing & Unclaimed Pension Amount</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">Track and retrieve forgotten workplace pension funds and accumulated provident fund assets.</p>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider mt-5 flex items-center justify-center gap-1">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link to="/services/court-support" className="group">
              <div className="bg-[#17303B] p-6 rounded-2xl shadow-lg border border-slate-700/60 hover:border-[#D4AF37] hover:shadow-[#D4AF37]/10 transition-all duration-300 hover:-translate-y-1 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-[#D4AF37]/15 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0B1920] transition-colors">
                    <Scale className="w-7 h-7" />
                  </div>
                  <h4 className="font-roboto font-bold text-white mb-2 text-sm sm:text-base">6) Legal & Court Support</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">Expert coordination for court Succession Certificates, Legal Heirship Certificates, and Will Probates.</p>
                </div>
                <div className="text-[11px] text-[#D4AF37] font-bold uppercase tracking-wider mt-5 flex items-center justify-center gap-1">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Authority Bar */}
      <section className="bg-[#0B1920] border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold text-center text-[#D4AF37] uppercase tracking-widest mb-6">
            Educational Ecosystem Map – Guided Recovery Expertise
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center items-center">
            {authorityLogos.map((logo) => (
              <div
                key={logo.name}
                className="bg-[#17303B] p-4 rounded-xl shadow border border-slate-700/70 hover:border-[#D4AF37] transition-all group cursor-help relative"
              >
                <span className="text-white font-roboto font-bold text-xs tracking-wider group-hover:text-[#D4AF37] transition-colors">
                  {logo.name}
                </span>
                <p className="text-[9.5px] text-slate-400 mt-1">{logo.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[9.5px] text-slate-400 text-center mt-5 italic">
            *Disclaimer: Educational representation of the Indian corporate registrar registry systems. KIRS has no official affiliation with MCA, SEBI or IEPF.
          </p>
        </div>
      </section>

      {/* 3. Services Directory Section */}
      <section className="py-20 bg-[#0B1920] border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Full Catalogue</span>
            <h2 className="font-roboto text-3xl sm:text-4xl text-white font-extrabold tracking-tight mt-1">
              Our Financial Recovery Specializations
            </h2>
            <div className="w-16 h-[3px] bg-[#D4AF37] mx-auto mt-3 mb-4 rounded-full"></div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We provide structured documentation checklists, procedural legal counseling, and RTA liaison representation across all recovery categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.slug}
                className="bg-[#17303B] rounded-2xl p-6 shadow-lg border border-slate-700/60 hover:shadow-2xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-xl flex items-center justify-center text-[#D4AF37]">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-roboto text-lg font-bold text-white">{service.title}</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">{service.shortDesc}</p>
                </div>
                <div className="pt-6 border-t border-slate-700/60 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                    Est. Timeline: {service.timeline.split(" ")[0]} {service.timeline.split(" ")[1] || ""}
                  </span>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-[#D4AF37] hover:text-[#F59E0B] font-bold text-xs flex items-center gap-1 group transition-colors"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-[#D4AF37]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B1920] font-extrabold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-xl transition-all hover:scale-105"
            >
              Explore All Recovery Services
              <ChevronRight className="w-4 h-4 text-[#0B1920]" />
            </Link>
          </div>
        </div>
      </section>
      {/* 4. The Recovery Process (Animated Timeline) */}
      <section className="py-20 bg-[#0B1920] border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Step-By-Step Security</span>
            <h2 className="font-roboto text-3xl sm:text-4xl text-white font-extrabold mt-1">
              Our 7-Step Recovery Protocol
            </h2>
            <div className="w-16 h-[3px] bg-[#D4AF37] mx-auto mt-3 mb-4 rounded-full"></div>
            <p className="text-slate-300 text-sm">
              How KIRS securely translates your paper folios and missing claims into active Demat assets.
            </p>
          </div>

          {/* Interactive process list */}
          <div className="relative border-l-2 border-[#D4AF37]/40 ml-4 md:ml-0 md:grid md:grid-cols-7 md:border-l-0 md:border-t-2 md:pt-10 md:gap-4 space-y-8 md:space-y-0">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative pl-6 md:pl-0 text-left md:text-center space-y-2 group">
                {/* Visual marker dot */}
                <div className="absolute -left-[9px] top-1 md:left-1/2 md:-translate-x-1/2 md:-top-[49px] w-5 h-5 rounded-full bg-[#17303B] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg z-10 group-hover:bg-[#D4AF37] transition-colors">
                  <div className="w-2 h-2 bg-[#D4AF37] group-hover:bg-[#0B1920] rounded-full"></div>
                </div>

                <div className="text-xs font-bold text-[#D4AF37] font-mono">STEP 0{idx + 1}</div>
                <h4 className="font-roboto text-sm font-bold text-white">{step.title}</h4>
                <p className="text-slate-300 text-[11px] leading-relaxed md:px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Founder & Expert Section (Personal Branding) */}
      <section className="py-20 bg-[#0B1920]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Founder visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div
                className="relative w-80 h-96 border-4 border-[#D4AF37] rounded-2xl shadow-2xl overflow-hidden bg-[#17303B] max-w-full"
                style={{ maxWidth: "320px", maxHeight: "384px" }}
              >
                <img
                  src={`${getBasePath()}/founder.png`}
                  alt="Mr. Pradip Samgir - Founder & Chief Consultant"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1920] via-transparent to-transparent z-10 flex flex-col justify-end p-6 text-white text-center">
                  <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">Founder & Chief Consultant</span>
                  <h3 className="font-roboto text-xl font-bold mt-1 text-white">Mr. Pradip Samgir</h3>
                  <p className="text-[11px] text-slate-300 mt-1">Investment & Share Recovery Expert</p>
                </div>
              </div>
              {/* Back decoration */}
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-[#D4AF37]/15 rounded-full -z-10 blur-xl"></div>
            </div>

            {/* Founder details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">The Face of Trust & Authority</span>
              <h2 className="font-roboto text-3xl sm:text-4xl text-white font-extrabold leading-tight">
                Built on 30+ Years of Indian Capital Market Experience
              </h2>
              <div className="w-16 h-[3px] bg-[#D4AF37] rounded-full"></div>

              <p className="text-slate-300 text-sm leading-relaxed">
                "Over the past two decades, trillions of rupees in shares and dividends have accumulated unclaimed in corporate registries and government funds due to spelling errors, misplaced paper certificates, and changing family generations. Our mission is to restore this forgotten wealth back to the families who earned it."
              </p>

              <p className="text-slate-300 text-xs leading-relaxed">
                As a senior investment specialist, Mr. Samgir has dedicated his career to tracking corporate registries, dematerializing old share folios, and structuring ironclad legal documentation. He acts as the guiding expert behind our team of document auditors, helping families navigate the complex maze of Registrars (RTAs), corporate offices, and regulatory authorities with ease.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                <div className="space-y-1">
                  <span className="text-sm font-bold text-[#D4AF37]">Core Expertise Areas</span>
                  <p className="text-slate-400 text-xs">IEPF Claim Auditing, Succession Certifications, Duplicate Share Filings, NRI Estate Verification.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-bold text-[#D4AF37]">Mission Focus</span>
                  <p className="text-slate-400 text-xs">Helping clients reclaim their financial legacy through zero-error legal drafting and ethical processing.</p>
                </div>
              </div>

              {/* Expert quote signature */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#17303B] flex items-center justify-center border border-slate-700">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-white">Verified Advisory Board</span>
                  <p className="text-[10px] text-slate-400">Kalavati Investment & Recovery Services (KIRS)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Success Metrics Section */}
      <section className="bg-[#17303B] text-white py-16 relative overflow-hidden border-y border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(212,175,55,0.15),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-roboto text-[#D4AF37]">₹54+ Crores</div>
              <p className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Unclaimed Assets Audited</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-roboto text-[#D4AF37]">250+</div>
              <p className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Investors Assisted</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-roboto text-[#D4AF37]">98.4%</div>
              <p className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Document Audit Accuracy</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-roboto text-[#D4AF37]">30+ Years</div>
              <p className="text-xs text-slate-300 uppercase tracking-widest font-semibold">Consulting Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Verified Reviews / Testimonials */}
      {reviews.length > 0 && (
        <section className="py-20 bg-[#0B1920]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Client Endorsements</span>
              <h2 className="font-roboto text-3xl sm:text-4xl text-white font-extrabold mt-1">
                Investor Trust & Google Reviews
              </h2>
              <div className="w-16 h-[3px] bg-[#D4AF37] mx-auto mt-3 mb-4 rounded-full"></div>
              <p className="text-slate-300 text-sm">
                Real reviews from families who successfully recovered their ancestral shareholdings through our support.
              </p>
              <div className="mt-5">
                <Link
                  to="/reviews"
                  className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C5A028] text-[#0B1920] font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg transition-all duration-200"
                >
                  View & Submit Reviews
                  <ArrowRight className="w-3.5 h-3.5 text-[#0B1920]" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="bg-[#17303B] p-6 rounded-2xl border border-slate-700/70 shadow-lg space-y-4 flex flex-col justify-between hover:border-[#D4AF37] transition-all hover:-translate-y-1">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`${i < review.rating ? 'text-[#D4AF37]' : 'text-slate-600'} text-lg`}>★</span>
                      ))}
                    </div>
                    <p className="text-slate-300 text-xs italic leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-700/70 flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{review.name}</span>
                    <span className="text-[9px] bg-[#D4AF37]/15 text-[#D4AF37] font-bold px-2.5 py-0.5 rounded-full uppercase border border-[#D4AF37]/30">{review.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Advanced Lead Generation Box (Guide Download Magnet) */}
      <section className="py-20 bg-[#F8F9FA] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#17303B] text-white rounded-3xl shadow-2xl overflow-hidden border border-[#D4AF37]/40 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/20 blur-2xl rounded-full"></div>

            <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="inline-block bg-[#0B1920] text-[#D4AF37] text-[10.5px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
                  Free Investor Guide
                </div>
                <h3 className="font-roboto text-2xl sm:text-3xl text-white font-extrabold leading-tight">
                  Ultimate Guide to Recovering Lost Shares & IEPF Claims
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Download our step-by-step documentation handbook. Learn how to update signature records, prepare legal heir affidavits, and submit IEPF-5 forms successfully.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>RTA-approved checklist formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>IEPF-5 MCA online filing guide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Succession vs nomination checklist</span>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-5 bg-[#0B1920] p-6 rounded-2xl border border-slate-800 shadow-inner">
                {guideSubmitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-12 h-12 bg-[#D4AF37]/15 border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto">
                      <Download className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h4 className="font-roboto text-sm font-bold text-white">Download Initiated!</h4>
                    <p className="text-slate-400 text-[10.5px] leading-relaxed">
                      We have sent your PDF guide download link to your email. Check your inbox.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleGuideSubmit} className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Enter details for PDF link</h4>
                    
                    {guideErrorMsg && (
                      <div className="p-2.5 bg-red-950 border border-red-800 text-red-200 rounded-lg text-[10px]">
                        {guideErrorMsg}
                      </div>
                    )}
                    
                    <div>
                      <label className="sr-only">Full Name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={guideForm.name}
                        onChange={(e) => setGuideForm({ ...guideForm, name: e.target.value })}
                        className="w-full text-xs bg-[#17303B] border border-slate-700/80 focus:border-[#D4AF37] focus:outline-none text-white px-3.5 py-2.5 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="sr-only">Email Address</label>
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={guideForm.email}
                        onChange={(e) => setGuideForm({ ...guideForm, email: e.target.value })}
                        className="w-full text-xs bg-[#17303B] border border-slate-700/80 focus:border-[#D4AF37] focus:outline-none text-white px-3.5 py-2.5 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="sr-only">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        required
                        value={guideForm.phone}
                        onChange={(e) => setGuideForm({ ...guideForm, phone: e.target.value })}
                        className="w-full text-xs bg-[#17303B] border border-slate-700/80 focus:border-[#D4AF37] focus:outline-none text-white px-3.5 py-2.5 rounded-xl"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={guideLoading}
                      className="w-full bg-[#D4AF37] hover:bg-[#C5A028] disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-[#0B1920] font-bold text-xs py-3.5 rounded-full uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-[#D4AF37]/25"
                    >
                      {guideLoading ? (
                        "Requesting..."
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          Get PDF Handbook
                        </>
                      )}
                    </button>
                    <p className="text-[9px] text-slate-400 text-center leading-normal">
                      We respect your privacy. Secure document protocols apply.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
