"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  Layers
} from "lucide-react";

interface RoadmapStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  estTimeline: string;
  keyDocuments: string[];
  commonPitfalls: string[];
  consultantTip: string;
  category: "Audit" | "KYC & Verification" | "Legal Drafting" | "Government Audit" | "Asset Credit";
}

const ROADMAP_STEPS: RoadmapStep[] = [
  {
    stepNumber: 1,
    title: "Folio Identification & RTA Audit",
    shortDesc: "Cross-referencing corporate registry folios, old certificate numbers, and unclaimed dividend records.",
    estTimeline: "5 to 7 Business Days",
    category: "Audit",
    keyDocuments: [
      "Physical Share Certificates or old counterfoil dividend warrants",
      "PAN Card & Aadhaar of registered shareholder",
      "Company Name and Folio Number (if available)"
    ],
    commonPitfalls: [
      "Mismatch in address between old paper certificates and current Aadhaar card",
      "Spelling errors in initial shareholder name on corporate registers"
    ],
    consultantTip: "If folio numbers are lost, KIRS performs a master corporate search against RTA databases to trace hidden accounts."
  },
  {
    stepNumber: 2,
    title: "KYC & Bank Attestation (Form ISR-1 & ISR-2)",
    shortDesc: "Updating signature specimens, mobile numbers, email addresses, and active bank mandates with RTA.",
    estTimeline: "20 to 30 Business Days",
    category: "KYC & Verification",
    keyDocuments: [
      "Form ISR-1 (KYC & Demat registration request)",
      "Form ISR-2 (Bank manager signature verification on official bank letterhead)",
      "Original Cancelled Cheque with printed shareholder name",
      "Client Master List (CML) of active Demat account"
    ],
    commonPitfalls: [
      "Bank manager signing Form ISR-2 without seal or employee code",
      "Submitting cancelled cheques without printed name"
    ],
    consultantTip: "Never submit hand-written cheque leaves without pre-printed names. RTAs strictly reject them under modern SEBI circulars."
  },
  {
    stepNumber: 3,
    title: "Duplicate Share Certificate & FIR Filing (Form ISR-4)",
    shortDesc: "Issuance of replacement duplicate shares if original physical certificates are lost or damaged.",
    estTimeline: "30 to 45 Business Days",
    category: "Legal Drafting",
    keyDocuments: [
      "Form ISR-4 (Duplicate certificate request)",
      "Police Complaint (FIR) mentioning share certificate numbers and folio details",
      "Public Newspaper Notices published in English and Regional languages",
      "Notarized Affidavit and Indemnity Bond on non-judicial stamp paper"
    ],
    commonPitfalls: [
      "Newspaper advertisement lacking exact folio numbers or share quantities",
      "Executing stamp papers under incorrect state stamp duty values"
    ],
    consultantTip: "KIRS manages newspaper notice drafting and coordinates multi-language press insertions to ensure full RTA compliance."
  },
  {
    stepNumber: 4,
    title: "Transmission & Succession Verification",
    shortDesc: "Transferring shares of deceased family members to legal heirs with or without nominee.",
    estTimeline: "45 to 60 Business Days",
    category: "Legal Drafting",
    keyDocuments: [
      "Government Issued Original Death Certificate",
      "Legal Heirship Certificate or Family Tree Affidavit",
      "No Objection Certificates (NOC) from non-claiming legal heirs",
      "Court Probate of Will or Succession Certificate (if portfolio value > ₹5 Lakhs)"
    ],
    commonPitfalls: [
      "Discrepancies in death certificate date versus RTA folio registration",
      "Filing simple affidavits when succession petitions are mandatory"
    ],
    consultantTip: "Our legal wing coordinates civil court succession petitions when asset values exceed RTA self-declaration limits."
  },
  {
    stepNumber: 5,
    title: "MCA Form IEPF-5 Online Submission",
    shortDesc: "Filing digital claim applications on Ministry of Corporate Affairs portal for assets transferred to IEPF.",
    estTimeline: "10 to 15 Business Days",
    category: "Government Audit",
    keyDocuments: [
      "SRN generated Form IEPF-5 online filing copy",
      "System generated Advance Receipt signed by claimant",
      "Original Indemnity Bond executed on ₹500 non-judicial stamp paper"
    ],
    commonPitfalls: [
      "Mismatched SRN reference numbers between online MCA upload and physical RTA submission",
      "Incorrect MCA company identification number (CIN)"
    ],
    consultantTip: "Always file IEPF-5 with an experienced practitioner to avoid SRN rejection, which incurs government resubmission fees."
  },
  {
    stepNumber: 6,
    title: "RTA Physical Verification & Verification Report (VR)",
    shortDesc: "Submitting physical verification dossier to corporate registrar for verification report dispatch to IEPF Authority.",
    estTimeline: "60 to 90 Business Days",
    category: "Government Audit",
    keyDocuments: [
      "Complete physical dossier stamped and bound",
      "Proof of physical submission (Registered AD or Courier tracking)",
      "RTA Acknowledgement Receipt"
    ],
    commonPitfalls: [
      "Delayed physical submission beyond 30 days of online MCA filing",
      "Missing self-attestations on supporting KYC documents"
    ],
    consultantTip: "Physical dossiers must reach RTA offices within 30 days of online Form IEPF-5 upload; otherwise, MCA automatically cancels the claim."
  },
  {
    stepNumber: 7,
    title: "Dematerialization & Direct Demat Credit",
    shortDesc: "Final regulatory approval and credit of equity shares directly into claimant's Demat portfolio.",
    estTimeline: "15 to 30 Business Days",
    category: "Asset Credit",
    keyDocuments: [
      "IEPF Approval Sanction Order",
      "Depository Credit Confirmation (NSDL / CDSL CML)",
      "Direct Bank Credit Advice for accumulated cash dividends"
    ],
    commonPitfalls: [
      "Demat account status frozen or locked due to non-updated KYC"
    ],
    consultantTip: "Congratulations! Your shares are credited into your active NSDL/CDSL Demat account, and cash dividends are wired directly into your bank."
  }
];

