import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  FileCheck,
  CheckCircle,
  Clock,
  HelpCircle,
  ChevronDown,
  AlertCircle,
  CalendarRange
} from "lucide-react";
import { servicesData, Service } from "@/data/servicesData";
import { FaqSchema, BreadcrumbSchema } from "@/components/layout/JsonLd";
import DownloadButton from "./DownloadButton";
import ScheduleForm from "@/components/layout/ScheduleForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const faqItems = service.faqs;
  const breadcrumbItems = [
    { name: "Home", item: "https://https-kirs.co.in" },
    { name: "Services", item: "https://https-kirs.co.in/services" },
    { name: service.title, item: `https://https-kirs.co.in/services/${service.slug}` }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <FaqSchema faqs={faqItems} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link & Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-primary text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Services
          </Link>
          <div className="text-[10px] text-slate-400 font-medium select-none">
            Services / <span className="text-slate-600">{service.title}</span>
          </div>
        </div>

        {/* Hero Section of Service */}
        <div className="bg-primary text-white rounded-lg p-6 sm:p-10 border border-slate-800 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 blur-2xl rounded-full"></div>
          <div className="relative z-10 space-y-4 max-w-3xl">
            <span className="text-[10px] bg-secondary/20 text-secondary border border-secondary/30 font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              Service Overview
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {service.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {service.longDesc}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-350">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                <span>Processing timeline: <strong>{service.timeline}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-350">
                <FileCheck className="w-4 h-4 text-secondary shrink-0" />
                <span>Audited document checklists ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left 2 Columns: Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Eligibility Criteria */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
              <h2 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
                <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                Who is Eligible to Claim?
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                RTAs enforce strict checks. Confirm if you fit one of these parameters before starting documentation:
              </p>
              <ul className="space-y-3 pt-2">
                {service.eligibility.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-700 leading-normal">
                    <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Custom Document Requirements Checklist */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <h2 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                  Required Document List
                </h2>
                {/* <DownloadButton /> */}
              </div>
              <p className="text-slate-500 text-xs">
                Make sure you compile high-resolution, self-attested copies of the following documents:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {service.documents.map((doc, idx) => (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded border border-slate-200/60 flex items-start gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 font-medium leading-tight">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Service specific FAQ Accordion */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
              <h2 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
                <span className="w-1.5 h-6 bg-secondary rounded-full"></span>
                Service Frequently Asked Questions
              </h2>
              <div className="space-y-3 pt-2">
                {service.faqs.map((faq, idx) => (
                  <details key={idx} className="border border-slate-200 rounded group transition-all">
                    <summary className="w-full text-left px-4 py-3 bg-slate-50/50 hover:bg-slate-50 cursor-pointer flex items-center justify-between font-semibold text-xs text-primary list-none [&::-webkit-details-marker]:hidden">
                      <span>{faq.question}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 py-3 bg-white text-xs text-slate-550 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Lead Sidebar & Sticky Disclaimer */}
          <div className="space-y-6">
                        {/* Quick Consultancy Query Form (Replaced with common ScheduleForm component) */}
             <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200 space-y-4">
               <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                 <CalendarRange className="w-5 h-5 text-secondary" />
                 <h3 className="font-serif text-base font-bold text-primary">Schedule Expert Call</h3>
               </div>
               <ScheduleForm defaultService={service.title} compact={true} />
             </div>

            {/* Compliance details sidebar */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-800">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-700" />
                <span className="text-xs font-semibold">Regulatory Integrity Notice</span>
              </div>
              <p className="text-[10px] text-amber-700 leading-relaxed">
                KIRS represents clients as independent consultancy document draftsmen. All final share retrievals, duplicate certificate distributions, and IEPF claim orders must undergo regulatory audit check, approval, and release by company offices, transfer agents, and central administrators. We do not issue guarantees of official regulatory approval.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}
