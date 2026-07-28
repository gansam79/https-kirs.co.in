import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  TrendingUp,
  FileCheck,
  Users,
  Search,
  BookOpen,
  Award,
  ChevronRight,
  Download,
  CheckCircle,
  Building,
  UserCheck,
  Scale,
  Calculator,
  Sparkles,
  ArrowRight,
  Clock,
  AlertTriangle,
  FileText,
  HelpCircle,
  PhoneCall,
  Send,
  Loader2,
  CheckCircle2,
  Lock,
  Layers,
  SearchCheck,
  RefreshCw,
  Landmark,
  BadgeCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getBasePath, getApiBasePath } from "@/lib/basePath";

// Scenarios matrix for interactive document finder
const scenariosData = [
  {
    id: "lost-certificates",
    title: "Lost Share Certificates",
    desc: "Original physical certificates missing, misplaced during shifting, or damaged.",
    badge: "Form ISR-4 + Duplicate Process",
    steps: [
      "Filing FIR / Police Complaint for lost physical share certificates",
      "Publication of Newspaper Notice in National & Vernacular dailies",
      "Drafting Indemnity Bond on non-judicial stamp paper & Surety Affidavit",
      "Submission of Form ISR-4 to Registrar & Share Transfer Agent (RTA)"
    ],
    documents: [
      "Form ISR-1 (KYC Details Updation)",
      "Form ISR-2 (Bank Manager Attestation)",
      "Form ISR-4 (Request for Duplicate Certificate)",
      "Copy of FIR / Police Complaint",
      "Draft Indemnity & Surety Bonds"
    ]
  },
  {
    id: "iepf-transfer",
    title: "Transferred to IEPF",
    desc: "Dividends unpaid for 7 consecutive years; shares transferred to MCA IEPF Authority.",
    badge: "Form IEPF-5 Reclaim",
    steps: [
      "Auditing Company & RTA IEPF Unclaimed Master Ledgers",
      "Filing Form IEPF-5 online on MCA Portal",
      "Submitting physical dossier to Company Nodal Officer",
      "Nodal Verification & Direct Demat Transfer by IEPF Authority"
    ],
    documents: [
      "Form IEPF-5 SRN Ack Receipt",
      "Indemnity Bond for IEPF Claim",
      "Original Certificates (or ISR-4 duplicate)",
      "Active Demat Client Master List (CML)",
      "Advance Stamped Receipt & Aadhaar/PAN"
    ]
  },
  {
    id: "deceased-holder",
    title: "Transmission (Deceased Holder)",
    desc: "Shareholder passed away; legal heirs or nominees reclaiming ancestral shares.",
    badge: "Transmission & Legal Heirship",
    steps: [
      "Compiling notarized Death Certificate & Family Succession proof",
      "Executing No-Objection Certificates (NOC) / Relinquishment Deeds",
      "Obtaining Court Succession Certificate (for high-value claims without nomination)",
      "Transmitting shares to Legal Heir's Demat Account"
    ],
    documents: [
      "Form ISR-1 & Form ISR-2 of Legal Heir",
      "Notarized Death Certificate",
      "Legal Heirship Certificate / Will / Succession Certificate",
      "Form ISR-4 / Transmission Form",
      "NOC from other legal heirs on stamp paper"
    ]
  },
  {
    id: "name-signature-mismatch",
    title: "Name & Signature Mismatch",
    desc: "Signature changed over time or spelling discrepancy between PAN, Aadhaar, and RTA records.",
    badge: "ISR-1 & ISR-2 Rectification",
    steps: [
      "Verification of signature mismatch by original Banker via Form ISR-2",
      "Name gazette publication or marriage affidavit (for maiden name changes)",
      "Filing Form ISR-1 for PAN & Demat linkage",
      "RTA signature database updating"
    ],
    documents: [
      "Form ISR-2 (Bank Manager Attestation with Seal)",
      "Form ISR-1 for KYC updation",
      "Self-attested PAN & Aadhaar",
      "Gazette Notification / Marriage Certificate (if applicable)",
      "Original Client Master List (CML)"
    ]
  }
];

