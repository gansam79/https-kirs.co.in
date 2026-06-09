export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  keywords: string[];
}

export const blogData: BlogPost[] = [
  {
    slug: "iepf-claim-procedure-guide",
    title: "Step-by-Step Guide to Claiming Shares & Dividends from IEPF",
    category: "IEPF Recovery",
    date: "June 2026",
    readTime: "6 Min Read",
    excerpt: "Learn how to file Form IEPF-5 on the MCA portal, gather required physical documentation, and successfully claim back your unclaimed investments.",
    content: [
      "If you have recently discovered that your long-term shareholdings or corporate dividends were transferred to the Investor Education and Protection Fund (IEPF), you are not alone. Under Section 124(6) of the Companies Act 2013, companies are required to transfer shares to the IEPF if dividends remain unclaimed for seven consecutive years.",
      "The recovery process can feel daunting, but it is structured under clear legal frameworks. Here is a step-by-step walkthrough of the IEPF-5 claim procedure:",
      "Step 1: Entitlement Verification. Before filing, you must request an entitlement letter from the company's Registrar and Transfer Agent (RTA). This confirms the number of shares and exact dividend amounts transferred under your folio name.",
      "Step 2: Filing MCA Form IEPF-5. The claim must be initiated online through the Ministry of Corporate Affairs (MCA) portal. You will need to create a profile, fill out Form IEPF-5, upload self-attested copies of your PAN and Aadhaar, and submit the form online.",
      "Step 3: Physical Verification Dossier. Submitting online is not enough. You must print the submitted IEPF-5 copy, sign it, and compile a physical dossier containing: a ₹500 Indemnity Bond on non-judicial stamp paper, advance receipts with revenue stamps, the original share certificates, and bank account attestation (Form ISR-2) with a cancelled cheque.",
      "Step 4: Dispatch to RTA. The physical dossier must be dispatched to the company's registered RTA within 15 days of online filing. The RTA will audit the documents. If approved, they submit a verification report to the IEPF Authority.",
      "Step 5: IEPF Authority Review. The government authority audits the report. Upon validation, they issue an e-sanction order, crediting the shares directly to your demat account and transferring dividends to your bank via ECS.",
      "Timeline & rejections: The process typically takes 6 to 9 months. The most common reasons for rejection are spelling mismatches in names, signature differences on the indemnity bond, or incomplete bank attestations. Double-auditing documents is critical before dispatch."
    ],
    keywords: ["IEPF Claim Recovery", "Form IEPF-5 MCA", "Unclaimed Dividend Retrieval", "RTA verification checklist"]
  },
  {
    slug: "physical-shares-to-demat-mandatory",
    title: "Mandatory Physical Share to Demat Conversion: SEBI Regulations Explained",
    category: "Demat Conversion",
    date: "May 2026",
    readTime: "5 Min Read",
    excerpt: "SEBI has made it mandatory to dematerialize physical share certificates. Discover the steps to convert paper folios into electronic format.",
    content: [
      "For decades, holding physical share certificates in lockboxes was the standard way to own equity in India. However, paper certificates are prone to theft, mutilation, signature forgery, and loss during transit. To safeguard retail investors and increase market transparency, SEBI implemented a major regulatory shift.",
      "Under SEBI guidelines, physical shares can no longer be traded, transferred, or sold. They must be dematerialized (converted to electronic form) before any transactions can occur.",
      "Why you must dematerialize immediately: Even if you do not plan to sell your shares, keeping them in paper format exposes you to risks. If a company announces a merger, bonus shares, or stock splits, managing paper certificates is highly complex. Many old physical folios also end up transferred to the IEPF because paper dividend warrants go undelivered.",
      "The Dematerialization Process:",
      "1. Open a Demat Account: You must hold an active demat account with a Depository Participant (DP) registered with NSDL or CDSL.",
      "2. Update KYC: Ensure your name spelling, address, PAN, and signatures in the company's folio records exactly match your demat account client master list (CML). If there are errors, submit Form ISR-1 to the RTA first.",
      "3. Submit Demat Requisition Form (DRF): Obtain a DRF from your DP, fill in the share certificate details, attach the original physical share certificates (defaced by writing 'Surrendered for Dematerialization' across them), and submit them to your DP.",
      "4. RTA Validation: The DP sends the physical papers to the company's RTA. The RTA matches the signature and certificate authenticity. If cleared, they destroy the physical certificates and credit the shares electronically.",
      "Dealing with common blocks: Signature mismatch is the number one cause of demat rejection. If your signature has changed over 20-30 years, you must submit Form ISR-2 attested by your bank manager to update the RTA specimen records before initiating the DRF request."
    ],
    keywords: ["Physical Share to Demat", "SEBI Dematerialization Rules", "Form ISR-1 RTA", "NSDL CDSL electronic conversion"]
  },
  {
    slug: "share-transmission-without-nomination",
    title: "How to Claim Deceased Shareholdings Without a Registered Nominee",
    category: "Share Transmission",
    date: "April 2026",
    readTime: "7 Min Read",
    excerpt: "Recovering shares after a shareholder passes away can be a legal hurdle. Read about the document requirements for transmission without nomination.",
    content: [
      "When a family member passes away leaving behind physical share certificates, the process of transferring those securities to their legal heirs is called 'transmission'. If a nominee was registered in the company folios, the process is straightforward. However, many old shareholdings do not have nominees registered, creating legal gridlocks.",
      "In the absence of a registered nominee, company RTAs enforce strict audit checks to verify that the claimant is the genuine legal successor. This protects companies from legal disputes among heirs.",
      "Understanding RTA Thresholds:",
      "• Holdings below ₹5 Lakhs: RTAs offer simplified transmission processes. You must submit the Death Certificate, legal heir declarations, family tree structures, and indemnity bonds signed by all heirs, along with surety verifications.",
      "• Holdings above ₹5 Lakhs: RTAs strictly mandate court-approved credentials. You must produce a Succession Certificate or Letter of Administration issued by a civil court, or a Probated Will.",
      "Documents to compile for the transmission folder:",
      "1. Transmission Request Form (Form ISR-5). This must be signed by the claiming successor.",
      "2. Death Certificate. Original or notarized copy.",
      "3. Legal Heir Certificate. Issued by local revenue authorities.",
      "4. Succession Certificate. Issued by court, scheduled with exact share folio valuations.",
      "5. No Objection Certificates (NOC). Signed by other legal heirs relinquishing their rights in favor of the claimant.",
      "6. Client Master List (CML). Reflecting the claimant's active demat account details.",
      "How to speed up the process: Succession Certificate petitions in court can take 6 to 12 months. Starting early, ensuring all assets are scheduled correctly with folio and certificate numbers, and coordinating legal consultations will prevent delays."
    ],
    keywords: ["Share Transmission Services", "Succession Certificate Shares", "Form ISR-5 Transmission", "Legal heir documentation"]
  }
];
