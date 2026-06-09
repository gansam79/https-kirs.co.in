"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Download,
  CheckCircle,
  Building,
  UserCheck,
  Scale
} from "lucide-react";
import { motion } from "framer-motion";
import { servicesData } from "@/data/servicesData";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/layout/JsonLd";

const authorityLogos = [
  { name: "IEPF", desc: "Investor Education & Protection Fund" },
  { name: "SEBI Framework", desc: "Securities & Exchange Board of India Guidelines" },
  { name: "NSDL Ecosystem", desc: "National Securities Depository Ecosystem" },
  { name: "CDSL Ecosystem", desc: "Central Depository Services Ecosystem" },
  { name: "MCA Portal", desc: "Ministry of Corporate Affairs filings" },
];

const chooseReasons = [
  {
    title: "Expert Documentation Team",
    desc: "Our specialists draft complex affidavits, indemnity bonds, surety representations, and RTA applications tailored to exact regulatory formats.",
  },
  {
    title: "Dedicated Relationship Manager",
    desc: "Every recovery case is allocated a dedicated consultant. No automated queues—speak directly with your account specialist.",
  },
  {
    title: "Transparent Fee Structure",
    desc: "We provide upfront fee structures, written agreements, and clear terms before any documentation begins. No hidden charges.",
  },
  {
    title: "NRI Specialized Desk",
    desc: "A specialized team handles foreign address updates, overseas bank account filings, consulate attestations, and power of attorney drafting.",
  },
  {
    title: "Secure Document Handling",
    desc: "Your original share certificates and KYC credentials are archived under multi-layer security protocols. Complete data encryption.",
  },
  {
    title: "PAN India Service",
    desc: "With coordination networks across all major Registrar & Transfer Agents (RTAs) and company headquarters in India.",
  },
];

