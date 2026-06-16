import React from "react";
import { Scale, ShieldAlert, AlertCircle } from "lucide-react";

export default function TermsOfUsePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="font-serif text-3xl font-bold text-primary">Terms of Use</h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-xs">
            Effective Date: June 2026. Legal Terms & Conditions.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-xs text-slate-650 leading-relaxed">
          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-slate-100">
            <Scale className="w-5 h-5 text-secondary" />
            <span>1. Consultancy & Advisory Scope</span>
          </div>
          <p>
            KIRS (Kalavati Investment & Recovery Services) operates as an independent documentation advisory and consultancy service. We assist retail investors, heirs, and NRIs in compiling complex folders (succession applications, banker signature specimen Form ISR-2, duplicate share requests Form ISR-4, and IEPF-5 dossiers). We are not legal attorneys representing courts, nor are we brokerages or financial depositories.
          </p>

          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-slate-100 pt-4">
            <ShieldAlert className="w-5 h-5 text-secondary" />
            <span>2. No Government Affiliations</span>
          </div>
          <p>
            You explicitly acknowledge that KIRS is a private corporate advisory entity. KIRS has no partnerships, approvals, or official affiliations with the IEPF Authority, Ministry of Corporate Affairs (MCA), Securities and Exchange Board of India (SEBI), or Reserve Bank of India (RBI).
          </p>

          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-slate-100 pt-4">
            <AlertCircle className="w-5 h-5 text-secondary" />
            <span>3. No Approval Guarantees</span>
          </div>
          <p>
            The recovery of unclaimed dividends and physical shares is subject to a rigorous verification audit by corporate RTAs and central government administrators. While KIRS ensures that your documentation complies with SEBI formats and RTA rules, we do not guarantee the final approval of any claim or the specific processing timelines, as all authority resides with the respective regulators.
          </p>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded text-[10px] text-amber-800 leading-normal">
            <strong>Legal Warning:</strong> Attempting to claim shares or dividends using fraudulent identity cards, forged share certificates, or false genealogical trees is a punishable offense under the Indian Penal Code. KIRS reserves the right to terminate consultancies immediately and report suspicious details if we suspect fraudulent submissions.
          </div>
        </div>

      </div>
    </div>
  );
}
