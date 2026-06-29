import React from "react";
import { ShieldCheck, Users, Search, Landmark, Scale, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const coreValues = [
  {
    title: "Uncompromising Integrity",
    desc: "We compile all documentation strictly under MCA, SEBI, and RTA rules. No shortcuts, no false promises.",
    icon: Scale
  },
  {
    title: "Client-Centric Dedication",
    desc: "We assign dedicated relationship case managers to guide you through bank verifications and court petition coordinates.",
    icon: Users
  },
  {
    title: "Zero-Error Auditing",
    desc: "Our internal documentation desk double-audits every signature card and indemnity bond to prevent RTA rejections.",
    icon: ShieldCheck
  }
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Title and Pitch */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Our Legacy</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
            About Kalavati Investment & Recovery Services
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Restoring forgotten wealth and securing family legacies across generations through specialized documentation advisory.
          </p>
        </div>

        {/* Story Grid */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">
              Who We Are
            </h2>
            <p className="text-slate-650 text-xs leading-relaxed font-medium text-slate-800">
              Our company KI&RS is India's largest & only listed platform for unclaimed investment recovery. Envisioned on 11.11.11, our company is a one-stop solution, aimed at helping clients to protect and retrieve their investments/money.
            </p>
            <p className="text-slate-650 text-xs leading-relaxed">
              These services include Investment Retrieval, Wealth Protection, and litigation funding solutions thereby assisting in resolving various disputes regarding blocked investments in Shares, Mutual Funds, PFs, Insurance, Bank Deposits, etc., largely on a success fees model. So far, the group company has dealt with over 50,000+ prospects and recovered investments worth over ₹250 crores, demonstrating our broad influence and trusted reputation in the market. We are based out in Pune.
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="font-serif text-base font-bold text-primary">
                Why Unclaimed Assets Exist in India
              </h3>
              <p className="text-slate-650 text-xs leading-relaxed">
                Trillions of rupees in dividends and equity holdings lie frozen with company RTAs and the Government. Many investors bought physical share certificates decades ago, but changed addresses, lost original certificates, or passed away without leaving updated nominations or Wills.
              </p>
              <p className="text-slate-650 text-xs leading-relaxed">
                As SEBI phased out physical transactions, these old holdings became locked. Heirs discover ancestral shares but are overwhelmed by the legal paperwork—Indemnity Bonds, Banker attestation spec, Gazette notifications, and MCA Form IEPF-5.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 text-white p-6 rounded-lg border border-slate-800 space-y-4">
            <div>
              <h3 className="font-serif text-base font-bold text-secondary">Our Mission</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed mt-1.5">
                KI&RS is committed to offering comprehensive solutions for asset recovery, unclaimed investments, and total wealth protection. By increasing awareness, incorporating technology, and providing consulting services that go beyond simple financial recovery, we hope to pave the way for a more promising and equitable future.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <h3 className="font-serif text-base font-bold text-secondary">Our Vision</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed mt-1.5">
                Envisioning a society where every individual has total wealth protection, KI&RS aims to lead a revolution in the recovery of unclaimed investments and assets, guaranteeing that no one is left behind due to financial constraints. Our vision is to create a society that prioritizes financial justice, allowing individuals to regain what is rightly theirs.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <h3 className="font-serif text-base font-bold text-secondary">Our Goal</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed mt-1.5">
                Our goal at KI&RS is two-fold: to lead the industry in the recovery of unclaimed investments while providing holistic solutions for complete wealth protection. We aim to enable investors all over the world to effectively recover their assets through Share Samadhan. To achieve this goal, we work to continually enhance our processes, and broaden our reach, whilst remaining up-to-date on industry trends and innovations.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
              <span>Founded on Trust</span>
              <span className="text-secondary font-bold font-mono">PAN India Presence</span>
            </div>
          </div>
        </div>

        {/* Founder Spotlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm">
          {/* Avatar container */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 h-80 border-4 border-secondary rounded shadow-lg overflow-hidden bg-primary flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/founder.png`}
                alt="Mr. Pradip Samgir - Chief Consultant"
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-slate-900/10 to-transparent z-10 flex flex-col justify-end p-5 text-center text-white">
                <span className="text-[9px] text-secondary font-bold uppercase tracking-widest">Chief Advisory Board</span>
                <h3 className="font-serif text-lg font-bold">Mr. Pradip Samgir</h3>
                <p className="text-[10px] text-slate-350 mt-0.5">Asset Recovery Consultant</p>
              </div>
            </div>
          </div>

          {/* Expert biography details */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Expert Leadership</span>
            <h2 className="font-serif text-2xl font-bold text-primary">Chief Consultant profile</h2>
            <div className="w-16 h-[1px] bg-slate-200"></div>
            <p className="text-slate-655 text-xs leading-relaxed">
              Our chief advisor, Mr. Pradip Samgir, brings over 30 years of Indian Capital Market experience, corporate registers bank deposits, Insurance, Shares and dividends , Mutal funds  and document vetting expertise. His extensive experience auditing folio discrepancies and navigating RTA checklists serves as the foundation for the KIRS processing framework.
            </p>
            <p className="text-slate-650 text-xs leading-relaxed">
              Under his guidance, our documentation team reviews matching metrics, drafts complex affidavits, tracks MCA compliance revisions, and acts as the liaison with Registrars (RTAs) and bank managers. We ensure that our dossiers are audit-ready before submission, keeping rejections to an absolute minimum.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-secondary shrink-0" />
              <span className="text-xs font-semibold text-slate-800">
                30+ Years of Indian Capital Market
              </span>
            </div>
          </div>
        </div>

        {/* Career Timeline from the old website */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Our Journey</span>
            <h2 className="font-serif text-2xl font-bold text-primary">Professional Career Timeline</h2>
            <div className="w-12 h-[1.5px] bg-secondary mx-auto"></div>
          </div>

          <div className="relative border-l border-slate-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8 py-2">
            <div className="relative">
              {/* Circle dot marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-secondary flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-secondary font-mono">1996 – 2018</span>
                <h4 className="font-serif text-base font-bold text-primary">Share Market Broker</h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-3xl">
                  Managed Corporate, HNI, Retails clients. Built strong relationships and developed deep expertise in risk management, stock market dynamics, and corporate registry analysis in Pune.
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Circle dot marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-secondary flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-secondary font-mono">2018 – PRESENT</span>
                <h4 className="font-serif text-base font-bold text-primary">Independent Financial Consultant & Founder</h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-3xl">
                  Established an independent consulting practice specializing in IEPF claim processing, demat account assistance, investment recovery, and personalized financial counselling. Led successful unclaimed share recoveries for over 1,000 clients across India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-primary">Our Operating Values</h2>
            <p className="text-slate-500 text-xs">
              Every documentation folder we compile is subject to core ethical coordinates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
                  <div className="w-10 h-10 bg-primary/5 border border-primary/10 rounded flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-primary">{val.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regulatory Alert Banner */}
        <div className="bg-slate-100 border border-slate-200 p-6 rounded-lg max-w-4xl mx-auto flex items-start gap-4">
          <Landmark className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">Disclaimer & Transparency Commitment</h4>
            <p className="text-[10px] text-slate-500 leading-normal">
              KIRS (Kalavati Investment & Recovery Services) operates strictly as an independent consultancy and documentation assistance provider. We are not a government office and have no official affiliations with the IEPF Authority, SEBI, MCA, RBI, IRDA, or PFRDA. The service fees charged represent physical documentation drafts, record reviews, and procedural advisories.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
