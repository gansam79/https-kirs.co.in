"use client";

import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Building,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ShieldCheck,
  FileText,
  Clock,
  Filter,
  X,
  CheckCircle,
  HelpCircle,
  Download
} from "lucide-react";
import { RTA_DIRECTORY_DATA, searchRTADirectory, RTAEntry } from "@/data/rtaData";

export default function RtaDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [activeFormModal, setActiveFormModal] = useState<{
    formCode: string;
    formName: string;
    description: string;
  } | null>(null);

  const filteredRTAs = useMemo(() => {
    return searchRTADirectory({
      query: searchQuery,
      category: selectedCategory,
      city: selectedCity,
    });
  }, [searchQuery, selectedCategory, selectedCity]);

  const categories = ["All", "Equity RTA", "Mutual Fund RTA", "Corporate In-house Desk"];
  const cities = ["All", "Mumbai", "Hyderabad", "Chennai", "Kolkata", "New Delhi"];

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
            Capital Markets Registry Finder
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            RTA & IEPF Corporate Search Directory
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Locate official Registrar & Transfer Agents (RTAs) for Indian listed equities, mutual fund folios, and corporate registries. Access contact details, mandatory SEBI forms, and claim submission channels.
          </p>
        </div>

        {/* Interactive Search Controls Bar */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input Box */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by Company Name (e.g. Reliance, TCS), RTA Name, or City..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3 border border-slate-250 rounded bg-slate-50 focus:bg-white focus:outline-none focus:border-secondary text-slate-800"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs p-3 border border-slate-250 rounded bg-slate-50 focus:bg-white focus:outline-none focus:border-secondary text-slate-700 font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    Category: {c}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-xs p-3 border border-slate-250 rounded bg-slate-50 focus:bg-white focus:outline-none focus:border-secondary text-slate-700 font-medium"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    City: {city}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex flex-wrap justify-between items-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>
              Showing <strong>{filteredRTAs.length}</strong> Registrars / Search Results
            </span>
            {(searchQuery || selectedCategory !== "All" || selectedCity !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedCity("All");
                }}
                className="text-secondary hover:underline font-semibold flex items-center gap-1 text-[11px]"
              >
                <X className="w-3.5 h-3.5" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Directory Results Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredRTAs.map((rta) => (
            <div
              key={rta.id}
              className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[9px] bg-slate-100 text-slate-700 font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {rta.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-primary">{rta.name}</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-medium shrink-0 bg-slate-50 p-1.5 rounded border border-slate-200">
                    SEBI: {rta.sebiRegNo}
                  </span>
                </div>

                {/* Serviced Companies */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Serviced Listed Companies / Folios
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {rta.servicedCompanies.map((comp) => (
                      <span
                        key={comp}
                        className="text-[11px] bg-amber-50 text-slate-800 border border-amber-200/60 px-2 py-0.5 rounded font-medium"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="flex gap-2 items-start">
                    <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-[11px] leading-normal">{rta.headOfficeAddress}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2 items-center">
                      <Mail className="w-4 h-4 text-secondary shrink-0" />
                      <a href={`mailto:${rta.investorEmail}`} className="text-primary hover:text-secondary text-[11px] font-medium transition-colors">
                        {rta.investorEmail}
                      </a>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Phone className="w-4 h-4 text-secondary shrink-0" />
                      <span className="text-slate-600 text-[11px]">{rta.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Mandatory SEBI Forms required */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Mandatory Compliance Forms Required
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {rta.mandatoryForms.map((form) => (
                      <button
                        key={form.formCode}
                        onClick={() => setActiveFormModal(form)}
                        className="text-[10px] bg-slate-900 text-white hover:bg-secondary hover:text-primary px-2.5 py-1 rounded transition-colors flex items-center gap-1 font-bold"
                      >
                        <FileText className="w-3 h-3 text-secondary" />
                        <span>{form.formCode}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  <span>Timeline: {rta.avgProcessingTimeline}</span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <a
                    href={rta.unclaimedSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary hover:bg-slate-900 text-white text-[11px] font-semibold px-4 py-2 rounded flex items-center justify-center gap-1.5 transition-colors w-full sm:w-auto"
                  >
                    <span>Unclaimed Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-secondary" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for SEBI Form explanation */}
        {activeFormModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block">
                    SEBI Standard Compliance Form
                  </span>
                  <h3 className="font-serif text-lg font-bold text-primary">{activeFormModal.formCode}</h3>
                </div>
                <button
                  onClick={() => setActiveFormModal(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800">{activeFormModal.formName}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeFormModal.description}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-3 rounded text-[11px] text-blue-900 space-y-1">
                <strong>KIRS Advisory Tip:</strong>
                <p>
                  Our legal team provides pre-formatted Word/PDF copies of {activeFormModal.formCode} fully compliant with SEBI circular guidelines.
                </p>
              </div>

              <div className="pt-2 flex justify-between gap-3">
                <button
                  onClick={() => setActiveFormModal(null)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 rounded transition-colors"
                >
                  Close
                </button>
                <Link
                  to="/document-checklist"
                  onClick={() => setActiveFormModal(null)}
                  className="w-full bg-secondary hover:bg-yellow-600 text-primary font-bold text-xs py-2.5 rounded text-center transition-colors block"
                >
                  Get Form Templates
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