const caseStudies = [
  {
    company: "Reliance Industries Shares",
    category: "Physical Share Recovery",
    problem: "A client inherited 200 physical shares of Reliance Industries from their grandfather. The certificates were damaged, signatures mismatched, and dividends unclaimed for 12 years (transferred to IEPF).",
    solution: "KIRS filed Form ISR-2 for bank signature updates, obtained duplicate share certificates, processed succession paperwork, and submitted Form IEPF-5 with RTA representation.",
    outcome: "Recovered shares valued at ₹5.8 Lakhs and credited ₹84,000 in accrued dividends directly to the client's demat account.",
  },
  {
    company: "Tata Group Holdings",
    category: "Legal Heir Transmission",
    problem: "Following a shareholder's sudden demise, family members discovered physical shares of Tata Motors and Tata Chemicals with no nominee registered. The total value exceeded ₹15 Lakhs.",
    solution: "We drafted the legal heir representation, coordinated the filing for a Succession Certificate in the civil court, compiled RTA-compliant surety bonds, and guided them through final transmission.",
    outcome: "Successfully dematerialized and transferred shares worth ₹18.4 Lakhs to the legal heirs in 7 months.",
  },
  {
    company: "NRI Investor Recovery",
    category: "Embassy Coordination",
    problem: "An OCI holder residing in the UK possessed shares in ITC Ltd under their old Indian address. They faced rejections from the RTA due to KYC mismatches and non-resident status.",
    solution: "We drafted a custom Power of Attorney (POA), guided them through London consulate attestation, updated passport/address records with the RTA, and registered a new NRO bank account.",
    outcome: "Recovered shares and accumulated dividends worth ₹12.5 Lakhs without the client needing to fly to India.",
  },
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

export default function Home() {
  const [guideForm, setGuideForm] = useState({ name: "", email: "", phone: "" });
  const [guideSubmitted, setGuideSubmitted] = useState(false);

  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guideForm.name && guideForm.email) {
      setGuideSubmitted(true);
    }
  };

  return (
    <div className="font-sans">
      <OrganizationSchema />
      <LocalBusinessSchema />
      {/* 1. Hero Section */}
      <section className="bg-gradient-premium relative overflow-hidden py-20 lg:py-32 text-white select-none">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.08),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] opacity-[0.03] blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-secondary/30 rounded-full px-4 py-1.5 text-xs text-[#D4AF37] font-medium tracking-wide">
              <Award className="w-3.5 h-3.5" />
              <span>India's Leading Investor Wealth Restoration Experts</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              Recover Your Lost Shares, <br />
              <span className="text-gradient-gold font-serif">IEPF Claims</span> & Hidden Investments
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              India's trusted partner for physical share dematerialization, deceased inheritance transmission, signature updates, and complex documentation services.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/eligibility-checker"
                className="w-full sm:w-auto bg-secondary hover:bg-yellow-600 text-primary font-bold px-8 py-4 rounded shadow-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-all duration-200"
              >
                Check Claim Eligibility
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto border border-slate-700 hover:border-white text-white font-semibold px-8 py-4 rounded text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200"
              >
                Schedule Free Consultation
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-left max-w-lg sm:max-w-none mx-auto lg:mx-0">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">PAN India Service</span>
                <p className="text-xs text-slate-400">All major RTAs & cities</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Case Managers</span>
                <p className="text-xs text-slate-400">1-on-1 dedicated care</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Secure Archiving</span>
                <p className="text-xs text-slate-400">Data & records encrypted</p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Transparent Fees</span>
                <p className="text-xs text-slate-400">Fixed, upfront structures</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual: Dashboard Mockup */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-panel-dark p-6 rounded-lg relative shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 blur-xl rounded-full"></div>
              
              {/* Fake dashboard headers */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">Wealth Portfolio</span>
                  <h4 className="font-serif text-sm font-semibold text-white">Unclaimed Asset Retrieval</h4>
                </div>
                <div className="bg-success/20 text-success text-[10px] font-bold px-2 py-0.5 rounded border border-success/30">
                  Secured Audit
                </div>
              </div>

              {/* Fake metrics grid */}
              <div className="grid grid-cols-2 gap-4 py-6">
                <div className="bg-slate-900/80 p-3.5 rounded border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Unclaimed Value</span>
                  <div className="text-lg font-bold text-white font-serif mt-1">₹1.48 Crores</div>
                  <span className="text-[9px] text-[#D4AF37] font-semibold mt-1 block">RTA Folio Verified</span>
                </div>
                <div className="bg-slate-900/80 p-3.5 rounded border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">IEPF Claim Status</span>
                  <div className="text-lg font-bold text-white font-serif mt-1">Form IEPF-5</div>
                  <span className="text-[9px] text-success font-semibold mt-1 block">Audit Approved</span>
                </div>
              </div>

              {/* Asset recovery list mockup */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Recent Audited Portfolios</span>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-900/40 rounded border border-slate-800/50">
                  <span className="font-medium">Reliance Industries Ltd (250 Shares)</span>
                  <span className="text-secondary font-bold font-serif">₹7.25 L</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-900/40 rounded border border-slate-800/50">
                  <span className="font-medium">Tata Motors Ltd (Folio Transmission)</span>
                  <span className="text-secondary font-bold font-serif">₹12.40 L</span>
                </div>
                <div className="flex justify-between items-center text-xs p-2.5 bg-slate-900/40 rounded border border-slate-800/50">
                  <span className="font-medium">ITC Ltd (Signature Correction)</span>
                  <span className="text-secondary font-bold font-serif">₹3.80 L</span>
                </div>
              </div>

              {/* Compliance footer on visual card */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-[10px] text-slate-400 leading-normal bg-slate-950/40 -mx-6 -mb-6 p-4">
                <Scale className="w-4 h-4 text-secondary shrink-0" />
                <span>IEPF claims require MCA verification audits. KIRS operates as documentation advisors only.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Authority Bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-8 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold text-center text-slate-400 uppercase tracking-widest mb-6">
            Educational Ecosystem Map – Guided Recovery Expertise
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center items-center">
            {authorityLogos.map((logo) => (
              <div
                key={logo.name}
                className="bg-white p-3 rounded shadow-sm border border-slate-200/80 hover:border-secondary/50 transition-colors group cursor-help relative"
              >
                <span className="text-slate-800 font-serif font-semibold text-xs tracking-wider group-hover:text-primary">
                  {logo.name}
                </span>
                <p className="text-[9px] text-slate-400 mt-0.5">{logo.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-slate-400 text-center mt-4 italic">
            *Disclaimer: Educational representation of the Indian corporate registrar registry systems. KIRS has no official affiliation with MCA, SEBI, NSDL, CDSL or IEPF.
          </p>
        </div>
      </section>

      {/* 3. Services Directory Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold tracking-tight">
              Our Financial Recovery Specializations
            </h2>
            <div className="w-16 h-[2px] bg-secondary mx-auto mt-4 mb-4"></div>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We provide structured documentation checklists, procedural legal counseling, and RTA liaison representation across all recovery categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.slice(0, 6).map((service) => (
              <div
                key={service.slug}
                className="bg-slate-50 rounded p-6 shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-primary/5 border border-primary/10 rounded flex items-center justify-center">
                    <FileCheck className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-primary">{service.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{service.shortDesc}</p>
                </div>
                <div className="pt-6 border-t border-slate-200/60 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                    Est. Timeline: {service.timeline.split(" ")[0]} {service.timeline.split(" ")[1] || ""}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-primary hover:text-secondary font-semibold text-xs flex items-center gap-1 group transition-colors"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 bg-primary text-white hover:bg-slate-900 font-bold px-6 py-3 rounded text-xs uppercase tracking-wider shadow transition-colors"
            >
              Explore All 12 Recovery Services
              <ChevronRight className="w-4 h-4 text-secondary" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. The Recovery Process (Animated Timeline) */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Step-By-Step Security</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold mt-2">
              Our 7-Step Recovery Protocol
            </h2>
            <div className="w-16 h-[2px] bg-secondary mx-auto mt-4 mb-4"></div>
            <p className="text-slate-500 text-sm">
              How KIRS securely translates your paper folios and missing claims into active Demat assets.
            </p>
          </div>

          {/* Interactive process list */}
          <div className="relative border-l border-slate-200 ml-4 md:ml-0 md:grid md:grid-cols-7 md:border-l-0 md:border-t md:pt-10 md:gap-4 space-y-8 md:space-y-0">
            {steps.map((step, idx) => (
              <div key={step.title} className="relative pl-6 md:pl-0 text-left md:text-center space-y-2 select-none group">
                {/* Visual marker dot */}
                <div className="absolute -left-[9px] top-1 md:left-1/2 md:-translate-x-1/2 md:-top-[49px] w-4.5 h-4.5 rounded-full bg-white border-2 border-secondary flex items-center justify-center shadow z-10 group-hover:bg-secondary transition-colors">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                </div>

                <div className="text-xs font-bold text-secondary font-mono">STEP 0{idx + 1}</div>
                <h4 className="font-serif text-sm font-semibold text-primary">{step.title}</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed md:px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Founder & Expert Section (Personal Branding) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Founder visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-80 h-96 border-4 border-secondary rounded shadow-2xl overflow-hidden bg-primary">
                <Image
                  src="/founder.png"
                  alt="Mr. P.D. Samgir - Founder & Chief Consultant"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-slate-900/10 to-transparent z-10 flex flex-col justify-end p-6 text-white text-center">
                  <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">Founder & Chief Consultant</span>
                  <h3 className="font-serif text-xl font-bold mt-1">Mr. P.D. Samgir</h3>
                  <p className="text-[11px] text-slate-350 mt-1">Investment & Share Recovery Expert</p>
                </div>
              </div>
              {/* Back decoration */}
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-secondary/10 rounded-full -z-10 blur-xl"></div>
            </div>

            {/* Founder details */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary">The Face of Trust & Authority</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold leading-tight">
                Built on 25+ Years of Corporate & Investment Auditing
              </h2>
              <div className="w-16 h-[2px] bg-secondary"></div>
              
              <p className="text-slate-600 text-sm leading-relaxed">
                "Over the past two decades, trillions of rupees in shares and dividends have accumulated unclaimed in corporate registries and government funds due to spelling errors, misplaced paper certificates, and changing family generations. Our mission is to restore this forgotten wealth back to the families who earned it."
              </p>
              
              <p className="text-slate-500 text-xs leading-relaxed">
                As a senior investment specialist, Mr. Samgir has dedicated his career to tracking corporate registries, dematerializing old share folios, and structuring ironclad legal documentation. He acts as the guiding expert behind our team of document auditors, helping families navigate the complex maze of Registrars (RTAs), corporate offices, and regulatory authorities with ease.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-primary">Core Expertise Areas</span>
                  <p className="text-slate-400 text-xs">IEPF Claim Auditing, Succession Certifications, Duplicate Share Filings, NRI Estate Verification.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-primary">Mission Focus</span>
                  <p className="text-slate-400 text-xs">Helping clients reclaim their financial legacy through zero-error legal drafting and ethical processing.</p>
                </div>
              </div>

              {/* Expert quote signature */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <span className="text-xs font-semibold block text-slate-800">Verified Advisory Board</span>
                  <p className="text-[10px] text-slate-400">Kalavati Investment & Recovery Services (KIRS)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Success Metrics Section */}
      <section className="bg-primary text-white py-16 select-none relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(212,175,55,0.06),transparent_40%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-secondary">₹120+ Crores</div>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Unclaimed Assets Audited</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-secondary">10,000+</div>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Investors Assisted</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-secondary">98.4%</div>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Document Audit Accuracy</p>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-bold font-serif text-secondary">25+ Years</div>
              <p className="text-xs text-slate-400 uppercase tracking-widest">Consulting Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Case Studies Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Proven Outcomes</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold mt-2">
              Recent Wealth Recovery Case Studies
            </h2>
            <div className="w-16 h-[2px] bg-secondary mx-auto mt-4 mb-4"></div>
            <p className="text-slate-500 text-sm">
              Review our compiled summaries illustrating real problems, our custom drafting solutions, and actual client outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div
                key={study.company}
                className="bg-white rounded shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <span className="font-serif text-sm font-semibold text-primary">{study.company}</span>
                    <span className="bg-secondary/15 text-[#b38728] text-[9px] font-bold px-2 py-0.5 rounded border border-secondary/20 uppercase tracking-wide">
                      {study.category}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <p className="leading-relaxed">
                      <strong className="text-red-700 block font-medium uppercase text-[10px] tracking-wider mb-0.5">Problem:</strong>
                      {study.problem}
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-slate-800 block font-medium uppercase text-[10px] tracking-wider mb-0.5">Solution:</strong>
                      {study.solution}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-success">Result achieved:</span>
                  <span className="font-serif text-xs font-bold text-slate-800">{study.outcome}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 bg-amber-50 border border-amber-200/60 p-4 rounded max-w-2xl mx-auto">
            <p className="text-[10px] text-amber-800 leading-normal">
              *Note: Case values and details represent historical case files. Past achievements do not guarantee identical regulatory processing times or approvals. All claims are audited by RTAs.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Verified Reviews / Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Client Endorsements</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-bold mt-2">
              Investor Trust & Google Reviews
            </h2>
            <div className="w-16 h-[2px] bg-secondary mx-auto mt-4 mb-4"></div>
            <p className="text-slate-500 text-sm">
              Real reviews from families who successfully recovered their ancestral shareholdings through our support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-secondary text-lg">★</span>
                ))}
              </div>
              <p className="text-slate-600 text-xs italic leading-relaxed">
                "Our family had 500 physical shares of Tata Motors from 1996. After my father passed, we had no idea how to demat them without a Will. KIRS drafted all succession bonds and guided us through court certification. Absolute experts!"
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Amitesh Sen</span>
                <span className="text-[9px] bg-success/20 text-success font-bold px-2 py-0.5 rounded uppercase">Verified Heir</span>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-secondary text-lg">★</span>
                ))}
              </div>
              <p className="text-slate-600 text-xs italic leading-relaxed">
                "I was living in New Jersey and trying to claim my deceased uncle's Reliance dividends from IEPF. The RTA rejected my documents twice due to spelling mismatches. The NRI desk at KIRS managed everything with embassy notarizations. Outstanding."
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Dr. Rajesh Patel</span>
                <span className="text-[9px] bg-success/20 text-success font-bold px-2 py-0.5 rounded uppercase">Verified NRI Desk</span>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-secondary text-lg">★</span>
                ))}
              </div>
              <p className="text-slate-600 text-xs italic leading-relaxed">
                "Highly professional work. My physical share certificate had signature differences from my bank account. They resolved the signature mismatch via Form ISR-2 updates and helped me convert everything to Demat in 2 months."
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Kavitha Sharma</span>
                <span className="text-[9px] bg-success/20 text-success font-bold px-2 py-0.5 rounded uppercase">Verified Owner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Advanced Lead Generation Box (Guide Download Magnet) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-white rounded-lg shadow-2xl overflow-hidden border border-secondary/20 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/15 blur-xl rounded-full"></div>
            
            <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="inline-block bg-slate-800 text-secondary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded border border-secondary/20">
                  Free Investor Guide
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold leading-tight">
                  Ultimate Guide to Recovering Lost Shares & IEPF Claims
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Download our step-by-step documentation handbook. Learn how to update signature records, prepare legal heir affidavits, and submit IEPF-5 forms successfully.
                </p>
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                    <span>RTA-approved checklist formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                    <span>IEPF-5 MCA online filing guide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-secondary shrink-0" />
                    <span>Succession vs nomination checklist</span>
                  </li>
                </ul>
              </div>

              {/* Form panel */}
              <div className="md:col-span-5 bg-slate-900 p-6 rounded border border-slate-850 shadow-inner">
                {guideSubmitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-12 h-12 bg-success/15 border border-success/20 rounded-full flex items-center justify-center mx-auto">
                      <Download className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-white">Download Initiated!</h4>
                    <p className="text-slate-400 text-[10px] leading-relaxed">
                      We have sent your PDF guide download link to your email. Check your inbox.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleGuideSubmit} className="space-y-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-secondary">Enter details for PDF link</h4>
                    <div>
                      <label className="sr-only">Full Name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={guideForm.name}
                        onChange={(e) => setGuideForm({ ...guideForm, name: e.target.value })}
                        className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-secondary focus:outline-none text-white px-3 py-2.5 rounded"
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
                        className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-secondary focus:outline-none text-white px-3 py-2.5 rounded"
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
                        className="w-full text-xs bg-slate-950 border border-slate-800 focus:border-secondary focus:outline-none text-white px-3 py-2.5 rounded"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-secondary hover:bg-yellow-600 text-primary font-bold text-xs py-3 rounded uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Get PDF Handbook
                    </button>
                    <p className="text-[9px] text-slate-500 text-center leading-normal">
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
