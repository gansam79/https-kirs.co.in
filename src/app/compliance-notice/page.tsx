import React from "react";
import { ShieldCheck, Info } from "lucide-react";

export default function ComplianceNoticePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="font-serif text-3xl font-bold text-primary">Compliance Notice</h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-xs">
            Official Regulatory Compliance & Status Notice
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-xs text-slate-650 leading-relaxed">
          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-slate-100">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span>1. Independent Service Provider Status</span>
          </div>
          <p>
            KIRS (Kalavati Investment & Recovery Services) operates strictly as an independent consultancy and documentation assistance service provider. We are not a government office, legal attorney firm, brokerage house, or financial depository.
          </p>
          <p>
            We do not hold partnerships, approvals, licenses, or official affiliations with the Securities and Exchange Board of India (SEBI), Reserve Bank of India (RBI), Ministry of Corporate Affairs (MCA), Investor Education and Protection Fund (IEPF) Authority, Insurance Regulatory and Development Authority of India (IRDAI), Pension Fund Regulatory and Development Authority (PFRDA), or any other government office or regulatory authority in India.
          </p>

          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-slate-100 pt-4">
            <Info className="w-5 h-5 text-secondary" />
            <span>2. Documentation & Advisory Support</span>
          </div>
          <p>
            All services offered by KIRS are centered around legal record research, verification audits, and assistance in compiling standard procedural folders (e.g. succession certificates, duplicate share certificate declarations, banker signature attestations, and IEPF-5 dossiers). 
          </p>
          <p>
            The service fees charged represent charges for physical compilation, document drafting, verification audits, and procedural advising. KIRS does not guarantee the approval or final resolution of claims, as approvals are strictly subject to review and verification by the respective corporate registries, RTAs, and regulatory authorities.
          </p>
        </div>

      </div>
    </div>
  );
}
