"use client";

import React, { useState } from "react";
import { Scale, BookOpen, AlertCircle, FileText, Landmark, UserCheck, ShieldAlert, BadgeDollarSign } from "lucide-react";

const awarenessTopics = [
  {
    id: "iepf",
    title: "Understanding the IEPF",
    icon: Landmark,
    subtitle: "What is the Investor Education & Protection Fund?",
    content: `Under Section 125 of the Companies Act, 2013, the Government of India established the Investor Education and Protection Fund (IEPF) Authority. 
    
    If dividends declared by a company remain unclaimed or unpaid for seven consecutive years, the company is legally required to transfer those dividends, along with the corresponding shares, to the IEPF. 
    
    **Important Facts:**
    • The money is held in trust by the government under the Ministry of Corporate Affairs (MCA).
    • Shareholders can claim their shares and dividends back from the IEPF at any time; there is no 'expiry date' for claims.
    • The process requires filing an online MCA Form IEPF-5 and submitting physical verification reports to the company's RTA.`
  },
  {
    id: "unclaimed",
    title: "Unclaimed Shares & Dividends",
    icon: BadgeDollarSign,
    subtitle: "How do investments become unclaimed?",
    content: `Trillions of rupees are currently lying unclaimed with various RTAs and the IEPF. The most common reasons include:
    
    • **Address Changes:** The shareholder moved to a new home but forgot to notify the company, causing dividends and notices to return undelivered.
    • **Death of Shareholder:** Heirs are unaware of the physical share certificates locked away in ancestral lockers.
    • **Signature Mismatches:** With age, the shareholder's signature changed, leading the RTA to reject demat or transfer actions.
    • **Defunct Bankers:** Dividends sent via warrants expired because bank details were not updated.`
  },
  {
    id: "sebi",
    title: "SEBI Protection Framework",
    icon: Scale,
    subtitle: "How SEBI shields retail investors",
    content: `The Securities and Exchange Board of India (SEBI) has designed a strict protection framework to secure investor wealth:
    
    • **Mandatory Demat (KYC):** Physical share transfers between individuals were banned by SEBI in 2018 to eliminate signature fraud and duplicates. All shares must be held electronically.
    • **Standardized KYC Forms:** SEBI introduced Form ISR-1 (KYC updates), Form ISR-2 (Signature Specimen confirmation), and Form ISR-3 (Opt-Out of Nomination) to streamline updates across all RTAs.
    • **Nomination Audits:** SEBI mandates registering a nominee for all folios to prevent long legal gridlocks upon death.`
  },
  {
    id: "rtas",
    title: "Role of RTAs",
    icon: FileText,
    subtitle: "Who are Registrar & Transfer Agents?",
    content: `Registrar and Transfer Agents (RTAs) are SEBI-licensed intermediaries appointed by companies to maintain shareholder records. Examples include **KFin Technologies, Link Intime, Alankit, and Bigshare**.
    
    **Their responsibilities include:**
    • Updating shareholder names, signatures, PAN, bank accounts, and addresses.
    • Validating duplicate share certificates and processing transmission files.
    • Auditing initial verification files for IEPF claims.
    
    *KIRS interacts directly with RTAs to address objections, verify folios, and submit clean document packages.*`
  },
  {
    id: "transmission",
    title: "Transmission vs Nomination",
    icon: UserCheck,
    subtitle: "Clearing inheritance terminology",
    content: `Many heirs confuse 'nomination' with complete ownership. Legally, they represent different rights:
    
    • **Nomination:** A nominee is merely a legal trustee/custodian appointed to receive the shares upon the holder's death. The nominee does not automatically become the absolute owner of the shares unless they are also the sole legal heir.
    • **Transmission:** The process of officially transferring shares to legal heirs. If no nominee exists or if there is a conflict, heirs must produce a court-approved Succession Certificate, Probated Will, or Letters of Administration depending on the asset value.`
  },
  {
    id: "nri",
    title: "NRI Investor Rights",
    icon: BookOpen,
    subtitle: "Rules for Non-Resident Indian (NRI) claims",
    content: `Non-Resident Indians (NRIs) and Overseas Citizens of India (OCI) hold substantial ancestral investments in India.
    
    **Core NRI recovery parameters:**
    • **NRO Accounts:** Reclaimed dividends can only be credited to a Non-Resident Ordinary (NRO) bank account. They cannot be sent to foreign bank accounts directly.
    • **Consulate Attestations:** All KYC forms, passports, address proofs, and Power of Attorney (POA) declarations must be notarized and apostilled by the Indian Embassy/Consulate in the country of residence.
    • **FEMA Guidelines:** Share conversions and distributions must comply with Foreign Exchange Management Act (FEMA) guidelines.`
  }
];

export default function RegulatoryAwarenessPage() {
  const [activeTab, setActiveTab] = useState("iepf");

  const activeTopic = awarenessTopics.find((t) => t.id === activeTab) || awarenessTopics[0];
  const TopicIcon = activeTopic.icon;

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Investor Education Desk</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
            Regulatory & Investor Awareness Hub
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Unclaimed investments can feel like a maze. We compile and simplify critical SEBI frameworks, IEPF guidelines, and RTA requirements to keep you informed.
          </p>
        </div>

        {/* Tab Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Tabs (Col span 4) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 block mb-3">
              Awareness Categories
            </span>
            {awarenessTopics.map((topic) => {
              const Icon = topic.icon;
              const isActive = topic.id === activeTab;
              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-semibold text-left transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-650 hover:bg-slate-100 hover:text-primary"
                  }`}
                >
                  <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-secondary" : "text-slate-400"}`} />
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>

          {/* Right Content Area (Col span 8) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm space-y-6 min-h-[400px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded flex items-center justify-center shrink-0">
                  <TopicIcon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Education Segment</span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">{activeTopic.title}</h2>
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-slate-100"></div>
              
              <h3 className="text-sm font-semibold text-slate-800">{activeTopic.subtitle}</h3>
              
              <div className="text-xs text-slate-600 leading-relaxed space-y-4 whitespace-pre-line font-light">
                {activeTopic.content}
              </div>
            </div>

            {/* Bottom Disclaimer segment within layout */}
            <div className="pt-6 border-t border-slate-150 mt-10 flex gap-2.5 items-start bg-slate-50 p-4 rounded text-[10px] text-slate-500 leading-normal border border-slate-200">
              <ShieldAlert className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Compliance Note:</strong> This information is compiled for educational purposes to increase investor awareness under Section 125 of the Companies Act 2013 and SEBI regulations. KIRS is a private consultancies firm providing document preparation support; we are not a government portal.
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
