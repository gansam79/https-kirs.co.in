import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, FileSpreadsheet, Hourglass, HelpCircle, CheckSquare, Award } from "lucide-react";
import { servicesData, Service } from "@/data/servicesData";
import { getBasePath } from "@/lib/basePath";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<Service[]>(servicesData);

  useEffect(() => {
    async function fetchServices() {
      try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}/api/services`);
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

  const filteredServices = services.filter((service) => {
    const query = searchQuery.toLowerCase();
    return (
      service.title.toLowerCase().includes(query) ||
      service.shortDesc.toLowerCase().includes(query) ||
      service.longDesc.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Complete Service Directory</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
            Financial Recovery Services & Special Desks
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Browse our full spectrum of 11 dedicated services and specialized desks covering IEPF Form filings, physical share dematerializations, bank deposits, insurance proceed claims, and Trademark e-filing.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search service name, lost shares, IEPF, trademark..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-secondary bg-white text-slate-800 shadow-sm transition-all"
          />
        </div>

        {/* Catalog Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-lg max-w-md mx-auto shadow-sm space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-350 mx-auto" />
            <h3 className="font-serif text-sm font-semibold text-slate-800">No Services Found</h3>
            <p className="text-slate-400 text-xs px-4">
              We couldn't find any services matching "{searchQuery}". Try searching for IEPF, shares, bank, or trademark.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={service.slug}
                className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded uppercase tracking-wider">
                      Service {index + 1}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {service.timeline}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-primary hover:text-secondary transition-colors">
                    <Link to={`/services/${service.slug}`}>{service.title}</Link>
                  </h3>

                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Eligibility Summary:</span>
                    <ul className="space-y-1">
                      {service.eligibility.slice(0, 2).map((item, i) => (
                        <li key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-secondary rounded-full"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-primary hover:text-secondary text-xs font-bold flex items-center gap-1 group transition-colors"
                  >
                    View Details & Checklist
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-secondary" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
