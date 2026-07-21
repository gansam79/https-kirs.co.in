"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle, FileText, Building2, HelpCircle, Loader2 } from "lucide-react";
import { getBasePath } from "@/lib/basePath";

interface CheckerState {
  assetType: string;
  holdingType: string;
  issueType: string;
  claimantType: string;
  approxValue: string;
  companyName: string;
  name: string;
  email: string;
  phone: string;
}

const stepsText = [
  "Asset Category",
  "Holding Format",
  "Primary Block",
  "Claimant Profile",
  "Contact Info",
];

export default function EligibilityCheckerPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<CheckerState>({
    assetType: "",
    holdingType: "",
    issueType: "",
    claimantType: "",
    approxValue: "",
    companyName: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSelect = (field: keyof CheckerState, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = () => {
    // Basic validations
    if (currentStep === 0 && !formData.assetType) return;
    if (currentStep === 1 && !formData.holdingType) return;
    if (currentStep === 2 && !formData.issueType) return;
    if (currentStep === 3 && (!formData.claimantType || !formData.companyName)) return;

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.email) {
      setLoading(true);
      setErrorMsg("");
      try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}/api/contact`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "eligibility",
            ...formData
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to submit eligibility check.");
        }

        setIsSubmitted(true);
      } catch (error: any) {
        console.error("Error submitting eligibility checker", error);
        setErrorMsg(error.message || "Failed to submit. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      assetType: "",
      holdingType: "",
      issueType: "",
      claimantType: "",
      approxValue: "",
      companyName: "",
      name: "",
      email: "",
      phone: "",
    });
    setCurrentStep(0);
    setIsSubmitted(false);
    setErrorMsg("");
  };

  // Diagnostic logic
  const getDiagnosticReport = () => {
    let score = "HIGH RECOVERABILITY";
    let scoreColor = "text-success border-success bg-emerald-50";
    let recommendations: string[] = [];
    
    if (formData.issueType === "iepf" || formData.issueType === "lost") {
      score = "MODERATE (Requires RTA Verification)";
      scoreColor = "text-[#b38728] border-secondary bg-amber-50/50";
    }
    
    if (formData.claimantType === "heir_no_nominee" || formData.claimantType === "nri") {
      score = "COMPLEX (Requires Custom Legal Drafting)";
      scoreColor = "text-slate-800 border-slate-400 bg-slate-100";
    }

    // Dynamic actions list
    if (formData.holdingType === "physical") {
      recommendations.push("Compile specimen signature updates via Form ISR-2.");
      recommendations.push("Prepare Dematerialization Request Form (DRF) for physical certificates.");
    }
    if (formData.issueType === "iepf") {
      recommendations.push("Retrieve official Folio ledger details from corporate registries.");
      recommendations.push("Submit online Form IEPF-5 on the MCA portal.");
      recommendations.push("Draft a ₹500 Indemnity Bond and physical Advance Receipts for RTA delivery.");
    }
    if (formData.issueType === "lost") {
      recommendations.push("Register a Police Complaint (FIR) specifying lost share certificate and folio numbers.");
      recommendations.push("Coordinate regional and national newspaper advertisements regarding missing shares.");
      recommendations.push("Draft Form ISR-4 affidavits for the issuance of duplicate certificates.");
    }
    if (formData.claimantType === "heir_no_nominee" || formData.claimantType === "heir_nominee") {
      recommendations.push("Draft legal heir declaration and NOC representations for other heirs.");
      recommendations.push("If asset value exceeds ₹5 Lakhs, initiate civil court Succession Certificate petitions.");
    }
    if (formData.claimantType === "nri") {
      recommendations.push("Draft a custom Power of Attorney (POA) for representation in India.");
      recommendations.push("Process overseas address records and verify details with Indian consulate apostilles.");
    }
    
    // Default fallback
    if (recommendations.length === 0) {
      recommendations.push("File Form ISR-1 to update basic KYC (PAN, Bank details, Nomination Specimen) with RTA.");
      recommendations.push("Demat outstanding equity certificates.");
    }

    return { score, scoreColor, recommendations };
  };

  const report = getDiagnosticReport();

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Diagnostic Wizard</span>
          <h1 className="font-serif text-3xl font-bold text-primary">Unclaimed Wealth Eligibility Checker</h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-xs">
            Evaluate your claim recovery difficulty and generate recommended action schedules in under 2 minutes.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sm:p-10">
          {!isSubmitted ? (
            <div className="space-y-8">
              {/* Step indicator */}
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 pb-4">
                <span>Step {currentStep + 1} of 5</span>
                <span className="text-secondary">{stepsText[currentStep]}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-secondary h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / 5) * 100}%` }}
                ></div>
              </div>

              {/* Step 0: Asset Type */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary">What type of unclaimed asset are you trying to recover?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "equity", name: "Company Shares / Stocks", desc: "Physical certificates or demat folios" },
                      { key: "dividends", name: "Corporate Dividends", desc: "Unpaid cash dividends or interest payouts" },
                      { key: "mutual_funds", name: "Mutual Fund Folios", desc: "Old accumulated units or redemptions" },
                      { key: "debentures", name: "Bonds / Debentures", desc: "Misplaced physical corporate bonds" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelect("assetType", opt.key)}
                        className={`text-left p-4 rounded border transition-all ${
                          formData.assetType === opt.key
                            ? "border-secondary bg-slate-50 ring-1 ring-secondary"
                            : "border-slate-200 hover:border-slate-350 bg-white"
                        }`}
                      >
                        <span className="text-xs font-semibold block text-slate-800">{opt.name}</span>
                        <span className="text-[10px] text-slate-400 mt-1 block">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 1: Holding Type */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary">In what format are these investments currently held?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "physical", name: "Physical Certificates", desc: "Paper share certificates in hand" },
                      { key: "demat", name: "Electronic format (Demat)", desc: "Held in depository but frozen/kyc pending" },
                      { key: "lost", name: "Lost/Misplaced Certificates", desc: "We only have statements, letters, or folio nos." },
                      { key: "mix", name: "Combination / Unsure", desc: "Mixed portfolios or missing certificates" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelect("holdingType", opt.key)}
                        className={`text-left p-4 rounded border transition-all ${
                          formData.holdingType === opt.key
                            ? "border-secondary bg-slate-50 ring-1 ring-secondary"
                            : "border-slate-200 hover:border-slate-350 bg-white"
                        }`}
                      >
                        <span className="text-xs font-semibold block text-slate-800">{opt.name}</span>
                        <span className="text-[10px] text-slate-400 mt-1 block">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Primary Issue */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-primary">What is the primary roadblock or issue preventing claim?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "iepf", name: "Transferred to IEPF", desc: "Dividends unclaimed for 7+ consecutive years" },
                      { key: "lost", name: "Lost physical papers", desc: "Duplicate share certificate needed first" },
                      { key: "kyc", name: "Name spelling / Address update", desc: "KYC mismatches compared to modern PAN" },
                      { key: "signature", name: "Signature Mismatch", desc: "Specimen signature does not match bank records" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelect("issueType", opt.key)}
                        className={`text-left p-4 rounded border transition-all ${
                          formData.issueType === opt.key
                            ? "border-secondary bg-slate-50 ring-1 ring-secondary"
                            : "border-slate-200 hover:border-slate-350 bg-white"
                        }`}
                      >
                        <span className="text-xs font-semibold block text-slate-800">{opt.name}</span>
                        <span className="text-[10px] text-slate-400 mt-1 block">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Claimant Type & Company Details */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-primary">Who is filing the recovery claim?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: "original", name: "Original Registered Shareholder", desc: "Claiming under my own name" },
                        { key: "heir_nominee", name: "Nominee registered in records", desc: "Original holder is deceased" },
                        { key: "heir_no_nominee", name: "Legal Heir (No Nomination)", desc: "Requires succession paperwork" },
                        { key: "nri", name: "Non-Resident Indian (NRI)", desc: "Requires consulate/embassy filings" },
                      ].map((opt) => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleSelect("claimantType", opt.key)}
                          className={`text-left p-3.5 rounded border transition-all ${
                            formData.claimantType === opt.key
                              ? "border-secondary bg-slate-50 ring-1 ring-secondary"
                              : "border-slate-200 hover:border-slate-350 bg-white"
                          }`}
                        >
                          <span className="text-xs font-semibold block text-slate-800">{opt.name}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5 block">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Company Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Reliance, Tata Motors"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Approx Asset Value</label>
                      <select
                        value={formData.approxValue}
                        onChange={(e) => setFormData({ ...formData, approxValue: e.target.value })}
                        className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
                      >
                        <option value="">Select Value Bracket</option>
                        <option value="under_1l">Under ₹1 Lakh</option>
                        <option value="1_to_5l">₹1 Lakh to ₹5 Lakhs</option>
                        <option value="5_to_20l">₹5 Lakhs to ₹20 Lakhs</option>
                        <option value="over_20l">Above ₹20 Lakhs</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Lead Form */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-sm font-semibold text-primary">Enter your contact info to generate diagnostic report</h3>
                  
                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs">
                      {errorMsg}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-850"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-850"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Mobile Number (WhatsApp Preferred)</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-850"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary hover:bg-yellow-600 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-primary font-bold text-xs py-3 rounded uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {loading ? (
                      "Generating Report..."
                    ) : (
                      <>
                        Generate Diagnostic Report
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Navigation buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="inline-flex items-center gap-1 text-slate-450 hover:text-primary text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary hover:bg-slate-900 text-white text-xs font-semibold px-6 py-2.5 rounded transition-all"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* DIAGNOSTIC REPORT STATE */
            <div className="space-y-8">
              {/* Headline */}
              <div className="text-center py-4 space-y-2">
                <div className="w-12 h-12 bg-success/15 border border-success/20 rounded-full flex items-center justify-center mx-auto">
                  <ClipboardList className="w-6 h-6 text-[#10B981]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-primary">Diagnostic Analysis Compiled</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Case ID: KIRS-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>

              {/* Status Score */}
              <div className={`p-5 border rounded-lg text-center ${report.scoreColor} border-dashed`}>
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Recoverability Score</span>
                <span className="font-serif text-base sm:text-lg font-bold block">{report.score}</span>
              </div>

              {/* Recommendation Actions */}
              <div className="space-y-4">
                <h4 className="font-serif text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">
                  Recommended Recovery Schedule
                </h4>
                <div className="space-y-3">
                  {report.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-xs">
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-secondary border border-secondary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700 font-medium leading-relaxed">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expert Help Hook */}
              <div className="bg-slate-900 text-white p-5 rounded-lg border border-secondary/20 space-y-3">
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <ShieldCheck className="w-5 h-5 text-secondary" />
                  <span className="text-xs font-semibold">Priority Verification Review</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. A KIRS relationships manager has received your evaluation query details for <strong>{formData.companyName || "unnamed portfolios"}</strong>. We will review the complexity variables and call you at <strong>{formData.phone}</strong> inside 24 hours.
                </p>
              </div>

              {/* Control Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-6 border-t border-slate-100">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto text-slate-400 hover:text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Evaluation
                </button>
                <div className="flex gap-3 w-full sm:w-auto">
                  <a
                    href="https://wa.me/919823662901"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center bg-success hover:bg-emerald-600 text-white font-bold text-xs px-5 py-3 rounded uppercase tracking-wider block transition-colors w-full sm:w-auto"
                  >
                    WhatsApp Report
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
