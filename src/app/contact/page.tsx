"use client";

import React from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import ScheduleForm from "@/components/layout/ScheduleForm";

const whatsappMessage = encodeURIComponent(
  "Hello KIRS Team, I would like to schedule a wealth recovery consultation. Please assist."
);

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Expert Consultation</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
            Schedule a Free Consultation Call
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-sm leading-relaxed">
            Connect with a senior relationship manager to evaluate your unclaimed shares, IEPF claims, and RTA discrepancies.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Office Coordinates & Contacts (Col span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-serif text-base font-bold text-primary">Direct Contact Channels</h3>
              
              <ul className="space-y-5 text-xs">
                <li className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-slate-800">Corporate Head Office</span>
                    <p className="text-slate-500 leading-relaxed">
                      33/1B/1, Dattanagar, Katraj,
                      <br />
                      Pune, Maharashtra, 411046, India
                    </p>
                  </div>
                </li>

                <li className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-secondary shrink-0" />
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-slate-800">Relationships Desk Hotline</span>
                    <a href="tel:+919823662901" className="text-slate-500 hover:text-primary transition-colors font-medium">
                      +91 98236 62901
                    </a>
                  </div>
                </li>

                <li className="flex gap-3 items-center">
                  <Mail className="w-5 h-5 text-secondary shrink-0" />
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-slate-800">Corporate Vetting Desk</span>
                    <a href="mailto:info@kirs.co.in" className="text-slate-500 hover:text-primary transition-colors font-medium">
                      info@kirs.co.in
                    </a>
                  </div>
                </li>

                <li className="flex gap-3 items-center">
                  <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                  <div className="space-y-0.5">
                    <span className="font-semibold block text-slate-800">Direct WhatsApp Advisory</span>
                    <a
                      href={`https://wa.me/919823662901?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 hover:text-primary transition-colors font-medium"
                    >
                      Click to Chat on WhatsApp
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Operating hours card */}
            <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-secondary">
                <Clock className="w-4.5 h-4.5" />
                <span className="text-xs font-semibold">Consultancy Working Hours</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Our RTA vetting desk and relationship managers operate from <strong>10:00 AM to 6:00 PM (IST)</strong>, Monday to Saturday. Calls booked outside working hours will be attended to on the next business day.
              </p>
            </div>

          </div>

          {/* Right Column: Active Scheduler Form (Col span 7) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm">
            <ScheduleForm compact={false} />
          </div>

        </div>

      </div>
    </div>
  );
}
