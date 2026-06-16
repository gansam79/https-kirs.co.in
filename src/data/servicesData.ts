export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  timeline: string;
  eligibility: string[];
  documents: string[];
  faqs: { question: string; answer: string }[];
}

export const servicesData: Service[] = [
  {
    slug: "iepf-claim-recovery",
    title: "IEPF Claim Recovery",
    shortDesc: "Recover shares and unpaid dividends transferred to the Investor Education & Protection Fund (IEPF).",
    longDesc: "When dividends remain unclaimed for 7 consecutive years, companies are legally mandated to transfer both the dividends and the underlying shares to the IEPF Authority. We specialize in navigating the MCA portal, drafting indemnity bonds, and coordinating with RTAs to claim back your assets.",
    timeline: "6 - 9 Months (Regulatory timeline)",
    eligibility: [
      "Original shareholder who missed claiming dividends for 7 years or more.",
      "Legal heir or successor of the deceased shareholder whose shares were moved to IEPF.",
      "Joint holder claiming share entitlement."
    ],
    documents: [
      "Form IEPF-5 Submission Copy",
      "Indemnity Bond (on non-judicial stamp paper of appropriate value)",
      "Advance Receipt (duly signed with revenue stamp)",
      "Original physical share certificate (if held) or RTA entitlement letter",
      "Copy of Aadhaar Card and PAN Card (duly self-attested)",
      "Client Master List (CML) of Demat Account",
      "Cancelled Cheque Leaf & Bank Attestation (Form ISR-2)"
    ],
    faqs: [
      {
        question: "Why did my shares go to IEPF?",
        answer: "Under Section 124(6) of the Companies Act 2013, if dividends on shares are not claimed or paid for 7 consecutive years, the company must transfer those shares along with the dividends to the IEPF."
      },
      {
        question: "Can I file the IEPF claim online?",
        answer: "Yes, the initial application is filed online through Form IEPF-5 on the MCA portal. However, physical verification documents must be sent to the company's RTA for validation."
      },
      {
        question: "Does KIRS guarantee the recovery?",
        answer: "KIRS provides documentation assistance and procedural support. The final approval lies with the IEPF Authority. We ensure your documents are error-free to prevent rejection."
      }
    ]
  },
  {
    slug: "lost-share-recovery",
    title: "Lost Share Recovery",
    shortDesc: "Retrieve values from misplaced, damaged, or lost physical share certificates.",
    longDesc: "If you have lost your physical share certificates, you cannot dematerialize them or sell them. The recovery process requires obtaining duplicate share certificates from the company. We handle the drafting of affidavits, coordinating newspaper advertisements, and submitting required indemnities.",
    timeline: "4 - 6 Months",
    eligibility: [
      "Registered shareholder who misplaced their original physical certificate.",
      "Legal heir seeking duplicate certificates for a deceased shareholder's holdings."
    ],
    documents: [
      "Request letter signed by all holders to the RTA",
      "Notarized Affidavit (Form ISR-4) for issue of duplicate certificates",
      "Notarized Indemnity Bond on stamp paper",
      "FIR (Police Complaint) details stating share certificate numbers and folio details",
      "Newspaper Advertisement (cut-out) published in English & regional language",
      "Client Master List (CML) and KYC docs"
    ],
    faqs: [
      {
        question: "Is an FIR mandatory for duplicate shares?",
        answer: "Yes, companies and RTAs require a police report (FIR) or general diary entry to verify that the share certificates are genuinely missing and not pledged or sold."
      },
      {
        question: "How much does the newspaper advertisement cost?",
        answer: "The advertisement cost varies depending on the circulation of the newspaper. KIRS coordinates with local agencies to get the best pricing for the required regional and English publications."
      }
    ]
  },
  {
    slug: "transmission-of-shares",
    title: "Transmission of Shares",
    shortDesc: "Transfer ownership of shares from a deceased shareholder to legal heirs or nominees.",
    longDesc: "Share transmission is the legal process of shifting share title upon the death of the primary shareholder. Unlike share transfer, transmission does not require stamp duty but demands substantial legal documentation to satisfy RTAs.",
    timeline: "3 - 6 Months",
    eligibility: [
      "Nominee registered in the company records.",
      "Legal heirs or successors (in the absence of a nominee) with legal representation."
    ],
    documents: [
      "Transmission Request Form (Form ISR-5)",
      "Original or notarized Death Certificate of the deceased holder",
      "Self-attested PAN and Aadhaar of the claimant(s)",
      "Succession Certificate / Letter of Administration / Probated Will (if value > ₹5 Lakhs and no nominee)",
      "No Objection Certificate (NOC) from other legal heirs (if applicable)",
      "Client Master List (CML) of the claimant's demat account"
    ],
    faqs: [
      {
        question: "What is the difference between Transfer and Transmission?",
        answer: "Transfer is a voluntary act by a living shareholder. Transmission happens by operation of law upon the death of a shareholder. No stamp duty is payable on transmission."
      },
      {
        question: "What if there is no Will or Nominee?",
        answer: "If the value of shares exceeds ₹5 Lakhs, RTAs usually mandate a Succession Certificate or Letter of Administration from a competent court. For values below ₹5 Lakhs, simplified documentation like legal heir certificates and surety forms may suffice."
      }
    ]
  },
  {
    slug: "duplicate-share-certificates",
    title: "Duplicate Share Certificates",
    shortDesc: "Acquire secondary certificates for torn, mutilated, or lost share documents.",
    longDesc: "Mutilated or old worn-out share certificates need replacement before they can be converted to demat. We guide you through the process of requesting duplicate certificates by generating standard indemnity papers and managing RTA interactions.",
    timeline: "3 - 5 Months",
    eligibility: [
      "Shareholders holding torn, faded, or damaged certificates where text is illegible.",
      "Shareholders whose certificates were lost in transit."
    ],
    documents: [
      "Original mutilated/soiled certificate (if available)",
      "Indemnity Bond for duplicate shares",
      "Affidavit detailing how the damage/loss occurred",
      "KYC (PAN & Aadhaar) of the shareholder",
      "Bank attested signatures (Form ISR-2)"
    ],
    faqs: [
      {
        question: "Can I dematerialize a torn certificate directly?",
        answer: "No, depository participants (DP) will reject damaged certificates. You must obtain a fresh duplicate certificate from the company's RTA first."
      }
    ]
  },
  {
    slug: "name-correction",
    title: "Name Correction",
    shortDesc: "Correct spelling errors, maiden name changes, or middle name mismatches.",
    longDesc: "Many old physical shares have spelling mismatches compared to modern PAN or Aadhaar records. This prevents dematerialization. We draft the necessary affidavits and coordinate with RTAs to align names correctly.",
    timeline: "2 - 3 Months",
    eligibility: [
      "Shareholder whose name spelling on share certificates differs from PAN card.",
      "Female shareholders whose surnames changed post-marriage."
    ],
    documents: [
      "Form ISR-1 (KYC Update Form)",
      "Gazette Notification copy or Marriage Certificate (for post-marriage changes)",
      "Affidavit on stamp paper declaring both names belong to the same person",
      "Attested copy of PAN card and Aadhaar card",
      "Original physical share certificate"
    ],
    faqs: [
      {
        question: "What is a Gazette Notification?",
        answer: "A Gazette Notification is an official public record of a name change. It is required if there is a major change in the name (not just a minor spelling error)."
      }
    ]
  },
  {
    slug: "signature-mismatch",
    title: "Signature Mismatch Resolve",
    shortDesc: "Update old signatures registered in company books with your modern signature.",
    longDesc: "Signatures change over decades. If your signature on a transfer deed or demat request doesn't match the signature recorded with the company 20-30 years ago, the request is rejected. We help update your signature records securely.",
    timeline: "2 - 3 Months",
    eligibility: [
      "Shareholder whose signature has changed over time.",
      "Joint holder whose signature mismatch halts transaction."
    ],
    documents: [
      "Form ISR-2 (Signature Attestation from Bank Manager)",
      "Fresh signature specimen card",
      "Letter of request to the RTA",
      "Client Master List (CML) of Demat Account",
      "PAN Card & Aadhaar Card copies attested by Bank"
    ],
    faqs: [
      {
        question: "Why must the bank manager attest my signature?",
        answer: "Since the company RTA does not know your new signature, they rely on the verification of your banker (where you hold a long-standing active account) via Form ISR-2."
      }
    ]
  },
  {
    slug: "demat-conversion",
    title: "Physical Share to Demat Conversion",
    shortDesc: "Convert paper share certificates into electronic format as mandated by SEBI.",
    longDesc: "SEBI has made it mandatory to hold and trade shares in electronic (demat) format. Physical shares cannot be traded or transferred. We assist in auditing your old certificates, resolving KYC issues, and converting them to demat.",
    timeline: "1 - 2 Months (Once KYC is updated)",
    eligibility: [
      "Any individual holding physical share certificates in Indian companies."
    ],
    documents: [
      "Demat Requisition Form (DRF) from depository participant",
      "Original physical share certificates",
      "Client Master List (CML) of Demat Account",
      "Self-attested PAN and Aadhaar copies"
    ],
    faqs: [
      {
        question: "Can I sell physical shares directly?",
        answer: "No, SEBI has banned the trading or transfer of physical shares. They must be dematerialized first."
      }
    ]
  },
  {
    slug: "nri-share-recovery",
    title: "NRI Share Recovery Desk",
    shortDesc: "Specialized recovery services for Non-Resident Indians with legal documentation.",
    longDesc: "NRIs holding shares in India face coordination hurdles due to embassy verification requirements and foreign bank accounts. We provide end-to-end documentation assistance, power of attorney drafting, and consulate attestation checklists.",
    timeline: "6 - 12 Months",
    eligibility: [
      "Non-Resident Indians or OCI holders who own unclaimed shares, dividends, or IEPF assets in India."
    ],
    documents: [
      "Power of Attorney (POA) in favor of KIRS experts (notarized and apostilled/consulate attested)",
      "Passport and Overseas Address Proof copies (duly attested)",
      "NRE/NRO Bank Account CML & Form ISR-2",
      "Tax Residency Certificate (TRC) (if claiming lower tax withholding)"
    ],
    faqs: [
      {
        question: "Is physical presence in India required?",
        answer: "No, by executing a specialized Power of Attorney (POA) attested by the Indian Embassy, KIRS can represent you before corporate RTAs and the IEPF authority."
      }
    ]
  },
  {
    slug: "mutual-fund-recovery",
    title: "Mutual Fund Recovery",
    shortDesc: "Track and claim forgotten mutual fund units, unclaimed dividends, and redemption payouts.",
    longDesc: "Unclaimed mutual fund redemption amounts and dividends accumulate with AMCs. We audit your portfolios across various AMCs, resolve folio changes, and help claim your outstanding payouts.",
    timeline: "2 - 3 Months",
    eligibility: [
      "Investors or nominees holding old mutual fund folio statements with unclaimed amounts."
    ],
    documents: [
      "Unclaimed redemption/dividend request form",
      "Old Folio account statement copies",
      "Bank Account details with attestation",
      "KYC documents (PAN & Aadhaar)"
    ],
    faqs: [
      {
        question: "How do mutual fund units go unclaimed?",
        answer: "Usually, this occurs due to change of address, closed bank accounts, or failure to update nomination records. The AMC holds these funds in special unclaimed dividend/redemption accounts."
      }
    ]
  },
  {
    slug: "dividend-recovery",
    title: "Unclaimed Dividend Recovery",
    shortDesc: "Retrieve unpaid corporate dividends from recent years before they get sent to IEPF.",
    longDesc: "Dividends declared by companies remain with them for 7 years. If unclaimed during this time, they are sent to the IEPF. We assist in auditing corporate records and requesting RTAs to issue demand drafts for dividends under 7 years old.",
    timeline: "2 - 3 Months",
    eligibility: [
      "Shareholders who did not receive dividends for the last 1 to 6 years."
    ],
    documents: [
      "Request letter for dividend payment details",
      "Form ISR-1 (KYC updates)",
      "Form ISR-2 (Bank details attestation)",
      "Original physical share certificates or Demat CML"
    ],
    faqs: [
      {
        question: "Can I recover dividends directly to my bank?",
        answer: "Yes, companies now credit unclaimed dividends directly into the bank account linked to your folio/demat account via ECS."
      }
    ]
  },
  {
    slug: "legal-heir-documentation",
    title: "Legal Heir Documentation",
    shortDesc: "Drafting of legal affidavits, indemnity bonds, NOCs, and family status declarations.",
    longDesc: "Legal documentation is the core hurdle in reclaiming deceased shares. We prepare legal heir affidavits, indemnity bonds, surety forms, and coordinate lawyer consultations to guarantee drafts meet specific RTA rules.",
    timeline: "1 - 2 Months",
    eligibility: [
      "Legal heirs needing customized legal drafts for share transmission."
    ],
    documents: [
      "Family Tree details / Geneological Tree copy",
      "List of Legal Heirs with age and relationship proofs",
      "Surety details (KYC and income proofs for sureties, if required by company)"
    ],
    faqs: [
      {
        question: "Who is a surety?",
        answer: "A surety is a guarantor who co-signs the indemnity bond, vouching that the claimant is the genuine heir. RTAs require sureties to provide income proof (like ITR/salary slips) equivalent to the share value."
      }
    ]
  },
  {
    slug: "succession-support",
    title: "Succession & Court Support",
    shortDesc: "Guidance on obtaining Succession Certificates and Probate of Will from competent courts.",
    longDesc: "If share holdings exceed ₹5 Lakhs, RTAs demand court-approved succession papers. We provide legal guidance, map courtroom procedures, draft standard petitions, and connect you with experienced estate lawyers.",
    timeline: "6 - 12 Months (Court dependent)",
    eligibility: [
      "Claimants of large-value portfolios without active nomination details."
    ],
    documents: [
      "Deceased shareholder details and death certificate",
      "Full assets schedule (detailing companies, folio numbers, share counts, market value)",
      "Legal heir credentials"
    ],
    faqs: [
      {
        question: "What is a Succession Certificate?",
        answer: "A Succession Certificate is a document issued by a civil court in India certifying the legal heirs of a deceased person authorized to inherit debts and securities."
      }
    ]
  },
  {
    slug: "unclaimed-bank-deposits",
    title: "Unclaimed Bank Deposits – FD, Savings",
    shortDesc: "Recover forgotten fixed deposits and inactive savings account balances.",
    longDesc: "Bank accounts and fixed deposits that have not been operated for 10 years are classified as unclaimed, and the funds are transferred to the RBI's Depositor Education and Awareness (DEA) Fund. We assist individuals and legal heirs in tracking these dormant accounts, completing the necessary KYC, and reclaiming the funds from the respective banks.",
    timeline: "2 - 4 Months",
    eligibility: [
      "Account holders who have forgotten their old savings accounts or FDs.",
      "Legal heirs of deceased individuals who held unrecorded bank deposits."
    ],
    documents: [
      "Old bank passbooks, FD receipts, or account statements",
      "Claim form prescribed by the respective bank",
      "KYC documents (PAN and Aadhaar)",
      "Death certificate and legal heirship proof (in case of deceased holder)",
      "Indemnity bond and surety (if required by the bank)"
    ],
    faqs: [
      {
        question: "What happens to bank deposits unclaimed for 10 years?",
        answer: "Banks transfer deposits inactive for 10 or more years to the RBI's DEA Fund. However, depositors or their legal heirs can still claim these funds from the bank."
      },
      {
        question: "Can I claim a fixed deposit without the original receipt?",
        answer: "Yes, you can claim it by submitting an indemnity bond and fulfilling the bank's procedural requirements for lost FD receipts."
      }
    ]
  },
  {
    slug: "unclaimed-insurance-life",
    title: "Unclaimed Insurance – Life",
    shortDesc: "Retrieve maturity proceeds and death benefits from forgotten life insurance policies.",
    longDesc: "Millions of rupees remain unclaimed with life insurance companies like LIC and private insurers due to lost policy documents, change of address, or families being unaware of the deceased's policies. We help trace these policies, prepare the required claim forms, and secure the payouts.",
    timeline: "1 - 3 Months",
    eligibility: [
      "Policyholders whose maturity benefits have remained unclaimed.",
      "Nominees or legal heirs of a deceased policyholder."
    ],
    documents: [
      "Original policy bond (if available) or indemnity for lost bond",
      "Claim discharge form",
      "Death certificate (for death claims)",
      "Bank account details (cancelled cheque)",
      "KYC documents of the claimant"
    ],
    faqs: [
      {
        question: "How do I know if my deceased parent had a life insurance policy?",
        answer: "We can help you trace potential policies by checking old bank statements for premium deductions or directly inquiring with major insurers using the deceased's details."
      },
      {
        question: "Is there a time limit to claim life insurance benefits?",
        answer: "While it is best to claim as soon as possible, you can still claim past-due maturity or death benefits. Unclaimed amounts are held by the insurer and eventually transferred to the Senior Citizens' Welfare Fund, but remain claimable."
      }
    ]
  }
];

