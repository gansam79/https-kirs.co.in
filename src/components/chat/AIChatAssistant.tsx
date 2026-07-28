"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, X, Send, User, Bot, HelpCircle, Loader2, Calculator, Search, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isLeadForm?: boolean;
  actionLinks?: { label: string; url: string; icon: string }[];
}

const PRESET_QUESTIONS = [
  { text: "Calculate my unclaimed share value", key: "calculator" },
  { text: "How do I claim shares from IEPF?", key: "iepf" },
  { text: "Find RTA address & contact for my stock", key: "rta" },
  { text: "What is required for share transmission?", key: "transmission" },
  { text: "Can NRIs recover unclaimed shares?", key: "nri" },
  { text: "My signature doesn't match. What do I do?", key: "signature" },
];

const BOT_RESPONSES: Record<string, { text: string; actionLinks?: { label: string; url: string; icon: string }[] }> = {
  calculator: {
    text: "You can use our interactive Unclaimed Asset & Share Value Estimator to calculate stock split multipliers (e.g. 100 shares becoming 100,000+ shares), accumulated dividends, and current market wealth today!",
    actionLinks: [
      { label: "Open Asset Calculator", url: "/asset-calculator", icon: "calculator" },
      { label: "Check Eligibility", url: "/eligibility-checker", icon: "check" }
    ]
  },
  rta: {
    text: "Use our interactive RTA & IEPF Search Directory to find official contact details, investor emails, head office addresses, and required SEBI forms (ISR-1, ISR-2, ISR-4) for 40+ top companies including Reliance, TCS, Wipro, Infosys, and HDFC Bank.",
    actionLinks: [
      { label: "Search RTA Directory", url: "/rta-directory", icon: "search" },
      { label: "RTA Doc Checklist", url: "/document-checklist", icon: "file" }
    ]
  },
  iepf: {
    text: `To recover shares or dividends from the Investor Education and Protection Fund (IEPF):
1. **Verification:** Confirm that your shares/dividends were actually transferred (after 7 consecutive years of being unclaimed).
2. **Form IEPF-5:** Submit an online claim application on the MCA portal.
3. **Physical Submission:** Submit physical verification documents (Indemnity Bond, Advance Receipt, Share Certificates, KYC) to the company RTA.
4. **Processing Timeline:** Typically 6 to 9 months for regulatory approvals.`,
    actionLinks: [
      { label: "View Recovery Roadmap", url: "/recovery-roadmap", icon: "roadmap" },
      { label: "Document Checklist", url: "/document-checklist", icon: "file" }
    ]
  },
  transmission: {
    text: `Share transmission occurs when shares are transferred to a legal heir due to the death of the original holder:
- **With nomination:** Death Certificate, KYC of nominee, and transmission request form.
- **Without nomination:** Requires a Succession Certificate / Letter of Administration / Probate of Will, along with Indemnity Bonds and affidavits.`,
    actionLinks: [
      { label: "Doc Checklist Generator", url: "/document-checklist", icon: "file" },
      { label: "Check Eligibility", url: "/eligibility-checker", icon: "check" }
    ]
  },
  nri: {
    text: `Yes, NRIs have full rights to recover their unclaimed investments in India:
1. **KYC Updates:** Updating passport copies, overseas address details, and NRE/NRO bank accounts with the RTA.
2. **Attestation:** Foreign documents (power of attorney, affidavits, KYC) must be notarized or apostilled by the Indian Embassy.
3. **Tax Clearances:** Ensuring correct taxation procedures for dividend payouts.`,
    actionLinks: [
      { label: "Schedule Free Advisory", url: "/contact", icon: "phone" }
    ]
  },
  signature: {
    text: `A signature mismatch is common for old physical shares. The process to correct it is:
1. **Form ISR-2:** Submit Form ISR-2 (RTA signature verification form) attested by your banker.
2. **Banker Verification:** Your bank manager verifies your current signature against their records.
3. **Fresh KYC:** Submit updated PAN, Aadhaar, and client master list (CML) of your demat account.`,
    actionLinks: [
      { label: "RTA Directory", url: "/rta-directory", icon: "search" },
      { label: "Download Checklist", url: "/document-checklist", icon: "file" }
    ]
  },
  default: {
    text: `Thank you for reaching out to KIRS. We specialize in physical share recovery, IEPF claims, transmission processes, stock split calculations, and KYC updates.

Feel free to explore our interactive tools below or type your question!`,
    actionLinks: [
      { label: "Asset Calculator", url: "/asset-calculator", icon: "calculator" },
      { label: "RTA Directory", url: "/rta-directory", icon: "search" },
      { label: "Eligibility Checker", url: "/eligibility-checker", icon: "check" }
    ]
  }
};

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", query: "" });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Namaste! I am your KIRS Financial Recovery Assistant. Ask me about IEPF claims, stock split multipliers, lost shares, RTA addresses, or NRI procedures.",
        timestamp: new Date(),
        actionLinks: [
          { label: "Unclaimed Asset Calculator", url: "/asset-calculator", icon: "calculator" },
          { label: "RTA Search Directory", url: "/rta-directory", icon: "search" },
          { label: "7-Step Recovery Roadmap", url: "/recovery-roadmap", icon: "roadmap" }
        ]
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string, isPreset = false) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let botResp = BOT_RESPONSES.default;
      
      if (isPreset) {
        const matchingKey = PRESET_QUESTIONS.find((q) => q.text === textToSend)?.key;
        if (matchingKey && BOT_RESPONSES[matchingKey]) {
          botResp = BOT_RESPONSES[matchingKey];
        }
      } else {
        const lower = textToSend.toLowerCase();
        if (lower.includes("calc") || lower.includes("value") || lower.includes("split") || lower.includes("worth")) {
          botResp = BOT_RESPONSES.calculator;
        } else if (lower.includes("rta") || lower.includes("karvy") || lower.includes("link intime") || lower.includes("address")) {
          botResp = BOT_RESPONSES.rta;
        } else if (lower.includes("iepf") || lower.includes("claim") || lower.includes("mca")) {
          botResp = BOT_RESPONSES.iepf;
        } else if (lower.includes("trans") || lower.includes("death") || lower.includes("heir") || lower.includes("nominee")) {
          botResp = BOT_RESPONSES.transmission;
        } else if (lower.includes("nri") || lower.includes("abroad") || lower.includes("foreign")) {
          botResp = BOT_RESPONSES.nri;
        } else if (lower.includes("sign") || lower.includes("mismatch") || lower.includes("differ")) {
          botResp = BOT_RESPONSES.signature;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: botResp.text,
          actionLinks: botResp.actionLinks,
          timestamp: new Date(),
        },
      ]);

      if (messages.length >= 2 && !leadSubmitted) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: "lead-form",
              sender: "bot",
              text: "Would you like a senior KIRS consultant to review your case? Share your contact info below.",
              timestamp: new Date(),
              isLeadForm: true,
            },
          ]);
        }, 1000);
      }
    }, 1000);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setLeadSubmitted(true);
      setMessages((prev) => prev.filter((m) => m.id !== "lead-form"));
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: `Thank you, ${formData.name}. Our case manager will review your notes ("${formData.query || "General recovery inquiry"}") and call you at ${formData.phone} within 24 hours.`,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-primary hover:bg-slate-900 border border-secondary text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative group cursor-pointer"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="w-6 h-6 text-secondary" />
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-800">
              Interactive KIRS AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="bg-white border border-slate-200 rounded-lg shadow-2xl w-[92vw] sm:w-[420px] h-[540px] flex flex-col overflow-hidden"
          >
            <div className="bg-primary px-4 py-3 flex items-center justify-between border-b border-slate-800 select-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-secondary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-secondary animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white">KIRS Interactive Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                    <span className="text-[10px] text-slate-400">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-amber-50 text-[10px] text-amber-800 px-3 py-1.5 border-b border-amber-100 text-center font-medium">
              Consultancy & documentation guidance. Subject to MCA/RTA review.
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "items-start"}`}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.sender === "user"
                        ? "bg-slate-200 border-slate-300"
                        : "bg-slate-900 border-secondary"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User className="w-3.5 h-3.5 text-slate-700" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-secondary" />
                    )}
                  </div>

                  <div className="max-w-[80%] space-y-2">
                    {msg.isLeadForm ? (
                      <form
                        onSubmit={handleLeadSubmit}
                        className="bg-white p-3.5 rounded border border-slate-200 shadow-md space-y-2.5"
                      >
                        <p className="text-xs text-slate-700 font-medium">{msg.text}</p>
                        <input
                          type="text"
                          placeholder="Your Full Name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full text-xs p-2 border border-slate-200 rounded focus:outline-none focus:border-secondary"
                        />
                        <input
                          type="tel"
                          placeholder="Mobile Number"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full text-xs p-2 border border-slate-200 rounded focus:outline-none focus:border-secondary"
                        />
                        <textarea
                          placeholder="Brief details of shares..."
                          value={formData.query}
                          onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                          className="w-full text-xs p-2 border border-slate-200 rounded focus:outline-none focus:border-secondary h-14 resize-none"
                        />
                        <button
                          type="submit"
                          className="w-full bg-secondary hover:bg-yellow-600 text-primary font-bold text-xs py-2 rounded transition-colors cursor-pointer"
                        >
                          Request Free Advisory Call
                        </button>
                      </form>
                    ) : (
                      <div className="space-y-2">
                        <div
                          className={`rounded-lg p-3 text-xs leading-relaxed shadow-sm whitespace-pre-line ${
                            msg.sender === "user"
                              ? "bg-primary text-white"
                              : "bg-white text-slate-700 border border-slate-200"
                          }`}
                        >
                          {msg.text}
                        </div>
                        {msg.actionLinks && msg.actionLinks.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {msg.actionLinks.map((act) => (
                              <Link
                                key={act.url}
                                to={act.url}
                                onClick={() => setIsOpen(false)}
                                className="text-[10px] bg-slate-900 hover:bg-secondary hover:text-primary text-white font-bold px-2.5 py-1 rounded transition-colors inline-flex items-center gap-1 border border-secondary/20"
                              >
                                {act.icon === "calculator" && <Calculator className="w-3 h-3 text-secondary" />}
                                {act.icon === "search" && <Search className="w-3 h-3 text-secondary" />}
                                {act.icon === "file" && <FileText className="w-3 h-3 text-secondary" />}
                                {act.icon === "check" && <CheckCircle2 className="w-3 h-3 text-secondary" />}
                                <span>{act.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-start">
                  <div className="w-7 h-7 rounded-full bg-slate-900 border border-secondary flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-secondary" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-lg px-3 py-2.5 flex items-center gap-1.5">
                    <Loader2 className="w-4 h-4 text-secondary animate-spin" />
                    <span className="text-[10px] text-slate-400">Assistant is writing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 bg-white border-t border-slate-100 space-y-2.5">
              {!input.trim() && messages.length <= 3 && (
                <div className="space-y-1.5 select-none">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    Interactive Quick Topics:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_QUESTIONS.map((q) => (
                      <button
                        key={q.key}
                        onClick={() => handleSendMessage(q.text, true)}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium px-2.5 py-1 rounded-full text-left transition-colors cursor-pointer"
                      >
                        {q.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about unclaimed shares..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                  className="flex-1 text-xs border border-slate-200 rounded px-3 py-2.5 focus:outline-none focus:border-secondary bg-slate-50 focus:bg-white transition-all"
                />
                <button
                  onClick={() => handleSendMessage(input)}
                  className="bg-primary hover:bg-slate-900 border border-secondary text-white p-2.5 rounded transition-all flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4 text-secondary" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
