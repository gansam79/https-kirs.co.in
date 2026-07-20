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
    slug: "iepf-process-lost-shares-dividend",
    title: "IEPF Process & Lost of shares, Dividend",
    shortDesc: "Recover shares, dividends, and interest payouts transferred to the Investor Education and Protection Fund (IEPF).",
    longDesc: "Under Section 124(6) of the Companies Act, 2013, shares on which dividends have remained unpaid or unclaimed for seven consecutive years are transferred by companies to the Investor Education and Protection Fund (IEPF). We provide specialized consultancy and documentation drafting assistance to help investors reclaim these assets. Our services cover MCA Form IEPF-5 filing preparation, SPECIMEN signature updating, coordinate with Registrars & Share Transfer Agents (RTAs), and verification audit checklist compilation.",
    timeline: "6 to 12 months",
    eligibility: [
      "Original shareholders whose dividend checks were uncashed or lost for 7+ consecutive years.",
      "Legal heirs or nominees of deceased shareholders seeking transmission from IEPF.",
      "Joint holders seeking transmission or rectification of incorrect registry listings.",
      "Power of Attorney (POA) holders acting on behalf of NRI or elderly claimants."
    ],
    documents: [
      "Client Specimen Signature Verification Record (Form ISR-2 attested by Bank Manager)",
      "Form ISR-1 for KYC Details Updation (PAN, Bank, Email, Mobile, Nomination)",
      "Form IEPF-5 online submission receipt and printed physical copy",
      "Original Share Certificates (if available) or Indemnity Bond on non-judicial stamp paper (Form ISR-4 for duplicate)",
      "Client Demat Account Client Master List (CML) with active seal and sign",
      "Self-attested PAN and Aadhaar Card copy",
      "Official Entitlement Letter issued by the Company's Nodal Officer"
    ],
    faqs: [
      {
        question: "What is the IEPF and why were my shares transferred there?",
        answer: "The Investor Education and Protection Fund (IEPF) is a government body established to protect investor interests. If dividends on your shares remain unclaimed for seven consecutive years, the company is legally mandated to transfer those shares and accrued dividends to the IEPF."
      },
      {
        question: "Can I recover my shares from IEPF if I have lost the original physical certificates?",
        answer: "Yes, you can. The process requires filing for duplicate share certificates (via Form ISR-4) along with an Indemnity Bond, Surety Form, and a Police Complaint (FIR) if the value is high, which is compiled alongside your main IEPF-5 claim dossier."
      },
      {
        question: "How long does the IEPF claim process take?",
        answer: "The process typically takes 6 to 12 months. It involves verification of physical dossiers by the company's Nodal Officer, followed by an online validation and final approval/credit by the IEPF Authority."
      }
    ]
  },
  {
    slug: "lost-mutual-fund",
    title: "Lost of Mutual Fund",
    shortDesc: "Trace, consolidate, and reclaim forgotten, misplaced, or dormant mutual fund investments.",
    longDesc: "Many investors hold historical physical mutual fund certificates or have lost track of folios due to change of address, corporate name changes, or AMC mergers. We assist in locating dormant mutual fund holdings, consolidating multi-folio structures, updating outdated KYC details, and processing transmission claims to nominees or legal heirs. We coordinate directly with major registrars such as CAMS and KFintech.",
    timeline: "3 to 6 months",
    eligibility: [
      "Unit holders holding physical mutual fund certificates or lost statements.",
      "Investors facing KYC suspensions or signature mismatches in active folios.",
      "Legal heirs or nominees of deceased mutual fund investors.",
      "Senior citizens whose email, phone, or bank details are missing in registry systems."
    ],
    documents: [
      "Specimen Signature Attestation (Form ISR-2 with bank seal/sign)",
      "Form ISR-1 (KYC Update Form with PAN, Bank, Nomination, and contact details)",
      "Letter of Indemnity for Duplicate Folio / Statement Issuance",
      "Original Physical Unit Certificates (if available)",
      "Death Certificate of the main holder (for transmission claims)",
      "Bank Account proof (Cancelled cheque with printed name and bank statement)"
    ],
    faqs: [
      {
        question: "How can I trace my lost mutual fund folios if I don't have the folio number?",
        answer: "We can help search for your holdings using your PAN history, historical addresses, and matching database entries across national registrars like CAMS and KFintech."
      },
      {
        question: "What is KYC suspension in mutual funds?",
        answer: "If your PAN is not linked, or if there's a mismatch in KYC details, AMCs freeze transactions. We assist in filing the necessary re-KYC papers to reinstate active status."
      }
    ]
  },
  {
    slug: "unclaimed-bank-nbfc-deposit",
    title: "Unclaimed Bank & NBFC Deposit",
    shortDesc: "Retrieve dormant savings, current accounts, and matured Fixed Deposits (FD) from banks and NBFCs.",
    longDesc: "If a bank account or fixed deposit remains inactive or unclaimed for 10 years or more, the funds are transferred to the RBI's Depositor Education and Awareness (DEA) Fund. Similar protocols apply to Non-Banking Financial Companies (NBFCs). We offer documentation and advisory support to trace these accounts, initiate claim applications under RBI guidelines, and resolve signature changes or inheritance transmissions.",
    timeline: "2 to 4 months",
    eligibility: [
      "Depositors whose fixed deposits matured but were never redeemed or auto-renewed.",
      "Account holders whose savings or current accounts have been dormant for over 10 years.",
      "Legal heirs and nominees reclaiming inheritances from cooperative or commercial banks.",
      "Holders facing NBFC liquidations or registry updates."
    ],
    documents: [
      "Original Fixed Deposit Receipt (FDR) or Savings Passbook",
      "Claim Application Form filled and signed by the depositor/nominee",
      "Indemnity Bond for lost FD receipts (if original is misplaced)",
      "Succession Certificate or Letter of Administration (for high-value claims without nomination)",
      "Re-KYC documents (PAN, Aadhaar, address proofs, photo)",
      "Bank verification letter containing attested signatures"
    ],
    faqs: [
      {
        question: "What is the DEA Fund?",
        answer: "The Depositor Education and Awareness Fund is maintained by the RBI. All unclaimed deposits inactive for 10+ years are transferred here, but depositors retain the legal right to claim their money back with interest."
      },
      {
        question: "Can I retrieve my deceased father's bank balance if no nominee was registered?",
        answer: "Yes. For accounts without nomination, banks require a Succession Certificate, Legal Heirship Certificate, or joint indemnity representations depending on the claim amount."
      }
    ]
  },
  {
    slug: "unclaimed-insurance-policy",
    title: "Unclaimed Insurance Policy",
    shortDesc: "Claim matured policies, survival benefits, death benefits, or premium refunds from life and general insurers.",
    longDesc: "Unpaid dues of policyholders remain unclaimed with insurance companies due to missing contact details, unknown policyholder demises, or lost policy bonds. According to IRDAI regulations, these funds must be tracked and paid to rightful claimants. We assist in searching insurance databases, preparing death claims, managing nominee transfers, and drafting indemnity forms for lost policy bonds.",
    timeline: "2 to 4 months",
    eligibility: [
      "Nominees seeking settlement of death benefits under life insurance policies.",
      "Policyholders whose endowment plans matured but proceeds were not received.",
      "Beneficiaries unaware of policies held by deceased parents/relatives.",
      "Holders with survival benefits or premium refunds pending with insurers."
    ],
    documents: [
      "Original Policy Bond (or Indemnity Bond for lost policy)",
      "Claimant Statement / Discharge Form (duly signed)",
      "Death Certificate of the policyholder (for death claims)",
      "Nominee's identity proof, bank passbook, and cancelled cheque",
      "Spelling correction affidavits (if names on policy differ from PAN/Aadhaar)"
    ],
    faqs: [
      {
        question: "How do I check if there is an unclaimed insurance policy in my name?",
        answer: "We search across multiple insurers using name, date of birth, PAN, and historical addresses to locate outstanding payouts."
      },
      {
        question: "What happens if I lose my original life insurance policy bond?",
        answer: "We help draft the necessary Indemnity Bond (usually on stamp paper) and compile surety documents required by the insurance company to issue duplicate benefits."
      }
    ]
  },
  {
    slug: "missing-unclaimed-pension-amount",
    title: "Missing & Unclaimed Pension Amount",
    shortDesc: "Track, consolidate, and reclaim forgotten workplace pension funds and EPFO balances.",
    longDesc: "Employees often leave behind accumulated provident fund (PF) or pension balances when changing jobs, moving cities, or retiring. Inactive EPF accounts stop earning interest after a specific dormancy period. We assist in linking old PF accounts to your active Universal Account Number (UAN), updating bank details on the EPFO portal, submitting joint declarations for name corrections, and reclaiming pension amounts for legal heirs.",
    timeline: "3 to 6 months",
    eligibility: [
      "Former employees with old paper-based EPF accounts or frozen EPFO records.",
      "Individuals whose PF withdrawals are stuck due to bank account mismatches or missing KYC.",
      "Legal heirs of employees who passed away before withdrawing their EPF/EPS benefits.",
      "Retirees facing pension payment order (PPO) delay issues."
    ],
    documents: [
      "Old PF Account Number / Member ID slip",
      "Active UAN (Universal Account Number) details",
      "EPFO Joint Declaration Form (signed by the claimant and previous employer)",
      "Identity Proof (PAN and Aadhaar) matching EPFO records",
      "Attested bank passbook copy containing the active IFSC code",
      "Death certificate & legal heir proof (for transmission cases)"
    ],
    faqs: [
      {
        question: "Do inactive EPF accounts earn interest?",
        answer: "EPF accounts of employees who have retired from service or migrated abroad permanently stop earning interest after 36 months of inactivity. It is highly recommended to withdraw or transfer these funds immediately."
      },
      {
        question: "How do I correct a spelling mismatch in my EPFO records?",
        answer: "We help draft a Joint Declaration Form, which must be signed by both you and your previous employer and submitted with identity proof to the regional PF Commissioner."
      }
    ]
  },
  {
    slug: "court-support",
    title: "Court Support",
    shortDesc: "Documentation assistance for court Succession Certificates, Legal Heirship Certificates, and Will Probates.",
    longDesc: "When substantial financial assets (exceeding ₹5 Lakhs) are held in the name of a deceased individual without a registered nominee, corporate RTAs, banks, and registrars legally mandate a court-issued representation. We assist families in compiling the necessary documentation, drafting petitions, preparing family genealogies, and coordinating court filing paperwork to secure Succession Certificates or Probates.",
    timeline: "6 to 12 months",
    eligibility: [
      "Legal heirs of deceased asset owners where RTAs or banks refuse claims without a court order.",
      "Families seeking division or transmission of ancestral shares, deposits, or property.",
      "Executors or beneficiaries named in a Will seeking to obtain Probate.",
      "Legal representatives resolving multi-successor disputes."
    ],
    documents: [
      "Deceased asset holder's Death Certificate",
      "Legal Heir certificates / Ration Card / Family Tree proof",
      "Complete inventory of outstanding assets (share folio details, bank statement summaries)",
      "No-Objection Certificates (NOC) / Relinquishment Deeds from other legal heirs",
      "Draft Court Petitions and Affidavits compiled by legal counsel",
      "Newspaper publication drafts for public notices"
    ],
    faqs: [
      {
        question: "What is a Succession Certificate and when is it required?",
        answer: "A Succession Certificate is a document issued by a civil court establishing the rightful legal heirs of a deceased person who died intestate (without a Will). It is mandatory for claiming debt, securities, shares, and deposits exceeding statutory limits."
      },
      {
        question: "Is a Will probate always mandatory?",
        answer: "Probate is mandatory in certain jurisdictions (like Mumbai, Kolkata, Chennai) for Wills executed by Hindus, Buddhists, Sikhs, or Jains, or where the property falls within those municipal limits."
      }
    ]
  },
  {
    slug: "indian-desk-individual-huf-proprietorship-partnership",
    title: "Indian Special Desk - Individual, HUF, Proprietorship & Partnership Firm",
    shortDesc: "Tailored asset recovery and compliance drafting for resident individuals, HUFs, proprietors, and partnership entities.",
    longDesc: "Different types of legal structures face unique hurdles when tracing and claiming forgotten investments. Resident individuals often face signature changes due to age, or name changes post-marriage. HUFs face complex transmissions when the Karta passes away. Proprietorships and partnerships require asset splits or updates to tax registries. Our desk specializes in drafting custom affidavits, deeds, and KYC representations to resolve these specific challenges.",
    timeline: "3 to 6 months",
    eligibility: [
      "Resident individual shareholders with updated or mismatched KYC cards.",
      "HUF Kartas seeking partition transmission or asset retrieval.",
      "Sole Proprietors whose business bank accounts or trade registrations need updating.",
      "Partners in registered or unregistered firms dealing with dissolved assets."
    ],
    documents: [
      "Specimen Signature Updates (Form ISR-2 with bank validation)",
      "HUF Deed / Joint Family declaration signed by all Coparceners",
      "Partnership Deed and Dissolution Deed (if applicable)",
      "Sole Proprietorship registration certificates (GST, MSME, Shop Act)",
      "PAN and Aadhaar card of Individual, Karta, or Partners",
      "Client Demat details and bank statements under the entity's name"
    ],
    faqs: [
      {
        question: "What happens to HUF investments if the Karta passes away?",
        answer: "We assist in drafting the Coparcener Declaration to appoint the senior-most coparcener as the new Karta, followed by submitting transmission documentation to the RTA."
      },
      {
        question: "Can signature mismatches for senior citizens be resolved without visiting the company?",
        answer: "Yes. By submitting Form ISR-2 (attested by your banker) along with current signature specimens and matching KYC cards, the RTA can update their database."
      }
    ]
  },
  {
    slug: "indian-desk-corporate-llp",
    title: "Indian Special Desk - Corporate & LLP",
    shortDesc: "Specialized institutional retrieval of shares and dividends for registered companies and LLPs.",
    longDesc: "Corporate entities often overlook historical equity investments or face delays in recovering dividends due to company name changes, mergers, strikes, or liquidations. Reclaiming these assets from the IEPF or RTAs requires institutional documentation, board approvals, and coordination. Our corporate desk audits corporate registries, manages complex legal drafting, and coordinates with RTAs and Nodal Officers.",
    timeline: "6 to 12 months",
    eligibility: [
      "Active registered private or public limited companies under MCA.",
      "Limited Liability Partnerships (LLPs) seeking transmission of legacy partner holdings.",
      "Entities that underwent corporate restructuring, mergers, or name changes.",
      "Authorized Directors or partners recovering assets of struck-off companies."
    ],
    documents: [
      "Board Resolution authorizing specific officers to execute the recovery claim",
      "Certificate of Incorporation and Certificate of Name Change (if merged/restructured)",
      "Company/LLP PAN Card copy",
      "Authorized signatory list containing verified signatures",
      "Demat Client Master List (CML) in the name of the Company/LLP",
      "Audited financial extracts proving corporate ownership of assets"
    ],
    faqs: [
      {
        question: "Can a struck-off company recover its investments from IEPF?",
        answer: "The company must first be restored via an appeal to the National Company Law Tribunal (NCLT). Once active, the authorized director can file the IEPF claim."
      },
      {
        question: "How do corporate name changes affect share certificates?",
        answer: "We assist in submitting the fresh Certificate of Incorporation along with Board Resolutions to the RTA to update corporate records and issue new demat credits."
      }
    ]
  },
  {
    slug: "foreign-desk-nri-nre-nro",
    title: "Foreign Special Desk - NRI, NRE & NRO",
    shortDesc: "Elite recovery services for Non-Resident Indians managing overseas address changes, consulate attestations, and NRO/NRE repatriations.",
    longDesc: "Non-Resident Indians (NRIs) face significant challenges in recovering Indian investments due to changes in citizenship, outdated Indian addresses in registrar records, lack of active NRO/NRE accounts, and signature mismatches. Our dedicated NRI desk provides end-to-end guidance for overseas consulate attestations, Power of Attorney (POA) drafting, and RTA liaison, allowing claims to be processed without travel.",
    timeline: "6 to 12 months",
    eligibility: [
      "NRIs, OCIs, or foreign passport holders inheriting Indian equity assets.",
      "Expatriates with old physical certificates containing their historical Indian address.",
      "Heirs of NRIs seeking transmission of Indian mutual funds or bank deposits."
    ],
    documents: [
      "Foreign Passport and OCI Card (valid and self-attested)",
      "Foreign Address Proof (Utility bills, driving license attested by Consulate)",
      "Customized Power of Attorney (POA) drafted for Indian representation",
      "Form ISR-2 (attested signature from NRE/NRO banker)",
      "PAN Card copy (mandatory for Indian security transactions)",
      "FEMA declarations regarding asset repatriation limits"
    ],
    faqs: [
      {
        question: "Can an NRI complete an IEPF recovery without traveling to India?",
        answer: "Yes. By executing a specialized Power of Attorney (POA) in favor of our Indian representatives, notarized and stamped by the Indian Embassy, the claim can be processed remotely."
      },
      {
        question: "What is the difference between NRE and NRO account credit for recoveries?",
        answer: "Recovered dividends/shares bought on a repatriable basis are credited to NRE, while non-repatriable investments are credited to NRO. We guide you on the necessary FEMA forms."
      }
    ]
  },
  {
    slug: "foreign-desk-fii-fpi",
    title: "Foreign Special Desk - FII & FPI",
    shortDesc: "Institutional wealth recovery and SEBI compliance advisory for Foreign Portfolio Investors.",
    longDesc: "Foreign Portfolio Investors (FPIs) and Foreign Institutional Investors (FIIs) frequently encounter legacy dividend blocks, corporate action splits, or demat freezes in Indian registries. We provide administrative coordination, custodian liaison, tax residency validation reviews, and SEBI-compliant document preparation to dematerialize or claim institutional funds.",
    timeline: "6 to 12 months",
    eligibility: [
      "SEBI-registered Foreign Portfolio Investors (Category I and II).",
      "Global custodians acting on behalf of international pension, sovereign, or mutual funds.",
      "FIIs with frozen legacy demat accounts or unpaid interest coupons."
    ],
    documents: [
      "SEBI FPI Registration Certificate copy",
      "Authorized Signatory List (ASL) verified by global custodian",
      "Board Resolution / Power of Attorney authorizing the claim",
      "Tax Residency Certificate (TRC) for Double Taxation Avoidance Agreement (DTAA) benefit",
      "Demat Client Master List (CML) and custodian bank credentials"
    ],
    faqs: [
      {
        question: "How do DTAA tax benefits apply to corporate dividend recoveries for FPIs?",
        answer: "By submitting a valid Tax Residency Certificate (TRC) and Form 10F, FPIs can claim lower withholding tax rates under double tax avoidance treaties."
      },
      {
        question: "What role does the local custodian play in recovery?",
        answer: "All physical submissions to RTAs must be verified and backed by the custodian's KYC/AML approvals. We coordinate directly with custodians to align documentation."
      }
    ]
  },
  {
    slug: "trademark-registration",
    title: "Trademark Registration & E-Filing Services",
    shortDesc: "Brand name, logo, and slogan protection assistance including official e-filing via ipindiaonline.",
    longDesc: "Trademark registration protects your unique brand identity, prevents unauthorized copying, and builds legal equity. We assist individuals, HUFs, proprietors, partnerships, and corporate clients in brand searches, online e-filing via the official ipindiaonline portal (https://ipindiaonline.gov.in/trademarkefiling/user/frmLoginNew.aspx), managing examiners' reports, and submitting compliance replies. In line with the official government schedule, the online application fee for individuals/proprietors is ₹4,500 using Form TM-A.",
    timeline: "12 to 18 months",
    eligibility: [
      "Individuals and Proprietors establishing unique brand names or logos.",
      "HUFs, Partnership Firms, and LLPs launching proprietary products.",
      "Corporate entities protecting multi-category brand portfolios.",
      "Startups seeking brand protection under MSME concessional fee schemes."
    ],
    documents: [
      "Trademark applicant identity proof (PAN, Aadhaar, Passport)",
      "High-resolution logo artwork / brand name description",
      "Form TM-48 (Authorization of Trademark Agent / Power of Attorney)",
      "User Affidavit (if trademark has been in prior commercial use)",
      "MSME / Udyam Registration Certificate (to qualify for 50% government fee concession)"
    ],
    faqs: [
      {
        question: "Where is the trademark application officially filed online?",
        answer: "Applications are filed via the official e-filing portal of the Controller General of Patents, Designs and Trade Marks: https://ipindiaonline.gov.in/trademarkefiling/user/frmLoginNew.aspx"
      },
      {
        question: "What is the official government fee for filing trademark Form TM-A?",
        answer: "For individuals, sole proprietors, and HUFs, the government fee for online filing is ₹4,500. For partnership firms, corporate companies, and LLPs, the standard filing fee is ₹9,000. Startups and MSMEs with valid Udyam certificates can avail of the ₹4,500 concessional fee."
      },
      {
        question: "When can I start using the TM symbol?",
        answer: "You can start using the 'TM' symbol immediately after your application is e-filed and an acknowledgement receipt (containing the application number) is generated."
      }
    ]
  }
];
