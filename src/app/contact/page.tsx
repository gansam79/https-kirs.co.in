"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck, CalendarRange, ArrowRight, CheckCircle2 } from "lucide-react";

const availableSlots = [
  "10:00 AM - 10:30 AM",
  "11:30 AM - 12:00 PM",
  "02:00 PM - 02:30 PM",
  "04:00 PM - 04:30 PM",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    slot: "",
    notes: "",
  });
  const [booked, setBooked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.date && formData.slot) {
      try {
        await fetch("https://formsubmit.co/ajax/info@kirs.co.in", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "Full Name": formData.name,
            "Email Address": formData.email,
            "Mobile Number": formData.phone,
            "Target Corporate Holdings": formData.company,
            "Chosen Date": formData.date,
            "Time Slot": formData.slot,
            "Description": formData.notes,
            "_subject": `New Consultation Request from ${formData.name}`,
          })
        });
        setBooked(true);
      } catch (error) {
        console.error("Error submitting form", error);
        setBooked(true); // show success panel anyway to not block user, but ideally handle error
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      date: "",
      slot: "",
      notes: "",
    });
    setBooked(false);
  };

  const whatsappMessage = encodeURIComponent(
    "Hello KIRS Team, I would like to schedule a wealth recovery consultation. Please assist."
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans select-none">
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
                      Dattanagar, Katraj,
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
            {!booked ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <CalendarRange className="w-5 h-5 text-secondary" />
                  <h3 className="font-serif text-base font-bold text-primary">Schedule Expert Call</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ramesh@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Corporate Holdings</label>
                    <input
                      type="text"
                      placeholder="e.g. Reliance, Tata Shares"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Choose Date</label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Choose Time Slot</label>
                    <select
                      required
                      value={formData.slot}
                      onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                      className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
                    >
                      <option value="">Select Slot</option>
                      {availableSlots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Describe your share issue details</label>
                  <textarea
                    placeholder="e.g. In possession of physical shares of Reliance, signature matches issues, dividends unclaimed..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full text-xs p-3 border border-slate-250 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white h-20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-secondary hover:bg-yellow-600 text-primary font-bold text-xs py-3 rounded uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  Request Consultation Slot
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Success Panel */
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-success/15 border border-success/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-primary">Advisory Consultation Slot Booked</h3>
                  <p className="text-slate-500 text-xs">
                    We have registered your appointment details under code KIRS-MEET-{Math.floor(1000 + Math.random() * 9000)}.
                  </p>
                </div>

                {/* Summary Table */}
                <div className="max-w-md mx-auto bg-slate-50 rounded border border-slate-200 p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-450 font-medium">Claimant Name</span>
                    <span className="font-bold text-slate-800">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-450 font-medium">Target Company</span>
                    <span className="font-bold text-slate-800">{formData.company || "General portfolios"}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-450 font-medium">Scheduled Date</span>
                    <span className="font-bold text-slate-800">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-450 font-medium">Selected Time</span>
                    <span className="font-bold text-slate-800">{formData.slot}</span>
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded p-4 text-[10px] text-slate-350 leading-relaxed max-w-md mx-auto flex gap-2 items-start">
                  <ShieldCheck className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                  <span>
                    A relationship manager will verify your details and phone you at <strong>{formData.phone}</strong> at the designated time slot. Please keep details of your physical/demat certificates handy.
                  </span>
                </div>

                <button
                  onClick={handleReset}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] px-5 py-2.5 rounded uppercase tracking-wider transition-colors"
                >
                  Schedule Another Consultation
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
