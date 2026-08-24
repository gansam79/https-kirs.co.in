"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, User, Bot, HelpCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitLeadForm } from "@/lib/apiSubmit";
import { getBasePath } from "@/lib/basePath";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isLeadForm?: boolean;
}

const PRESET_QUESTIONS = [
  { text: "How do I claim shares from IEPF?", key: "iepf" },
  { text: "What is required for share transmission?", key: "transmission" },
  { text: "Can NRIs recover unclaimed shares?", key: "nri" },
  { text: "My signature doesn't match. What do I do?", key: "signature" },
];

const BOT_RESPONSES: Record<string, string> = {
  iepf: `To recover shares or dividends from the Investor Education and Protection Fund (IEPF):
1. **Verification:** Confirm that your shares/dividends were actually transferred (usually after 7 consecutive years of being unclaimed).
2. **Form IEPF-5:** Submit an online claim application on the MCA portal.
3. **Physical Submission:** Submit physical verification documents (Indemnity Bond, Advance Receipt, Share Certificate details, KYC) to the company's Registrar and Transfer Agent (RTA).
4. **Processing Timeline:** It typically takes 6 to 9 months for regulatory approvals.

Would you like us to generate a document checklist or perform a free eligibility check?`,
  transmission: `Share transmission occurs when shares are transferred to a legal heir due to the death of the original holder:
- **With nomination:** Relatively simple. Submit the Death Certificate, KYC of the nominee, and a transmission request form.
- **Without nomination:** Requires a Succession Certificate, Letter of Administration, or Probate of Will, along with Indemnity Bonds and affidavits.

*Timeline: 3 to 6 months depending on document verification.* We assist with compiling the entire legal paperwork.`,
  nri: `Yes, NRIs have full rights to recover their unclaimed investments in India. However, the process requires special handling:
1. **KYC Updates:** Updating passport copies, overseas address details, and NRE/NRO bank accounts with the RTA.
2. **Attestation:** All foreign documents (power of attorney, affidavits, KYC) must be notarized or apostilled by the Indian Embassy in the residing country.
3. **Tax Clearances:** Ensuring correct taxation procedures for dividend payouts.

We have a dedicated NRI desk to handle embassy coordination.`,
  signature: `A signature mismatch is common for old physical shares. The process to correct it is:
1. **Form ISR-2:** Submit Form ISR-2 (RTA signature verification form) attested by your banker.
2. **Banker Verification:** Your bank manager must verify your current signature against their records, stating account details.
3. **Fresh KYC:** Submit updated PAN, Aadhaar, and client master list (CML) of your demat account.

We provide the exact drafted formats and coordinate bank verification steps.`,
  default: `Thank you for reaching out. We specialize in physical share recovery, IEPF claims, transmission processes, and KYC updates. 

To give you the most accurate advice, could you share your name and email so a dedicated relationship manager can analyze your case? (Or type your specific query below)`,
};

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Lead form states
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", query: "" });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    setMessages([
      {
        id: "welcome",
        sender: "bot",
        text: "Namaste! I am your KIRS Assistant. Recovering forgotten wealth can be complex. Ask me about IEPF claims, lost share certificates, transmission, signature updates, or NRI procedures.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string, isPreset = false) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      setIsTyping(false);
      let replyText = BOT_RESPONSES.default;
      
      if (isPreset) {
        const matchingKey = PRESET_QUESTIONS.find((q) => q.text === textToSend)?.key;
        if (matchingKey && BOT_RESPONSES[matchingKey]) {
          replyText = BOT_RESPONSES[matchingKey];
        }
      } else {
        // Simple keyword matcher
        const lower = textToSend.toLowerCase();
        if (lower.includes("iepf") || lower.includes("claim") || lower.includes("authority")) {
          replyText = BOT_RESPONSES.iepf;
        } else if (lower.includes("trans") || lower.includes("death") || lower.includes("heir") || lower.includes("nominee")) {
          replyText = BOT_RESPONSES.transmission;
        } else if (lower.includes("nri") || lower.includes("abroad") || lower.includes("foreign")) {
          replyText = BOT_RESPONSES.nri;
        } else if (lower.includes("sign") || lower.includes("mismatch") || lower.includes("differ")) {
          replyText = BOT_RESPONSES.signature;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: replyText,
          timestamp: new Date(),
        },
      ]);

      // Prompt lead capture form after 2 exchanges
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
    }, 1200);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setIsTyping(true);
    try {
      await submitLeadForm({
        type: "ai_chat_assistant",
        name: formData.name,
        phone: formData.phone,
        notes: formData.query || "Inquiry via AI Chat Assistant",
      });
    } catch (err) {
      console.warn("Failed to push chat lead to database:", err);
    } finally {
      setIsTyping(false);
      setLeadSubmitted(true);
      setMessages((prev) => prev.filter((m) => m.id !== "lead-form"));
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "bot",
          text: `Thank you, ${formData.name}. Our case manager will review your notes ("${formData.query || "General recovery inquiry"}") and contact you at ${formData.phone} within 24 hours.`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans">
      {/* Mini Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="bg-primary hover:bg-slate-900 border border-secondary text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative group"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="w-6 h-6 text-secondary" />
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-xs py-1.5 px-3 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-800">
              Ask KIRS AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Box Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="bg-white border border-slate-200 rounded-lg shadow-2xl w-[92vw] sm:w-[400px] h-[520px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between border-b border-slate-800 select-none">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-secondary flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-secondary animate-pulse" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-white">KIRS Asset Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-success rounded-full"></span>
                    <span className="text-[10px] text-slate-400">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Compliance Note in Chat */}
            <div className="bg-amber-50 text-[10px] text-amber-800 px-3 py-1.5 border-b border-amber-100 text-center font-medium">
              Consultancy guidance only. Subject to regulatory audit.
            </div>

            {/* Message Pane */}
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

                  <div className="max-w-[75%] space-y-2">
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
                          className="w-full bg-secondary hover:bg-yellow-600 text-primary font-bold text-xs py-2 rounded transition-colors"
                        >
                          Request Free Advisory Call
                        </button>
                      </form>
                    ) : (
                      <div
                        className={`rounded-lg p-3 text-xs leading-relaxed shadow-sm whitespace-pre-line ${
                          msg.sender === "user"
                            ? "bg-primary text-white"
                            : "bg-white text-slate-700 border border-slate-200"
                        }`}
                      >
                        {msg.text}
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

            {/* Presets and Input */}
            <div className="p-3 bg-white border-t border-slate-100 space-y-2.5">
              {/* Presets if chat is starting or empty input */}
              {!input.trim() && messages.length <= 3 && (
                <div className="space-y-1.5 select-none">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    Select a topic to start:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_QUESTIONS.map((q) => (
                      <button
                        key={q.key}
                        onClick={() => handleSendMessage(q.text, true)}
                        className="text-[10px] bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium px-2.5 py-1 rounded-full text-left transition-colors"
                      >
                        {q.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input Field */}
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
                  className="bg-primary hover:bg-slate-900 border border-secondary text-white p-2.5 rounded transition-all flex items-center justify-center shrink-0"
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