const processSteps = [
  {
    num: "01",
    title: "Folio & IEPF Ledger Search",
    desc: "We perform a thorough search across RTA archives, IEPF MCA ledgers, and corporate registers using PAN, old addresses, and folio numbers."
  },
  {
    num: "02",
    title: "KYC & Specimen Signature Audit",
    desc: "We align your current bank, PAN, and address with RTA databases via Form ISR-1 and obtain bank manager signature attestation (ISR-2)."
  },
  {
    num: "03",
    title: "Duplicate Certificate / Transmission",
    desc: "If physical certificates are lost or the shareholder is deceased, we draft legal affidavits, indemnity bonds, and obtain RTA approvals."
  },
  {
    num: "04",
    title: "MCA IEPF-5 Form Filing",
    desc: "Our legal consultants draft and file MCA Form IEPF-5 online, generating the official SRN tracking receipt."
  },
  {
    num: "05",
    title: "Physical Dossier Verification",
    desc: "We compile and deliver the physical verification dossier directly to the Company's Nodal Officer & Registrar."
  },
  {
    num: "06",
    title: "Nodal Verification & Audit",
    desc: "The corporate Nodal Officer verifies the dossier and submits the Verification Report to the IEPF Authority."
  },
  {
    num: "07",
    title: "Direct Demat Credit",
    desc: "The IEPF Authority sanctions the claim, crediting shares directly into your Demat account and transferring accrued dividends to your bank."
  }
];

const faqs = [
  {
    question: "Why were my shares transferred to the IEPF?",
    answer: "Under Section 124(6) of the Companies Act, 2013, if dividends on a share remain unpaid or unclaimed for seven consecutive years, the underlying shares and accumulated dividend amounts must be transferred by the company to the Investor Education and Protection Fund (IEPF) Authority."
  },
  {
    question: "Can I recover shares if I have lost the original physical share certificates?",
    answer: "Yes! You can recover your shares even if physical certificates are lost. The procedure involves applying for duplicate share certificates (via Form ISR-4), publishing a public notice in local and national newspapers, drafting an Indemnity Bond with Surety, and filing the duplicate claim alongside your IEPF-5 application."
  },
  {
    question: "How long does the IEPF share recovery process take?",
    answer: "The IEPF recovery process generally takes 6 to 12 months. Timeline depends on RTA response speeds, accuracy of KYC documents, Nodal Officer verification at the company level, and final approval by the Ministry of Corporate Affairs (MCA) IEPF Authority."
  },
  {
    question: "What is required to claim shares of a deceased family member?",
    answer: "To claim shares belonging to a deceased family member, you need a notarized Death Certificate, legal heirship proof, Form ISR-1 & ISR-2, and No Objection Certificates (NOC) from other legal heirs. For share values exceeding ₹5 Lakhs without nomination, a court-issued Succession Certificate or Probate may be required."
  },
  {
    question: "What is Form IEPF-5 and who files it?",
    answer: "Form IEPF-5 is an online claim application mandated by the Ministry of Corporate Affairs (MCA) under Rule 7(1) of the IEPF Authority Rules. It must be filed online by the rightful shareholder or legal heir to reclaim transferred shares and accumulated dividends."
  },
  {
    question: "Will I get accumulated dividends along with my recovered shares?",
    answer: "Yes! When your IEPF claim is approved, the IEPF Authority releases both the underlying equity shares (directly into your Demat account) and all accumulated unpaid dividends (directly into your verified bank account via ECS/NEFT)."
  }
];

