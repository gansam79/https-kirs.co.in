import React from "react";
import { ShieldAlert, Scale, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="font-serif text-3xl font-bold text-primary">Privacy Policy</h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-xs">
            Effective Date: June 2026. Compliant with DPDP Act (India) and GDPR guidelines.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-xs text-slate-650 leading-relaxed">
          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-slate-100">
            <Lock className="w-5 h-5 text-secondary" />
            <span>1. Commitment to Data Security</span>
          </div>
          <p>
            At KIRS (Kalavati Investment & Recovery Services), we specialize in documenting and facilitating the recovery of unclaimed investments, shares, and dividends. Because we review sensitive identity documents (including PAN cards, Aadhaar cards, share certificates, death records, and bank details), protecting your privacy is our highest priority. 
          </p>

          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-slate-100 pt-4">
            <ShieldAlert className="w-5 h-5 text-secondary" />
            <span>2. Data We Collect & Audit</span>
          </div>
          <p>
            We collect information that you submit to us via our Eligibility Checker, Document Checklist, and Consultation Schedulers. This includes:
            <br />
            • **Identity Data:** Name, date of birth, spelling details, PAN, and Aadhaar identifiers.
            <br />
            • **Contact Data:** Email addresses, mobile numbers, and residency status (NRI/Resident).
            <br />
            • **Financial Holdings:** Names of target companies, physical folio details, share certificate serial numbers, and accrued dividend estimates.
          </p>

          <div className="flex items-center gap-2 text-primary font-bold text-sm pb-2 border-b border-slate-100 pt-4">
            <Scale className="w-5 h-5 text-secondary" />
            <span>3. How We Process Your Records</span>
          </div>
          <p>
            Your records are processed strictly for the purpose of analyzing recovery eligibility, drafting legal bonds, preparing RTA correspondence, and submitting IEPF-5 forms. We do not sell, rent, or distribute your personal details to third-party advertising companies. All physical document archives are retained in secure, restricted vaults.
          </p>

          <div className="bg-slate-100 border border-slate-200 p-4 rounded text-[10px] text-slate-500 leading-normal flex gap-2.5 items-start">
            <Lock className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
            <span>
              <strong>Compliance Disclaimer:</strong> Under India's Digital Personal Data Protection (DPDP) Act, by sharing your contact information and target corporate folios, you provide explicit consent to KIRS processing your records for auditing share recoverability. You may revoke consent at any time by contacting our privacy desk at info@kirs.co.in.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
