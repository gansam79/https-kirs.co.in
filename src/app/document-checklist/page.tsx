"use client";

import React, { useState } from "react";
import { Download, CheckSquare, Square, Info, ShieldCheck, Mail, ArrowRight, Printer } from "lucide-react";
import { servicesData, Service } from "@/data/servicesData";

export default function DocumentChecklistPage() {
  const [selectedSlug, setSelectedSlug] = useState<string>("iepf-claim-recovery");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  // Newsletter / download capture state
  const [emailForm, setEmailForm] = useState({ name: "", email: "", phone: "" });
  const [downloaded, setDownloaded] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [draftErrorMsg, setDraftErrorMsg] = useState("");

  const activeService = servicesData.find((s) => s.slug === selectedSlug) || servicesData[0];

  const handleToggleItem = (item: string) => {
    setCompletedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailForm.name && emailForm.email) {
      setDraftLoading(true);
      setDraftErrorMsg("");
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const response = await fetch(`${basePath}/api/contact/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: "draft",
            name: emailForm.name,
            email: emailForm.email,
            service: activeService.title
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to submit request.");
        }

        setDownloaded(true);
        setEmailForm({ name: "", email: "", phone: "" });
        setTimeout(() => setDownloaded(false), 5000);
      } catch (error: any) {
        console.error("Error submitting template request", error);
        setDraftErrorMsg(error.message || "Failed to submit. Please try again.");
      } finally {
        setDraftLoading(false);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans print:bg-white print:py-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Title Block */}
        <div className="text-center space-y-3 mb-8 print:hidden">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Documentation Hub</span>
          <h1 className="font-serif text-3xl font-bold text-primary">RTA Document Checklist Generator</h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-xs">
            Select your wealth recovery service to compile a compliance document checklist.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Navigation: Service Selector (print hidden) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-2 print:hidden">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block mb-3">
              Select Services
            </span>
            {servicesData.map((s) => (
              <button
                key={s.slug}
                onClick={() => {
                  setSelectedSlug(s.slug);
                  setCompletedItems({});
                }}
                className={`w-full text-left px-3 py-2.5 rounded text-xs font-semibold transition-colors flex items-center justify-between ${selectedSlug === s.slug
                    ? "bg-slate-900 text-white"
                    : "text-slate-650 hover:bg-slate-100 hover:text-primary"
                  }`}
              >
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          {/* Right Area: Interactive Checklist (print focus area) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6 print:border-0 print:shadow-none">

            {/* Header of Checklist */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider print:hidden">Compliance Dossier Checklist</span>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-primary">{activeService.title} Checklist</h2>
                <span className="text-[10px] text-slate-400 block mt-0.5">Timeline: {activeService.timeline}</span>
              </div>
              <div className="flex gap-2 print:hidden">
                <button
                  onClick={handlePrint}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] px-3.5 py-2 rounded flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
                >
                  <Printer className="w-3.5 h-3.5 text-secondary" />
                  Print Checklist
                </button>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-3">
              {activeService.documents.map((doc, idx) => {
                const isChecked = completedItems[doc] || false;
                return (
                  <div
                    key={idx}
                    onClick={() => handleToggleItem(doc)}
                    className={`p-3.5 rounded border flex gap-3 items-start cursor-pointer transition-all ${isChecked
                        ? "border-emerald-250 bg-emerald-50/20"
                        : "border-slate-200 hover:border-slate-350 bg-slate-50/50"
                      }`}
                  >
                    <button
                      type="button"
                      className="shrink-0 mt-0.5"
                      aria-label={isChecked ? "Mark Incomplete" : "Mark Complete"}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4.5 h-4.5 text-success" />
                      ) : (
                        <Square className="w-4.5 h-4.5 text-slate-350" />
                      )}
                    </button>
                    <div>
                      <span className={`text-xs font-semibold block ${isChecked ? "text-slate-500 line-through" : "text-slate-800"}`}>
                        {doc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Regulatory guideline notes */}
            <div className="bg-blue-50 border border-blue-150 p-4 rounded flex gap-3 items-start text-[11px] text-blue-800 leading-normal">
              <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong>RTA Compliance Guidelines:</strong>
                <p>
                  1. All affidavits and indemnity bonds must be executed on non-judicial stamp papers of appropriate value (typically ₹100 to ₹500 depending on state rules) and notarized.
                  <br />
                  2. Self-attested PAN and Aadhaar copies are mandatory. In some cases, RTAs require banker attestations on signatures (Form ISR-2) or address proofs.
                </p>
              </div>
            </div>

            {/* Custom Draft Requests Forms (print hidden) */}
            <div className="bg-slate-900 text-white rounded p-6 shadow-inner print:hidden space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <span className="text-xs font-semibold">Request Custom Draft Templates</span>
              </div>
              <p className="text-[11px] text-slate-350 leading-relaxed">
                Need customized, pre-drafted Indemnity Bonds, Affidavits, Form ISR-1, or Succession petitions? Share your email to receive standard Microsoft Word formats.
              </p>

              {downloaded ? (
                <p className="text-secondary text-xs font-semibold py-2 animate-pulse">
                  ✓ Pre-draft formats shared! Check your email.
                </p>
              ) : (
                <div className="space-y-3">
                  {draftErrorMsg && (
                    <div className="p-2.5 bg-red-950 border border-red-800 text-red-200 rounded text-[10px]">
                      {draftErrorMsg}
                    </div>
                  )}
                  <form onSubmit={handleEmailSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        disabled={draftLoading}
                        value={emailForm.name}
                        onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 focus:outline-none focus:border-secondary text-white rounded disabled:opacity-50"
                      />
                    </div>
                    <div className="sm:col-span-5">
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        disabled={draftLoading}
                        value={emailForm.email}
                        onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 focus:outline-none focus:border-secondary text-white rounded disabled:opacity-50"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <button
                        type="submit"
                        disabled={draftLoading}
                        className="w-full bg-secondary hover:bg-yellow-600 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-primary font-bold text-xs py-2.5 rounded uppercase tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        {draftLoading ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <span>Get Drafts</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
