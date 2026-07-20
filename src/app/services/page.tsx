"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronRight, FileSpreadsheet, Hourglass, HelpCircle, CheckSquare, Award } from "lucide-react";
import { servicesData, Service } from "@/data/servicesData";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<Service[]>(servicesData);

  useEffect(() => {
    async function fetchServices() {
      try {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const response = await fetch(`${basePath}/api/services/`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setServices(data);
          }
        }
      } catch (err) {
        console.error("Failed to load services from database API:", err);
      }
    }
    fetchServices();
  }, []);

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.longDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Expert Guidance</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
            Our Wealth Recovery Services
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Choose from our 11 specialized areas of asset restoration, institutional special desks, and documentation consulting. We help clear mismatches and compile compliance files.
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic (e.g. signature, IEPF, death, RTA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-3 border border-slate-200 rounded-lg shadow-sm focus:outline-none focus:border-secondary focus:bg-white bg-white transition-all text-slate-700"
            />
          </div>
        </div>

        {/* Grid List */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-lg max-w-lg mx-auto shadow-sm space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-350 mx-auto" />
            <h3 className="font-serif text-sm font-semibold text-slate-800">No Services Found</h3>
            <p className="text-slate-400 text-xs px-4">
              We couldn't find matches for "{searchQuery}". Try searching general terms like "Demat", "Shares", "IEPF" or "Nominee".
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-[#b38728] font-semibold underline hover:text-primary transition-colors"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.slug}
                className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/5 border border-primary/10 rounded flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-primary">{service.title}</h3>
                      <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase flex items-center gap-1 mt-0.5">
                        <Hourglass className="w-3 h-3 text-secondary shrink-0" />
                        Timeline: {service.timeline.split(" ")[0]} {service.timeline.split(" ")[1] || ""}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Sneak peek checklists */}
                  <div className="pt-3 space-y-1.5 border-t border-slate-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Typical Requirements</span>
                    <ul className="space-y-1">
                      {service.documents.slice(0, 2).map((doc, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-500 truncate">
                          <CheckSquare className="w-3 h-3 text-secondary shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                      {service.documents.length > 2 && (
                        <li className="text-[9px] text-slate-400 font-semibold pl-4">
                          + {service.documents.length - 2} more document records
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 rounded-b-lg flex items-center justify-between">
                  <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-medium select-none">
                    Verified Advisory
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-primary hover:text-secondary font-bold text-xs flex items-center gap-0.5 group transition-all"
                  >
                    Examine Service
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regulatory disclaimer banner inside catalog */}
        <div className="bg-slate-100 border border-slate-200/80 rounded-lg p-6 max-w-4xl mx-auto flex items-start gap-4">
          <Award className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">Independent Consultancy Audit Services</h4>
            <p className="text-[10px] text-slate-500 leading-normal">
              All share retrieval and claim dossiers compiled by KIRS are subject to audit, verification, and legal clearance by respective Registrar Transfer Agents (RTAs) and the IEPF Authority. We assist in formatting, documentation, and follow-up stages under regulatory guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
