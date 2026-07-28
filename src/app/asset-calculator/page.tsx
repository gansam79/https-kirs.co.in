"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  TrendingUp,
  Award,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  PieChart as PieIcon,
  Layers,
  RefreshCw,
  Edit3
} from "lucide-react";
import {
  TOP_INDIAN_STOCKS,
  calculateUnclaimedAssetValue,
  fetchLiveStockPrice,
  formatINR,
  CalculationInput,
  CalculationResult
} from "@/data/assetCalculatorData";
import { getBasePath } from "@/lib/basePath";

export default function AssetCalculatorPage() {
  const [selectedStockId, setSelectedStockId] = useState<string>("wipro");
  const [shareCount, setShareCount] = useState<number>(100);
  const [purchaseDecade, setPurchaseDecade] = useState<"1980s" | "1990s" | "2000s" | "2010s">("1990s");
  const [unclaimedYears, setUnclaimedYears] = useState<number>(12);
  
  // Custom CMP override state
  const selectedStock = TOP_INDIAN_STOCKS.find((s) => s.id === selectedStockId) || TOP_INDIAN_STOCKS[0];
  const [customCmp, setCustomCmp] = useState<number>(selectedStock.cmp);
  const [isFetchingLive, setIsFetchingLive] = useState<boolean>(false);
  const [liveSuccessMsg, setLiveSuccessMsg] = useState<string>("");

  // Sync CMP when stock selection changes
  useEffect(() => {
    setCustomCmp(selectedStock.cmp);
    setLiveSuccessMsg("");
  }, [selectedStockId]);

  const handleFetchLivePrice = async () => {
    setIsFetchingLive(true);
    setLiveSuccessMsg("");
    const livePrice = await fetchLiveStockPrice(selectedStock.ticker);
    setIsFetchingLive(false);

    if (livePrice && livePrice > 0) {
      setCustomCmp(Math.round(livePrice * 100) / 100);
      setLiveSuccessMsg(`Updated with today's live market rate: ₹${livePrice.toFixed(2)}`);
    } else {
      setLiveSuccessMsg(`Using baseline market quote: ₹${selectedStock.cmp}`);
    }
  };

  const calculationResult: CalculationResult = useMemo(() => {
    const input: CalculationInput = {
      stockId: selectedStockId,
      originalShareCount: shareCount,
      purchaseDecade: purchaseDecade,
      unclaimedDividendYears: unclaimedYears,
      customCmp: customCmp
    };
    return calculateUnclaimedAssetValue(input);
  }, [selectedStockId, shareCount, purchaseDecade, unclaimedYears, customCmp]);

  // Inquiry submission state
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone || !leadForm.email) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const basePath = getBasePath();
      const response = await fetch(`${basePath}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "asset_calculator_inquiry",
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          stockName: calculationResult.stockName,
          originalShares: calculationResult.originalCount,
          expandedShares: calculationResult.expandedShareCount,
          cmpUsed: calculationResult.currentMarketPrice,
          estimatedTotalWealth: formatINR(calculationResult.grandTotalEstimatedWealth),
          notes: leadForm.notes
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit calculation audit inquiry.");

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-secondary/30 rounded-full px-4 py-1.5 text-xs text-[#D4AF37] font-medium">
            <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
            <span>Updated Daily • Real-Time Share Valuation Engine</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            Unclaimed Share & Dividend Value Estimator
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Calculate how historical stock splits, bonus share issues, and uncollected dividends have multiplied the value of your old paper certificates over decades with updated market prices.
          </p>
        </div>

        {/* Main Grid: Calculator Inputs vs. Live Valuation Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inputs Panel */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 text-primary">
              <Calculator className="w-5 h-5 text-secondary" />
              <h2 className="font-serif text-base font-bold">1. Input Portfolio Details</h2>
            </div>

            {/* Stock Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Company / Stock
              </label>
              <select
                value={selectedStockId}
                onChange={(e) => setSelectedStockId(e.target.value)}
                className="w-full text-xs p-3 border border-slate-250 rounded bg-slate-50 focus:bg-white focus:outline-none focus:border-secondary font-semibold text-slate-800"
              >
                {TOP_INDIAN_STOCKS.map((stk) => (
                  <option key={stk.id} value={stk.id}>
                    {stk.name} ({stk.ticker}) – Baseline Quote: ₹{stk.cmp}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400">
                Designated RTA: <strong className="text-slate-600">{selectedStock.rtaName}</strong>
              </p>
            </div>

            {/* Current Market Price (CMP) Editable Field */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-secondary" />
                  Today's Market Price (CMP)
                </label>
                <button
                  type="button"
                  onClick={handleFetchLivePrice}
                  disabled={isFetchingLive}
                  className="text-[10px] bg-slate-900 hover:bg-secondary hover:text-primary text-white font-bold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isFetchingLive ? "animate-spin" : ""}`} />
                  <span>{isFetchingLive ? "Fetching..." : "Fetch Live Rate"}</span>
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-500">₹</span>
                <input
                  type="number"
                  step="0.05"
                  value={customCmp}
                  onChange={(e) => setCustomCmp(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-slate-300 rounded focus:outline-none focus:border-secondary font-mono font-bold bg-white text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setCustomCmp(selectedStock.cmp)}
                  className="text-[10px] text-slate-400 hover:text-slate-700 underline shrink-0"
                >
                  Reset Default
                </button>
              </div>
              
              {liveSuccessMsg ? (
                <p className="text-[10px] text-emerald-600 font-semibold">{liveSuccessMsg}</p>
              ) : (
                <p className="text-[10px] text-slate-400">
                  Enter today's share rate or click "Fetch Live Rate" for real-time market updates.
                </p>
              )}
            </div>

            {/* Purchase Decade Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Approximate Year / Decade of Purchase
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["1980s", "1990s", "2000s", "2010s"] as const).map((dec) => (
                  <button
                    key={dec}
                    type="button"
                    onClick={() => setPurchaseDecade(dec)}
                    className={`py-2.5 px-2 rounded text-xs font-bold transition-all ${
                      purchaseDecade === dec
                        ? "bg-slate-900 text-secondary border border-secondary shadow-sm"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {dec}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 block mt-1">
                Historical Multiplier: <strong className="text-secondary">{calculationResult.splitBonusFactor}x Factor</strong>
              </span>
            </div>

            {/* Original Share Quantity Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Original Share Certificate Count
                </label>
                <span className="text-xs font-bold text-secondary font-mono">{shareCount} Shares</span>
              </div>
              <input
                type="range"
                min="10"
                max="2000"
                step="10"
                value={shareCount}
                onChange={(e) => setShareCount(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>10 Shares</span>
                <span>500 Shares</span>
                <span>2,000 Shares</span>
              </div>
            </div>

            {/* Missing Dividend Duration Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Unclaimed Dividend Duration
                </label>
                <span className="text-xs font-bold text-secondary font-mono">{unclaimedYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={unclaimedYears}
                onChange={(e) => setUnclaimedYears(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 Year</span>
                <span>7 Years (IEPF Transfer)</span>
                <span>25 Years</span>
              </div>
            </div>

            {/* Note box */}
            <div className="bg-amber-50 border border-amber-200 p-3.5 rounded text-[11px] text-amber-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Did you know?</span>
              </div>
              <p className="leading-relaxed text-[10.5px]">
                Under SEBI & MCA guidelines, dividends unclaimed for 7 consecutive years trigger mandatory transfer of underlying equity shares into the MCA IEPF Authority fund.
              </p>
            </div>
          </div>

          {/* Right Column: Live Valuation Results & SVG Visual Chart */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Metric Cards */}
            <div className="bg-primary text-white rounded-lg p-6 shadow-xl border border-secondary/30 relative overflow-hidden space-y-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
                    Today's Live Valuation Summary
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {calculationResult.stockName}
                  </h3>
                </div>
                <div className="bg-slate-900 border border-secondary/40 text-secondary text-xs font-mono font-bold px-3 py-1.5 rounded">
                  CMP: ₹{calculationResult.currentMarketPrice}
                </div>
              </div>

              {/* Big Grand Total Display */}
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">
                  Estimated Total Recoverable Wealth Today
                </span>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-secondary tracking-tight">
                  {formatINR(calculationResult.grandTotalEstimatedWealth)}
                </div>
                <p className="text-[11px] text-slate-300">
                  Includes current share market valuation at ₹{calculationResult.currentMarketPrice}/share + accumulated unclaimed dividend interest.
                </p>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Original Folio</span>
                  <span className="text-base font-bold font-mono text-white mt-1 block">
                    {calculationResult.originalCount} Shares
                  </span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Split/Bonus Expanded</span>
                  <span className="text-base font-bold font-mono text-secondary mt-1 block">
                    {calculationResult.expandedShareCount.toLocaleString("en-IN")} Shares
                  </span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Unclaimed Dividends</span>
                  <span className="text-base font-bold font-mono text-emerald-400 mt-1 block">
                    {formatINR(calculationResult.estimatedTotalUnclaimedDividends)}
                  </span>
                </div>
              </div>
            </div>

            {/* SVG Visual Graph Section */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="font-serif text-sm font-bold text-primary flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-secondary" />
                  Wealth Expansion Breakdown Graph
                </h4>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Compounding Projection</span>
              </div>

              {/* Interactive Visual Bar Representation */}
              <div className="space-y-3 pt-2">
                {calculationResult.chartData.map((item) => {
                  const pct = Math.min(100, Math.max(3, (item.value / calculationResult.grandTotalEstimatedWealth) * 100));
                  return (
                    <div key={item.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{item.label}</span>
                        <span className="font-mono">{formatINR(item.value)} ({pct.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden flex">
                        <div
                          className="h-full transition-all duration-500 rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: item.color }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Split & Corporate Action Notes */}
              <div className="bg-slate-50 border border-slate-200/80 p-4 rounded text-xs space-y-1 mt-4">
                <strong className="text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-secondary" />
                  Corporate Action History & Splitting Logic:
                </strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {calculationResult.historyNotes}
                </p>
              </div>
            </div>

            {/* Direct Verification Inquiry Form */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-primary border-b border-slate-100 pb-3">
                <ShieldCheck className="w-5 h-5 text-secondary" />
                <h4 className="font-serif text-sm font-bold">Request Official KIRS Audit & Recovery Verification</h4>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-lg text-center space-y-2">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h5 className="font-serif font-bold text-slate-800">Valuation Submission Received!</h5>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Our Senior RTA Auditor will cross-reference <strong>{calculationResult.stockName}</strong> registry folios for your estimated portfolio of <strong>{formatINR(calculationResult.grandTotalEstimatedWealth)}</strong> (CMP ₹{calculationResult.currentMarketPrice}) and call you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded text-xs">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-250 rounded focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-250 rounded focus:outline-none focus:border-secondary"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="Phone"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full text-xs p-2.5 border border-slate-250 rounded focus:outline-none focus:border-secondary"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary hover:bg-yellow-600 text-primary font-bold text-xs py-3 rounded uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow"
                  >
                    {loading ? "Submitting Audit Request..." : "Submit Valuation For Free Physical Folio Audit"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
