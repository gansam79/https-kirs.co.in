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
    slug: "iepf-process-assistance",
    title: "IEPF Process Assistance",
    shortDesc: "Recover shares and dividends transferred to IEPF with expert assistance.",
    longDesc: "We provide end-to-end assistance for recovering shares, dividends, and other investments transferred to the Investor Education and Protection Fund (IEPF). Our team helps clients with document preparation, claim filing, verification procedures, and coordination with relevant authorities to ensure a smooth and hassle-free recovery process.",
    timeline: "Subject to authority processing",
    eligibility: [],
    documents: [],
    faqs: []
  },
  {
    slug: "lost-shares-mutual-fund-recovery",
    title: "Lost Shares & Mutual Fund Recovery",
    shortDesc: "Reclaim lost or inaccessible shares and mutual fund investments.",
    longDesc: "If physical share certificates are lost, misplaced, damaged, or if mutual fund investments have become inaccessible, we help investors recover their holdings through the appropriate legal and regulatory procedures. Our services include documentation support, duplicate share issuance assistance, transmission, and ownership verification.",
    timeline: "Subject to company/RTA processing",
    eligibility: [],
    documents: [],
    faqs: []
  },
  {
    slug: "unclaimed-bank-nbfc-deposit-recovery",
    title: "Unclaimed Bank & NBFC Deposit Recovery",
    shortDesc: "Recover dormant deposits from banks and NBFCs.",
    longDesc: "Many individuals have unclaimed deposits, fixed deposits, recurring deposits, or other financial assets lying dormant with banks and Non-Banking Financial Companies (NBFCs). We assist in identifying, tracing, and recovering such funds by managing the complete claim process and required documentation.",
    timeline: "Subject to bank/NBFC processing",
    eligibility: [],
    documents: [],
    faqs: []
  },
  {
    slug: "unclaimed-insurance-recovery",
    title: "Unclaimed Insurance Recovery",
    shortDesc: "Claim unpaid insurance proceeds quickly and efficiently.",
    longDesc: "We help policyholders, nominees, and legal heirs recover unclaimed insurance proceeds, including matured policies, death claims, survival benefits, and other unpaid insurance amounts. Our experts guide clients through the claim settlement process to ensure timely recovery of their rightful benefits.",
    timeline: "Subject to insurance company processing",
    eligibility: [],
    documents: [],
    faqs: []
  },
  {
    slug: "unclaimed-pension-retirement-benefits-recovery",
    title: "Unclaimed Pension & Retirement Benefits Recovery",
    shortDesc: "Locate and recover unclaimed pension and retirement benefits.",
    longDesc: "Unclaimed pension funds, provident fund balances, gratuity payments, and retirement benefits often remain undiscovered due to changes in employment, records, or nominee details. We assist individuals and families in locating, verifying, and recovering these benefits through a structured and compliant process.",
    timeline: "Subject to department processing",
    eligibility: [],
    documents: [],
    faqs: []
  }
];

