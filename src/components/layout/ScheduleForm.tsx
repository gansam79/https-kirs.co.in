import React, { useState } from "react";
import { CalendarRange, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { getBasePath } from "../../lib/basePath";

const availableSlots = [
  "10:00 AM - 10:30 AM",
  "11:30 AM - 12:00 PM",
  "02:00 PM - 02:30 PM",
  "04:00 PM - 04:30 PM",
];

const servicesList = [
  "IEPF Process Assistance",
  "Lost Shares & Mutual Fund Recovery",
  "Unclaimed Bank & NBFC Deposit Recovery",
  "Unclaimed Insurance Recovery",
  "Unclaimed Pension & Retirement Benefits Recovery",
  "Transmission of Shares",
  "NRI Share Recovery",
  "Other / General Inquiry"
];

interface ScheduleFormProps {
  defaultService?: string;
  compact?: boolean;
}

export default function ScheduleForm({ defaultService = "", compact = false }: ScheduleFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService || "",
    company: "",
    date: "",
    slot: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingCode, setBookingCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setLoading(true);
      setErrorMsg("");
      try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}/api/contact`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to save consultation request.");
        }

        setBookingCode(`KIRS-MEET-${Math.floor(1000 + Math.random() * 9000)}`);
        setBooked(true);
      } catch (error: any) {
        console.error("Error submitting form", error);
        setErrorMsg(error.message || "Failed to book slot. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: defaultService || "",
      company: "",
      date: "",
      slot: "",
      notes: "",
    });
    setBooked(false);
    setErrorMsg("");
  };

  if (booked) {
    return (
      <div className="text-center py-6 space-y-6">
        <div className="w-14 h-14 bg-success/15 border border-success/20 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7 text-[#10B981]" />
        </div>
        
        <div className="space-y-1.5 px-4">
          <h3 className="font-serif text-base sm:text-lg font-bold text-primary">Advisory Consultation Booked</h3>
          <p className="text-slate-500 text-xs">
            We have registered your details under appointment code <strong className="text-primary font-mono">{bookingCode}</strong>.
          </p>
        </div>

        {/* Summary Table */}
        <div className="max-w-md mx-auto bg-slate-50 rounded border border-slate-200 p-4 text-left text-xs space-y-2">
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-450 font-medium">Claimant Name</span>
            <span className="text-slate-800 font-bold">{formData.name}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-450 font-medium">Phone Number</span>
            <span className="text-slate-800 font-mono font-semibold">{formData.phone}</span>
          </div>
          {formData.email && (
            <div className="flex justify-between border-b border-slate-200 pb-1.5">
              <span className="text-slate-450 font-medium">Email</span>
              <span className="text-slate-800 font-medium">{formData.email}</span>
            </div>
          )}
          {formData.service && (
            <div className="flex justify-between border-b border-slate-200 pb-1.5">
              <span className="text-slate-450 font-medium">Service</span>
              <span className="text-slate-800 font-semibold text-secondary">{formData.service}</span>
            </div>
          )}
          {formData.company && (
            <div className="flex justify-between border-b border-slate-200 pb-1.5">
              <span className="text-slate-450 font-medium">Target Company</span>
              <span className="text-slate-800 font-medium">{formData.company}</span>
            </div>
          )}
          <div className="flex justify-between border-b border-slate-200 pb-1.5">
            <span className="text-slate-450 font-medium">Appointment Date</span>
            <span className="text-slate-800 font-semibold">{formData.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-450 font-medium">Time Slot</span>
            <span className="text-slate-800 font-semibold">{formData.slot}</span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-primary font-bold underline cursor-pointer"
        >
          Book Another consultation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {!compact && (
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <CalendarRange className="w-5 h-5 text-secondary" />
          <h3 className="font-serif text-base font-bold text-primary">Schedule Expert Call</h3>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs">
          {errorMsg}
        </div>
      )}

      <div className={`grid grid-cols-1 ${compact ? "" : "sm:grid-cols-2"} gap-4`}>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Name *</label>
          <input
            type="text"
            required
            placeholder="e.g. Ramesh Kumar"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full text-xs p-3 border border-slate-200 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
          />
        </div>
        
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Address *</label>
          <input
            type="email"
            required
            placeholder="e.g. ramesh@gmail.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full text-xs p-3 border border-slate-200 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      <div className={`grid grid-cols-1 ${compact ? "" : "sm:grid-cols-2"} gap-4`}>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mobile Number *</label>
          <input
            type="tel"
            required
            placeholder="e.g. +91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full text-xs p-3 border border-slate-200 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Select Service *</label>
          <select
            required
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full text-xs p-3 border border-slate-200 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white"
          >
            <option value="">Select Service</option>
            {servicesList.map((s) => (
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
          className={`w-full text-xs p-3 border border-slate-200 rounded focus:outline-none focus:border-secondary text-slate-800 bg-slate-50 focus:bg-white ${compact ? "h-20" : "h-24"} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-secondary hover:bg-yellow-600 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed text-primary font-bold text-xs py-3 rounded uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Booking Slot...
          </>
        ) : (
          <>
            Request Consultation Slot
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
