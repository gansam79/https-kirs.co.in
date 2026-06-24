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
    longDesc: "An unclaimed deposit is a savings, current, or fixed deposit account that has remained inactive or unclaimed for 10 years or more. If funds are left untouched for this period, banks are required to transfer the money to the central bank's fund (e.g., the DEA Fund in India).",
    timeline: "Subject to bank/NBFC processing",
    eligibility: [],
    documents: [],
    faqs: []
  },
  {
    slug: "unclaimed-insurance-recovery",
    title: "Unclaimed Insurance Recovery",
    shortDesc: "Claim unpaid insurance proceeds quickly and efficiently.",
    longDesc: "Unclaimed insurance is the money an insurance company owes to a policyholder or beneficiary that remains uncollected for more than 12 months after it becomes due. These funds include death benefits, maturity claims, survival benefits, premium refunds, and surrender values. Types of Unclaimed Insurance: • Death Benefits: Life insurance payouts owed to a nominee after the policyholder's passing. • Maturity/Survival Benefits: Payouts when a policy term successfully concludes. • Refunds and Deposits: Excess premiums paid or unadjusted premium deposits. • Health and Surrender Values: Unclaimed reimbursement claims or the cash value of a cancelled policy.",
    timeline: "Subject to insurance company processing",
    eligibility: [],
    documents: [],
    faqs: []
  },
  {
    slug: "unclaimed-pension-retirement-benefits-recovery",
    title: "Unclaimed Pension & Retirement Benefits Recovery",
    shortDesc: "Locate and recover unclaimed pension and retirement benefits.",
    longDesc: "An unclaimed pension fund refers to accumulated retirement savings—such as a workplace pension or provident fund—that have been left behind or forgotten. This happens when a person changes jobs, moves, or retires and fails to withdraw their funds or notify the pension administrator of updated contact information. How They Happen - Job Changes: Many employees leave small balances in a former employer’s pension plan and forget about them when moving to a new company. Outdated Contact Details: Failing to update your address, email, or bank details with the pension provider or trustee. Missing Beneficiaries: Relatives or heirs may not be aware that the deceased individual had a pension account or life insurance component attached to it. What Happens to the Money: The money does not disappear; it remains with the regulated financial institution, employer, or a government-appointed pension board. After a certain dormancy period (which varies by jurisdiction), the funds may be transferred to a government or statutory trust account designated for unclaimed properties.",
    timeline: "Subject to department processing",
    eligibility: [],
    documents: [],
    faqs: []
  },
  {
    slug: "transmission-of-shares",
    title: "Transmission of Shares",
    shortDesc: "Transfer of shares to legal heirs in the event of the shareholder's demise.",
    longDesc: "When a shareholder passes away, their investments do not automatically transfer to their family. Transmission of shares is the legal process of transferring the ownership of shares and mutual funds to the rightful nominees or legal heirs. We assist in navigating the complex documentation, including Succession Certificates, Legal Heirship Certificates, Probate of Will, and customized RTA bonds to ensure a seamless transfer of your ancestral wealth.",
    timeline: "Subject to RTA and court processing",
    eligibility: [],
    documents: [],
    faqs: []
  },
  {
    slug: "nri-share-recovery",
    title: "NRI Share Recovery",
    shortDesc: "Specialized recovery solutions for Non-Resident Indians facing KYC and address issues.",
    longDesc: "Non-Resident Indians (NRIs) often face unique challenges when attempting to recover their Indian investments due to changes in citizenship, outdated Indian addresses, signature mismatches, or lack of active Indian bank accounts (NRO/NRE). Our dedicated NRI desk provides expert assistance with embassy notarizations, bespoke Power of Attorney (POA) drafting, and complete RTA liaison, enabling NRIs to recover their shares and IEPF claims without the need to travel to India.",
    timeline: "Subject to authority processing",
    eligibility: [],
    documents: [],
    faqs: []
  }
];

