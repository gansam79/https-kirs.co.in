import React from "react";
import { ShieldCheck, Users, Search, Landmark, Scale, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { getBasePath } from "@/lib/basePath";

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
    <div className="bg-[#0B1920] min-h-screen py-16 font-sans text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Title and Pitch */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Our Legacy & Trust</span>
          <h1 className="font-roboto text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
            About Kalavati Investment & Recovery Services
          </h1>
          <div className="w-16 h-[3px] bg-[#D4AF37] mx-auto rounded-full"></div>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Restoring forgotten wealth and securing family legacies across generations through specialized documentation advisory.
          </p>
        </div>

        {/* Story Grid */}
        <div className="bg-[#17303B] rounded-2xl border border-slate-700/70 p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-roboto text-xl sm:text-2xl font-bold text-white">
              Who We Are
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed font-medium">
              Our company KI&RS is India's largest & only listed platform for unclaimed investment recovery. Envisioned on 11.11.11, our company is a one-stop solution, aimed at helping clients to protect and retrieve their investments/money.
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">
              These services include Investment Retrieval and litigation funding solutions thereby assisting in resolving various disputes regarding blocked investments in Shares, Mutual Funds, PFs, Insurance, Bank Deposits, etc., largely on a success fees model. So far, the group company has dealt with over 50,000+ prospects and recovered investments worth over ₹54 crores, demonstrating our broad influence and trusted reputation in the market. We are based out in Pune.
            </p>

            <div className="pt-4 border-t border-slate-700/70 space-y-3">
              <h3 className="font-roboto text-base font-bold text-[#D4AF37]">
                Why Unclaimed Assets Exist in India
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Trillions of rupees in dividends and equity holdings lie frozen with company RTAs and the Government. Many investors bought physical share certificates decades ago, but changed addresses, lost original certificates, or passed away without leaving updated nominations or Wills.
              </p>
              <p className="text-slate-300 text-xs leading-relaxed">
                As SEBI phased out physical transactions, these old holdings became locked. Heirs discover ancestral shares but are overwhelmed by the legal paperwork—Indemnity Bonds, Banker attestation spec, Gazette notifications, and MCA Form IEPF-5.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0B1920] text-white p-6 rounded-xl border border-slate-800 space-y-4 shadow-inner">
            <div>
              <h3 className="font-roboto text-base font-bold text-[#D4AF37]">Our Mission</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed mt-1.5">
                KI&RS is committed to offering comprehensive solutions for asset recovery and unclaimed investments. By increasing awareness, incorporating technology, and providing consulting services that go beyond simple financial recovery, we hope to pave the way for a more promising and equitable future.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <h3 className="font-roboto text-base font-bold text-[#D4AF37]">Our Vision</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed mt-1.5">
                Envisioning a society where every individual recovers their rightful investments, KI&RS aims to lead a revolution in the recovery of unclaimed investments and assets, guaranteeing that no one is left behind due to financial constraints. Our vision is to create a society that prioritizes financial justice, allowing individuals to regain what is rightly theirs.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <h3 className="font-roboto text-base font-bold text-[#D4AF37]">Our Goal</h3>
              <p className="text-[11px] text-slate-300 leading-relaxed mt-1.5">
                Our goal at KI&RS is to lead the industry in the recovery of unclaimed investments. We aim to enable investors all over the world to effectively recover their assets. To achieve this goal, we work to continually enhance our processes and broaden our reach, whilst remaining up-to-date on industry trends and innovations.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
              <span>Founded on Trust</span>
              <span className="text-[#D4AF37] font-bold font-mono">PAN India Presence</span>
            </div>
          </div>
        </div>

        {/* Founder Spotlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#17303B] border border-slate-700/70 rounded-2xl p-6 sm:p-10 shadow-xl">
          {/* Avatar container */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-64 h-80 border-4 border-[#D4AF37] rounded-2xl shadow-xl overflow-hidden bg-[#0B1920] flex items-center justify-center">
              <img
                src={`${getBasePath()}/founder.png`}
                alt="Mr. Pradip Samgir - Chief Consultant"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1920] via-transparent to-transparent z-10 flex flex-col justify-end p-5 text-center text-white">
                <span className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest">Chief Advisory Board</span>
                <h3 className="font-roboto text-lg font-bold">Mr. Pradip Samgir</h3>
                <p className="text-[10px] text-slate-300 mt-0.5">Asset Recovery Consultant</p>
              </div>
            </div>
          </div>

          {/* Expert biography details */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Expert Leadership</span>
            <h2 className="font-roboto text-2xl font-bold text-white">Chief Consultant Profile</h2>
            <div className="w-16 h-[2px] bg-[#D4AF37] rounded-full"></div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Our chief advisor, Mr. Pradip Samgir, brings over 30 years of Indian Capital Market experience, corporate registers bank deposits, Insurance, Shares and dividends, Mutual funds and document vetting expertise. His extensive experience auditing folio discrepancies and navigating RTA checklists serves as the foundation for the KIRS processing framework.
            </p>
            <p className="text-slate-300 text-xs leading-relaxed">
              Under his guidance, our documentation team reviews matching metrics, drafts complex affidavits, tracks MCA compliance revisions, and acts as the liaison with Registrars (RTAs) and bank managers. We ensure that our dossiers are audit-ready before submission, keeping rejections to an absolute minimum.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <span className="text-xs font-bold text-white">
                30+ Years of Indian Capital Market Consulting
              </span>
            </div>
          </div>
        </div>

        {/* Career Timeline */}
        <div className="bg-[#17303B] border border-slate-700/70 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Our Journey</span>
            <h2 className="font-roboto text-2xl font-bold text-white">Professional Career Timeline</h2>
            <div className="w-12 h-[3px] bg-[#D4AF37] mx-auto rounded-full"></div>
          </div>

          <div className="relative border-l-2 border-[#D4AF37]/40 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8 py-2">
            <div className="relative">
              {/* Circle dot marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#17303B] border-2 border-[#D4AF37] flex items-center justify-center shadow">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#D4AF37] font-mono">1996 – 2018</span>
                <h4 className="font-roboto text-base font-bold text-white">Share Market Broker</h4>
                <p className="text-slate-300 text-xs leading-relaxed max-w-3xl">
                  Managed Corporate, HNI, Retails clients. Built strong relationships and developed deep expertise in risk management, stock market dynamics, and corporate registry analysis in Pune.
                </p>
              </div>
            </div>

            <div className="relative">
              {/* Circle dot marker */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#17303B] border-2 border-[#D4AF37] flex items-center justify-center shadow">
                <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#D4AF37] font-mono">2018 – PRESENT</span>
                <h4 className="font-roboto text-base font-bold text-white">Independent Financial Consultant & Founder</h4>
                <p className="text-slate-300 text-xs leading-relaxed max-w-3xl">
                  Established an independent consulting practice specializing in IEPF claim processing, demat account assistance, investment recovery, and personalized financial counselling. Led successful unclaimed share recoveries for over 1,000 clients across India.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="font-roboto text-2xl font-bold text-white">Our Operating Values</h2>
            <p className="text-slate-300 text-xs">
              Every documentation folder we compile is subject to core ethical coordinates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((val) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="bg-[#17303B] border border-slate-700/70 rounded-2xl p-6 shadow-lg space-y-3 hover:border-[#D4AF37] transition-all">
                  <div className="w-10 h-10 bg-[#D4AF37]/15 border border-[#D4AF37]/40 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <h4 className="font-roboto text-sm font-bold text-white">{val.title}</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regulatory Alert Banner */}
        <div className="bg-[#17303B] border border-slate-700/80 p-6 rounded-2xl max-w-4xl mx-auto flex items-start gap-4 shadow-xl">
          <Landmark className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Disclaimer & Transparency Commitment</h4>
            <p className="text-[10px] text-slate-300 leading-normal">
              KIRS (Kalavati Investment & Recovery Services) operates strictly as an independent consultancy and documentation assistance provider. We are not a government office and have no official affiliations with the IEPF Authority, SEBI, MCA, RBI, IRDA, or PFRDA. The service fees charged represent physical documentation drafts, record reviews, and procedural advisories.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