export default function RecoveryRoadmapPage() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = ROADMAP_STEPS[activeStepIndex];

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-secondary/30 rounded-full px-4 py-1.5 text-xs text-[#D4AF37] font-medium">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Step-By-Step Recovery Protocol</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            Interactive Unclaimed Asset Recovery Roadmap
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Navigate through the complete 7-step security protocol from paper folio identification to electronic Demat credit.
          </p>
        </div>

        {/* Interactive Timeline Stepper Control */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {ROADMAP_STEPS.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              return (
                <button
                  key={step.stepNumber}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded border text-left transition-all relative overflow-hidden ${
                    isActive
                      ? "bg-slate-900 text-white border-secondary shadow-md ring-1 ring-secondary"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold uppercase ${isActive ? "text-secondary" : "text-slate-400"}`}>
                      STEP 0{step.stepNumber}
                    </span>
                    {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />}
                  </div>
                  <h4 className="font-serif text-xs font-bold mt-1 line-clamp-1">{step.title}</h4>
                  <span className={`text-[9px] block mt-1 ${isActive ? "text-slate-300" : "text-slate-400"}`}>
                    {step.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Dashboard Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm space-y-8">
          
          {/* Header info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-block bg-slate-900 text-secondary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded mb-2">
                Step 0{activeStep.stepNumber} Protocol • {activeStep.category}
              </div>
              <h2 className="font-serif text-2xl font-bold text-primary">{activeStep.title}</h2>
              <p className="text-slate-500 text-xs mt-1">{activeStep.shortDesc}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-secondary" />
              <span>Est. Timeline: {activeStep.estTimeline}</span>
            </div>
          </div>

          {/* 3 Detailed Columns: Required Documents, Common Pitfalls, Consultant Pro-Tip */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Required Documents */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg space-y-3">
              <h4 className="font-serif text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-secondary" />
                Required Compliance Documents
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {activeStep.keyDocuments.map((doc, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-secondary flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common RTA Rejection Causes */}
            <div className="bg-red-50/50 border border-red-200/80 p-5 rounded-lg space-y-3">
              <h4 className="font-serif text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Common Rejection Pitfalls
              </h4>
              <ul className="space-y-2 text-xs text-red-950">
                {activeStep.commonPitfalls.map((pit, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="text-red-500 font-bold">•</span>
                    <span className="leading-relaxed">{pit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Consultant Pro-tip */}
            <div className="bg-slate-900 text-white border border-secondary/30 p-5 rounded-lg space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-serif text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-secondary" />
                  KIRS Advisory Strategy
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  "{activeStep.consultantTip}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400">
                Zero-error legal drafting support by senior KIRS auditors.
              </div>
            </div>

          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeStepIndex === 0}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 font-semibold text-xs px-6 py-3 rounded transition-colors"
            >
              ← Previous Step
            </button>
            <div className="text-xs text-slate-500 font-medium">
              Step {activeStepIndex + 1} of {ROADMAP_STEPS.length}
            </div>
            <button
              onClick={() => setActiveStepIndex((prev) => Math.min(ROADMAP_STEPS.length - 1, prev + 1))}
              disabled={activeStepIndex === ROADMAP_STEPS.length - 1}
              className="w-full sm:w-auto bg-primary hover:bg-slate-900 disabled:opacity-40 disabled:pointer-events-none text-white font-bold text-xs px-6 py-3 rounded transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Next Protocol Step</span>
              <ChevronRight className="w-4 h-4 text-secondary" />
            </button>
          </div>

        </div>

        {/* Global CTA Box */}
        <div className="bg-primary text-white p-8 rounded-lg shadow-xl border border-secondary/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl font-bold">Have Unclaimed Shares or Pending IEPF Claims?</h3>
            <p className="text-slate-300 text-xs max-w-xl">
              Let our expert legal and RTA auditors manage the entire 7-step protocol for you.
            </p>
          </div>
          <div className="flex gap-4 shrink-0 w-full md:w-auto">
            <Link
              to="/eligibility-checker"
              className="w-full sm:w-auto text-center bg-secondary hover:bg-yellow-600 text-primary font-bold px-6 py-3 rounded text-xs uppercase tracking-wider transition-colors block"
            >
              Start Free Eligibility Check
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
