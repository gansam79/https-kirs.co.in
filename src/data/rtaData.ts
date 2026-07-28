export interface RTAEntry {
  id: string;
  name: string;
  category: "Equity RTA" | "Mutual Fund RTA" | "Corporate In-house Desk" | "Banking & Bond RTA";
  city: string;
  headOfficeAddress: string;
  investorEmail: string;
  phone: string;
  website: string;
  unclaimedSearchUrl: string;
  sebiRegNo: string;
  servicedCompanies: string[];
  mandatoryForms: {
    formCode: string;
    formName: string;
    description: string;
  }[];
  avgProcessingTimeline: string;
}

export const RTA_DIRECTORY_DATA: RTAEntry[] = [
  {
    id: "kfintech",
    name: "KFin Technologies Limited (formerly Karvy)",
    category: "Equity RTA",
    city: "Hyderabad",
    headOfficeAddress: "KFintech Tower B, Plot 31-32, Gachibowli Financial District, Nanakramguda, Hyderabad - 500032, Telangana",
    investorEmail: "einward.ris@kfintech.com",
    phone: "+91 40 6716 2222 / 1800 309 4001",
    website: "https://www.kfintech.com",
    unclaimedSearchUrl: "https://ris.kfintech.com/investor",
    sebiRegNo: "INR000000221",
    servicedCompanies: [
      "Reliance Industries Ltd",
      "Infosys Ltd",
      "Wipro Ltd",
      "Hindustan Unilever Ltd (HUL)",
      "Larsen & Toubro (L&T)",
      "Bajaj Auto Ltd",
      "Axis Bank Ltd",
      "Dr. Reddy's Laboratories",
      "Asian Paints (partial)",
      "Tech Mahindra",
      "Apollo Hospitals"
    ],
    mandatoryForms: [
      { formCode: "Form ISR-1", formName: "Request for Registering PAN, KYC & Bank Details", description: "Mandatory RTA update for all physical folio holders" },
      { formCode: "Form ISR-2", formName: "Confirmation of Signature by Banker", description: "Attest specimen signature when updating bank or transferring shares" },
      { formCode: "Form ISR-4", formName: "Request for Issue of Duplicate Certificate", description: "Required for lost share paper certificates or letter of confirmation" },
      { formCode: "Form SH-13", formName: "Registration of Nomination", description: "Registering or updating legal nominee in corporate registry" },
      { formCode: "Form IEPF-5", formName: "MCA Claim Form for IEPF", description: "Online MCA form for shares transferred to Investor Education & Protection Fund" }
    ],
    avgProcessingTimeline: "30 to 45 business days for KYC/ISR; 6 to 9 months for IEPF claims"
  },
  {
    id: "linkintime",
    name: "Link Intime India Private Limited",
    category: "Equity RTA",
    city: "Mumbai",
    headOfficeAddress: "C 101, 247 Park, L.B.S. Marg, Vikhroli (West), Mumbai - 400083, Maharashtra",
    investorEmail: "rnt.helpdesk@linkintime.co.in",
    phone: "+91 22 4918 6000 / +91 22 4918 6270",
    website: "https://www.linkintime.co.in",
    unclaimedSearchUrl: "https://web.linkintime.co.in/client-downloads.html",
    sebiRegNo: "INR000004058",
    servicedCompanies: [
      "Tata Consultancy Services (TCS)",
      "Tata Motors Ltd",
      "Tata Steel Ltd",
      "Asian Paints Ltd",
      "Titan Company Ltd",
      "Maruti Suzuki India Ltd",
      "Sun Pharmaceutical Industries",
      "Cipla Ltd",
      "Mahindra & Mahindra Ltd",
      "JSW Steel Ltd",
      "UltraTech Cement"
    ],
    mandatoryForms: [
      { formCode: "Form ISR-1", formName: "KYC & PAN Registration", description: "Mandatory link of PAN, Aadhaar, Email, Mobile and Bank account" },
      { formCode: "Form ISR-2", formName: "Banker Signature Verification", description: "Bank manager signature verification on official bank letterhead" },
      { formCode: "Form ISR-3", formName: "Opt-Out of Nomination", description: "Declaration to decline nomination registration" },
      { formCode: "Form ISR-4", formName: "Duplicate Share Certificate Application", description: "Issuance of replacement duplicate certificate or letter of confirmation" },
      { formCode: "Form SH-13", formName: "Nomination Registration", description: "Appointing nominee for physical share folios" }
    ],
    avgProcessingTimeline: "30 business days for physical service requests; 6 to 8 months for IEPF MCA forms"
  },
  {
    id: "bigshare",
    name: "Bigshare Services Private Limited",
    category: "Equity RTA",
    city: "Mumbai",
    headOfficeAddress: "Office No S6-2, 6th Floor, Pinnacle Business Park, Next to Ahura Centre, Mahakali Caves Road, Andheri (East), Mumbai - 400093, Maharashtra",
    investorEmail: "investor@bigshareonline.com",
    phone: "+91 22 6263 8200",
    website: "https://www.bigshareonline.com",
    unclaimedSearchUrl: "https://www.bigshareonline.com/UnclaimedDividend.aspx",
    sebiRegNo: "INR000001385",
    servicedCompanies: [
      "Midcap & Smallcap Public Listed Companies",
      "Chemical & Fertilizer Sector Undertakings",
      "Textile & Engineering Manufacturing Firms",
      "Regional PSU & Co-operative Corporations"
    ],
    mandatoryForms: [
      { formCode: "Form ISR-1", formName: "Investor KYC Update", description: "Update PAN, Demat details (CML) and Bank Mandate" },
      { formCode: "Form ISR-2", formName: "Banker Attestation", description: "Verify signatures of original holders against bank records" },
      { formCode: "Form ISR-4", formName: "Duplicate / Transmission Claim", description: "Claiming lost shares or deceased holder transmission" }
    ],
    avgProcessingTimeline: "30 to 40 days for document verification"
  },
  {
    id: "cameo",
    name: "Cameo Corporate Services Limited",
    category: "Equity RTA",
    city: "Chennai",
    headOfficeAddress: "Subramanian Building, 1 Club House Road, Chennai - 600002, Tamil Nadu",
    investorEmail: "investor@cameoindia.com",
    phone: "+91 44 2846 0390",
    website: "https://www.cameoindia.com",
    unclaimedSearchUrl: "https://www.cameoindia.com",
    sebiRegNo: "INR000003753",
    servicedCompanies: [
      "South India Bluechips & Listed Entities",
      "Textile, Sugar & Energy Enterprises",
      "Automobile Ancillary Manufacturers"
    ],
    mandatoryForms: [
      { formCode: "Form ISR-1", formName: "KYC Master Update", description: "Submission of PAN, Aadhaar and CML" },
      { formCode: "Form ISR-2", formName: "Signature Verification", description: "Bank manager signature verification" }
    ],
    avgProcessingTimeline: "30 to 45 business days"
  },
  {
    id: "itc_inhouse",
    name: "ITC Limited - In-House Investor Service Centre",
    category: "Corporate In-house Desk",
    city: "Kolkata",
    headOfficeAddress: "Virginia House, 37 J. L. Nehru Road, Kolkata - 700071, West Bengal",
    investorEmail: "isc@itc.in",
    phone: "+91 33 2288 9371 / 1800 345 3555",
    website: "https://www.itcportal.com",
    unclaimedSearchUrl: "https://www.itcportal.com/about-itc/shareholder-value/unclaimed-dividend.aspx",
    sebiRegNo: "In-house Corporate Registrar",
    servicedCompanies: ["ITC Limited"],
    mandatoryForms: [
      { formCode: "Form ISR-1", formName: "KYC & PAN Registration", description: "Mandatory update of PAN and Demat details" },
      { formCode: "Form ISR-2", formName: "Banker Signature Verification", description: "Banker attestation for signature match" },
      { formCode: "Form IEPF-5", formName: "MCA IEPF Payout Claim", description: "For dividends transferred to IEPF" }
    ],
    avgProcessingTimeline: "25 to 35 business days for direct inquiries"
  },
  {
    id: "alankit",
    name: "Alankit Assignments Limited",
    category: "Equity RTA",
    city: "New Delhi",
    headOfficeAddress: "2E/21, Alankit House, Jhandewalan Extension, New Delhi - 110055",
    investorEmail: "rta@alankit.com",
    phone: "+91 11 4254 1234 / 4254 1956",
    website: "https://www.alankit.com",
    unclaimedSearchUrl: "https://www.alankit.com/services/rta",
    sebiRegNo: "INR000002532",
    servicedCompanies: [
      "State Bank of India (SBI)",
      "Public Sector Banks & PSUs",
      "Northern India Industrial Enterprises"
    ],
    mandatoryForms: [
      { formCode: "Form ISR-1", formName: "KYC & PAN Registration", description: "Master update form" },
      { formCode: "Form ISR-2", formName: "Signature Attestation", description: "Banker endorsement" }
    ],
    avgProcessingTimeline: "30 to 45 business days"
  },
  {
    id: "cams",
    name: "CAMS (Computer Age Management Services)",
    category: "Mutual Fund RTA",
    city: "Chennai",
    headOfficeAddress: "New No. 10, Old No. 178, MGR Salai, Nungambakkam, Chennai - 600034, Tamil Nadu",
    investorEmail: "secretarial@camsonline.com",
    phone: "+91 44 6102 5171 / 1800 419 2267",
    website: "https://www.camsonline.com",
    unclaimedSearchUrl: "https://mycams.camsonline.com/unclaimed-redemption",
    sebiRegNo: "INR000002813",
    servicedCompanies: [
      "HDFC Mutual Fund",
      "ICICI Prudential Mutual Fund",
      "SBI Mutual Fund",
      "Aditya Birla Sun Life MF",
      "Kotak Mahindra MF",
      "DSP Mutual Fund",
      "Tata Mutual Fund"
    ],
    mandatoryForms: [
      { formCode: "MF-KYC", formName: "Central KYC (CKYC) Form", description: "KYC compliance for mutual fund folios" },
      { formCode: "Bank-Update", formName: "Multiple Bank Mandate Registration", description: "Updating bank account for unclaimed mutual fund redemptions" }
    ],
    avgProcessingTimeline: "15 to 25 business days for folio reconciliation"
  }
];

export interface SearchFilterOptions {
  query: string;
  category: string;
  city: string;
}

export function searchRTADirectory(options: SearchFilterOptions): RTAEntry[] {
  const q = options.query.trim().toLowerCase();
  
  return RTA_DIRECTORY_DATA.filter((item) => {
    // Category check
    if (options.category && options.category !== "All" && item.category !== options.category) {
      return false;
    }
    // City check
    if (options.city && options.city !== "All" && item.city.toLowerCase() !== options.city.toLowerCase()) {
      return false;
    }
    // Text search query matching RTA Name, Serviced Companies, City, or Address
    if (q) {
      const matchName = item.name.toLowerCase().includes(q);
      const matchCity = item.city.toLowerCase().includes(q);
      const matchComp = item.servicedCompanies.some((c) => c.toLowerCase().includes(q));
      const matchAddr = item.headOfficeAddress.toLowerCase().includes(q);
      return matchName || matchCity || matchComp || matchAddr;
    }

    return true;
  });
}