export default function RecoveryOfSharesPage() {
  const [activeScenario, setActiveScenario] = useState("lost-certificates");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    claimType: "IEPF Recovery",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.phone) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const apiPath = getApiBasePath();
      const response = await fetch(`${apiPath}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "share_recovery_inquiry",
          ...formState
        })
      });

      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMsg(err.message || "Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  };

  const selectedScenario = scenariosData.find((s) => s.id === activeScenario)!;

  return (
    <div className="font-sans bg-slate-50 text-slate-800 pb-16">
      {/* Dynamic SEO Meta Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Recovery of Shares From IEPF - Claim Unclaimed and Lost Shares",
            "provider": {
              "@type": "FinancialService",
              "name": "Kalavati Investment & Recovery Services (KIRS)"
            },
            "serviceType": "IEPF Share Recovery Consultancy",
            "areaServed": "India",
            "description":
              "Specialized legal and documentation consultancy for recovering lost shares, duplicate share certificates, unclaimed dividends, and IEPF-5 claims."
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-slate-900 to-slate-950 text-white pt-12 pb-20 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span>IEPF & RTA Share Recovery Specialists</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                Recovery of Shares From IEPF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-yellow-300 to-amber-400">
                  Claim Unclaimed & Lost Shares
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
                Have your shares or dividends been transferred to the Investor Education & Protection Fund (IEPF)? 
                Lost physical share certificates? Facing signature or name mismatches? We provide end-to-end legal drafting, 
                RTA coordination, and MCA IEPF-5 filing to restore your wealth safely into your Demat account.
              </p>

              {/* Key Trust Signals */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl flex items-center gap-3">
                  <ShieldCheck className="w-7 h-7 text-secondary shrink-0" />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm">100% Legal</div>
                    <div className="text-xs text-slate-400">MCA & SEBI Compliant</div>
                  </div>
                </div>
                <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl flex items-center gap-3">
                  <Award className="w-7 h-7 text-yellow-400 shrink-0" />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm">₹500+ Crore</div>
                    <div className="text-xs text-slate-400">Assets Reclaimed</div>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-slate-800/60 backdrop-blur border border-slate-700/60 p-3.5 rounded-xl flex items-center gap-3">
                  <Users className="w-7 h-7 text-emerald-400 shrink-0" />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm">Pan-India</div>
                    <div className="text-xs text-slate-400">All RTAs & Companies</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="#free-evaluation"
                  className="bg-secondary hover:bg-yellow-500 text-primary font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-yellow-500/20 flex items-center gap-2 text-sm sm:text-base transition-all duration-200"
                >
                  <SearchCheck className="w-5 h-5" />
                  Free Share Recovery Audit
                </a>
                <Link
                  to="/asset-calculator"
                  className="bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2 text-sm sm:text-base transition-all duration-200"
                >
                  <Calculator className="w-5 h-5 text-secondary" />
                  Estimate Share Value
                </Link>
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div id="free-evaluation" className="lg:col-span-5">
              <div className="bg-white/95 backdrop-blur-xl border border-slate-200 text-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-primary">Claim Your Unclaimed Shares</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Free Case Evaluation & Document Verification</p>
                  </div>
                  <BadgeCheck className="w-8 h-8 text-secondary" />
                </div>

                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">Request Submitted Successfully!</h4>
                    <p className="text-sm text-slate-600">
                      Our IEPF recovery specialist will review your details and contact you within 24 hours to begin your share audit.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-semibold text-secondary hover:underline"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Company Name / Folio (Optional)
                      </label>
                      <input
                        type="text"
                        value={formState.companyName}
                        onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
                        placeholder="e.g. Reliance Industries, Tata Motors, HDFC"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Recovery Type
                      </label>
                      <select
                        value={formState.claimType}
                        onChange={(e) => setFormState({ ...formState, claimType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm bg-white"
                      >
                        <option value="IEPF Recovery">IEPF Share & Dividend Recovery</option>
                        <option value="Lost Certificate">Lost Physical Share Certificates (Duplicate)</option>
                        <option value="Transmission Claim">Deceased Shareholder Transmission</option>
                        <option value="Signature/Name Mismatch">Signature or Name Discrepancy</option>
                        <option value="General Audit">Complete Portfolio Audit</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all duration-200 disabled:opacity-75"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                          Processing Audit Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-secondary" />
                          Get Free Share Recovery Audit
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3 text-slate-400" />
                      100% Confidential & Secure Data Encryption
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RTA & Authority Partners Strip */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Coordinating Across All Major Registrars & Transfer Agents (RTAs) & Regulators
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-85">
            <span className="font-bold text-slate-700 text-sm sm:text-base border border-slate-200 px-4 py-2 rounded-lg bg-slate-50">
              IEPF Authority (MCA)
            </span>
            <span className="font-bold text-slate-700 text-sm sm:text-base border border-slate-200 px-4 py-2 rounded-lg bg-slate-50">
              SEBI Guidelines
            </span>
            <span className="font-bold text-slate-700 text-sm sm:text-base border border-slate-200 px-4 py-2 rounded-lg bg-slate-50">
              CAMS
            </span>
            <span className="font-bold text-slate-700 text-sm sm:text-base border border-slate-200 px-4 py-2 rounded-lg bg-slate-50">
              KFin Technologies
            </span>
            <span className="font-bold text-slate-700 text-sm sm:text-base border border-slate-200 px-4 py-2 rounded-lg bg-slate-50">
              Link Intime India
            </span>
            <span className="font-bold text-slate-700 text-sm sm:text-base border border-slate-200 px-4 py-2 rounded-lg bg-slate-50">
              Bigshare Services
            </span>
          </div>
        </div>
      </section>

      {/* Why Shares Get Transferred to IEPF Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            Why Do Shares & Dividends Get Transferred to IEPF?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            According to Section 124(6) of the Companies Act 2013, if dividends on physical or demat shares remain unclaimed for seven consecutive years, the company must transfer those shares and accrued funds to the IEPF.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">7 Years Unclaimed Dividends</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Dividend warrants returned undelivered or left uncashed in old bank accounts for 7 consecutive years trigger mandatory IEPF transfer.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-xl flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Lost Physical Certificates</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Misplaced paper share certificates, damaged documents, or untraceable folio details during house relocation or family division.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Name & Signature Mismatches</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Discrepancies in old signature records on file with RTAs, maiden name changes after marriage, or PAN card spelling variations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-4">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Deceased Shareholder (Transmission)</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Original investor passed away without nominee registration, requiring legal heir verification or Succession Certificate.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Scenario & Document Finder */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" /> Interactive Claim Navigator
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
              Select Your Share Recovery Scenario
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Explore custom workflows and mandatory documentation based on your specific case.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {scenariosData.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveScenario(s.id)}
                className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 border ${
                  activeScenario === s.id
                    ? "bg-primary text-white border-primary shadow-lg"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Active Scenario Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
              <div>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full">
                  {selectedScenario.badge}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-2">
                  {selectedScenario.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1">{selectedScenario.desc}</p>
              </div>
              <a
                href="#free-evaluation"
                className="bg-secondary hover:bg-yellow-500 text-primary font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm text-center shrink-0"
              >
                Start Claim Process
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mandatory Execution Steps */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2 mb-4">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Action & Legal Milestones
                </h4>
                <ul className="space-y-3">
                  {selectedScenario.steps.map((st, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents Checklist */}
              <div>
                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-secondary" /> Key Required Documents
                </h4>
                <ul className="space-y-2.5">
                  {selectedScenario.documents.map((doc, idx) => (
                    <li key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Need help gathering these forms?</span>
                  <Link to="/document-checklist" className="text-secondary font-bold hover:underline flex items-center gap-1">
                    Full Document Checklist <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Recovery Process */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
            Our 7-Step IEPF Share Recovery Procedure
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            A transparent, legal roadmap from audit to direct Demat credit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((p, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <span className="text-3xl font-serif font-bold text-secondary/80 block mb-2">
                  {p.num}
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">{p.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-semibold">
                Milestone #{idx + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/recovery-roadmap"
            className="inline-flex items-center gap-2 bg-primary hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Explore Interactive 7-Step Recovery Roadmap <ArrowRight className="w-4 h-4 text-secondary" />
          </Link>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary">
              Frequently Asked Questions (IEPF Share Recovery)
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Clear answers regarding legal frameworks, MCA Form IEPF-5, lost certificates, and turnaround times.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 pl-8 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary via-slate-900 to-slate-950 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Ready to Claim Your Lost & IEPF Shares?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Talk directly with a senior IEPF recovery consultant. We inspect your physical documents, verify RTA records, and handle your claim seamlessly.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0 w-full md:w-auto">
            <a
              href="#free-evaluation"
              className="w-full sm:w-auto bg-secondary hover:bg-yellow-500 text-primary font-bold px-7 py-3.5 rounded-xl text-sm text-center shadow-lg transition-all"
            >
              Request Free Audit
            </a>
            <a
              href="https://wa.me/919823662901"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm text-center flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4" /> WhatsApp Specialist
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
