"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, RefreshCw, BarChart2, Activity, Info } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  isUp: boolean;
  history: number[];
  high: number;
  low: number;
  volume: string;
}

interface IndexData {
  name: string;
  value: number;
  change: number;
  isUp: boolean;
  history: number[];
}

export default function MarketWatch() {
  const [activeTab, setActiveTab] = useState<"indices" | "shares" | "iepf">("indices");
  const [selectedIdx, setSelectedIdx] = useState<number>(0); // Selected index for detail graph

  // Simulated live index data
  const [indices, setIndices] = useState<IndexData[]>([
    {
      name: "NIFTY 50",
      value: 23501.10,
      change: 1.15,
      isUp: true,
      history: [23380, 23410, 23395, 23430, 23460, 23440, 23475, 23510, 23490, 23505, 23485, 23501.10]
    },
    {
      name: "SENSEX",
      value: 77301.15,
      change: 0.89,
      isUp: true,
      history: [76950, 77050, 77010, 77120, 77180, 77140, 77220, 77290, 77240, 77310, 77280, 77301.15]
    },
    {
      name: "NIFTY BANK",
      value: 51205.40,
      change: 1.45,
      isUp: true,
      history: [50850, 50920, 50880, 51010, 51100, 51050, 51150, 51220, 51180, 51230, 51190, 51205.40]
    },
    {
      name: "NIFTY IT",
      value: 36120.80,
      change: -0.42,
      isUp: false,
      history: [36350, 36310, 36290, 36240, 36190, 36220, 36150, 36180, 36140, 36110, 36150, 36120.80]
    }
  ]);

  // Simulated live nifty share data
  const [shares, setShares] = useState<Stock[]>([
    { symbol: "RELIANCE", name: "Reliance Industries Ltd", price: 2950.40, change: 0.72, isUp: true, history: [2920, 2935, 2942, 2950.40], high: 2965.00, low: 2915.20, volume: "4.2M" },
    { symbol: "TCS", name: "Tata Consultancy Services Ltd", price: 3850.10, change: -0.35, isUp: false, history: [3880, 3865, 3872, 3850.10], high: 3892.40, low: 3842.00, volume: "1.8M" },
    { symbol: "HDFCBANK", name: "HDFC Bank Ltd", price: 1620.25, change: 1.05, isUp: true, history: [1602, 1610, 1614, 1620.25], high: 1628.95, low: 1598.00, volume: "8.5M" },
    { symbol: "INFY", name: "Infosys Ltd", price: 1510.80, change: 1.42, isUp: true, history: [1485, 1492, 1501, 1510.80], high: 1518.00, low: 1482.10, volume: "3.1M" },
    { symbol: "ITC", name: "ITC Ltd", price: 430.50, change: 0.22, isUp: true, history: [428, 429, 431, 430.50], high: 434.20, low: 426.85, volume: "6.9M" },
    { symbol: "ICICIBANK", name: "ICICI Bank Ltd", price: 1115.60, change: 1.82, isUp: true, history: [1092, 1101, 1108, 1115.60], high: 1122.00, low: 1090.55, volume: "5.4M" },
    { symbol: "LT", name: "Larsen & Toubro Ltd", price: 3540.20, change: 0.95, isUp: true, history: [3505, 3518, 3532, 3540.20], high: 3562.00, low: 3500.00, volume: "1.2M" },
    { symbol: "SBIN", name: "State Bank of India", price: 835.45, change: -0.62, isUp: false, history: [842, 839, 841, 835.45], high: 846.80, low: 831.00, volume: "9.1M" }
  ]);

  // Simulated IEPF claim benchmarks (Wealth recovery details)
  const iepfWealth = [
    { company: "Reliance Industries", estimatedUnclaimed: "₹520+ Crores", avgRecoveryPeriod: "5-7 Months", difficulty: "Medium", type: "Dividends & Shares" },
    { company: "Tata Motors", estimatedUnclaimed: "₹310+ Crores", avgRecoveryPeriod: "6-8 Months", difficulty: "High", type: "Physical Certificates" },
    { company: "ITC Limited", estimatedUnclaimed: "₹480+ Crores", avgRecoveryPeriod: "4-6 Months", difficulty: "Low", type: "Unclaimed Dividends" },
    { company: "Hindustan Unilever", estimatedUnclaimed: "₹290+ Crores", avgRecoveryPeriod: "5-6 Months", difficulty: "Medium", type: "Name Mismatch Shares" },
    { company: "Infosys Limited", estimatedUnclaimed: "₹180+ Crores", avgRecoveryPeriod: "4-5 Months", difficulty: "Low", type: "Demat Transmission" }
  ];

  // Perform live fluctuations on index values and share prices
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Update Indices
      setIndices(prevIdxs => 
        prevIdxs.map(idx => {
          const changePercent = (Math.random() - 0.5) * 0.06; // +/- 0.03%
          const delta = idx.value * (changePercent / 100);
          const newValue = idx.value + delta;
          const newChange = idx.change + (changePercent * 0.5);
          const isUp = newChange >= 0;
          
          // Update history
          const newHistory = [...idx.history.slice(1), newValue];

          return {
            ...idx,
            value: newValue,
            change: newChange,
            isUp,
            history: newHistory
          };
        })
      );

      // 2. Update Shares
      setShares(prevShares =>
        prevShares.map(stock => {
          const changePercent = (Math.random() - 0.5) * 0.09; // +/- 0.045%
          const delta = stock.price * (changePercent / 100);
          const newPrice = stock.price + delta;
          const newChange = stock.change + (changePercent * 0.6);
          const isUp = newChange >= 0;
          
          // Adjust high/low bounds
          const high = newPrice > stock.high ? newPrice : stock.high;
          const low = newPrice < stock.low ? newPrice : stock.low;
          const newHistory = [...stock.history.slice(1), newPrice];

          return {
            ...stock,
            price: newPrice,
            change: newChange,
            isUp,
            high,
            low,
            history: newHistory
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // helper to draw sparkline path inside SVG
  const drawSparkline = (data: number[], width: number, height: number) => {
    if (data.length < 2) return "";
    const min = Math.min(...data);
    const max = Math.max(...data);
    const spread = max - min === 0 ? 1 : max - min;
    
    return data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / spread) * (height - 4) - 2;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  };

  // helper to draw main interactive graph with spline coordinates
  const renderInteractiveChart = (data: number[]) => {
    const width = 500;
    const height = 180;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const spread = max - min === 0 ? 1 : max - min;

    const coords = data.map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / spread) * (height - 20) - 10;
      return { x, y };
    });

    const linePath = coords.map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`).join(" ");
    const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

    return { linePath, areaPath, coords };
  };

  const selectedIndex = indices[selectedIdx];
  const chartData = renderInteractiveChart(selectedIndex.history);

  return (
    <div className="glass-panel-dark border border-secondary/20 rounded-xl overflow-hidden shadow-2xl bg-slate-900/60 p-4 sm:p-6 w-full text-left">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-secondary animate-pulse" />
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Live Market Intelligence Desk</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
            Indian Equity & Indices Tracker
          </h3>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-full px-3 py-1.5 text-[10px] text-slate-400 font-medium">
          <RefreshCw className="w-3 h-3 text-secondary animate-spin-slow" />
          <span>Real-time Tick Data Sync</span>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex gap-2 border-b border-slate-800/80 my-4 overflow-x-auto scrollbar-none pb-2">
        <button
          onClick={() => setActiveTab("indices")}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
            activeTab === "indices"
              ? "bg-secondary text-primary font-bold shadow-md shadow-secondary/15"
              : "text-slate-400 hover:text-white bg-slate-950/40 border border-slate-800"
          }`}
        >
          Indices Dashboard
        </button>
        <button
          onClick={() => setActiveTab("shares")}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
            activeTab === "shares"
              ? "bg-secondary text-primary font-bold shadow-md shadow-secondary/15"
              : "text-slate-400 hover:text-white bg-slate-950/40 border border-slate-800"
          }`}
        >
          Active Nifty Shares
        </button>
        <button
          onClick={() => setActiveTab("iepf")}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap ${
            activeTab === "iepf"
              ? "bg-secondary text-primary font-bold shadow-md shadow-secondary/15"
              : "text-slate-400 hover:text-white bg-slate-950/40 border border-slate-800"
          }`}
        >
          IEPF Claim Benchmarks
        </button>
      </div>

      {/* TAB 1: INDICES DASHBOARD */}
      {activeTab === "indices" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Indices Cards List (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {indices.map((idx, index) => (
              <div
                key={idx.name}
                onClick={() => setSelectedIdx(index)}
                className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                  selectedIdx === index
                    ? "bg-slate-950/80 border-secondary shadow-lg shadow-secondary/5"
                    : "bg-slate-950/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{idx.name}</h4>
                    <div className="text-xl font-bold text-white mt-1">
                      {idx.value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${
                      idx.isUp
                        ? "bg-success/10 text-success border-success/30"
                        : "bg-danger/10 text-danger border-danger/30"
                    }`}
                  >
                    {idx.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {idx.isUp ? "+" : ""}
                    {idx.change.toFixed(2)}%
                  </span>
                </div>

                {/* mini sparkline */}
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-[9px] text-slate-500">Live Trend</span>
                  <svg className="w-32 h-6" viewBox="0 0 120 20">
                    <path
                      d={drawSparkline(idx.history, 120, 20)}
                      fill="none"
                      stroke={idx.isUp ? "#10B981" : "#EF4444"}
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Graph (Right) */}
          <div className="lg:col-span-7 bg-slate-950/65 rounded-lg border border-slate-800 p-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">Visual Trend Chart</span>
                  <h4 className="text-lg font-serif font-semibold text-white">{selectedIndex.name} Real-time Performance</h4>
                </div>
                <div className="text-right">
                  <div className="text-lg font-mono font-bold text-white">
                    {selectedIndex.value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <span className={`text-xs font-bold ${selectedIndex.isUp ? "text-success" : "text-danger"}`}>
                    {selectedIndex.isUp ? "▲" : "▼"} {selectedIndex.isUp ? "+" : ""}
                    {selectedIndex.change.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="w-full h-[2px] bg-slate-900 my-3"></div>
            </div>

            {/* Glowing Chart Canvas */}
            <div className="relative py-4 flex justify-center items-center">
              <svg className="w-full h-44 overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeDasharray="3,3" />
                <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.03)" strokeDasharray="3,3" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.03)" strokeDasharray="3,3" />

                {/* Fill Area Gradient */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={selectedIndex.isUp ? "#10B981" : "#EF4444"} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={selectedIndex.isUp ? "#10B981" : "#EF4444"} stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area under chart */}
                <path d={chartData.areaPath} fill="url(#chartGradient)" />

                {/* Glowing Chart Line */}
                <path
                  d={chartData.linePath}
                  fill="none"
                  stroke={selectedIndex.isUp ? "#10B981" : "#EF4444"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    filter: `drop-shadow(0px 4px 10px ${selectedIndex.isUp ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"})`
                  }}
                />

                {/* Last point pulsating dot */}
                {chartData.coords.length > 0 && (
                  <circle
                    cx={chartData.coords[chartData.coords.length - 1].x}
                    cy={chartData.coords[chartData.coords.length - 1].y}
                    r="4"
                    fill={selectedIndex.isUp ? "#10B981" : "#EF4444"}
                    className="animate-ping"
                    style={{ transformOrigin: `${chartData.coords[chartData.coords.length - 1].x}px ${chartData.coords[chartData.coords.length - 1].y}px` }}
                  />
                )}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-slate-900">
              <span>Timeframe: Today (Tick Frequency 4s)</span>
              <span>All indices values updated live</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE NIFTY SHARES */}
      {activeTab === "shares" && (
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-widest">
                <th className="pb-3 font-semibold">Symbol</th>
                <th className="pb-3 font-semibold">Company Name</th>
                <th className="pb-3 font-semibold text-right">Price</th>
                <th className="pb-3 font-semibold text-right">Change</th>
                <th className="pb-3 font-semibold text-center hidden md:table-cell">Today's Range (High/Low)</th>
                <th className="pb-3 font-semibold text-right hidden sm:table-cell">Volume</th>
                <th className="pb-3 font-semibold text-center">Sparkline</th>
              </tr>
            </thead>
            <tbody>
              {shares.map(stock => (
                <tr key={stock.symbol} className="border-b border-slate-800/60 hover:bg-slate-950/20 transition-colors">
                  <td className="py-3 font-mono font-bold text-white">{stock.symbol}</td>
                  <td className="py-3 text-slate-300 font-light max-w-[150px] sm:max-w-none truncate">{stock.name}</td>
                  <td className="py-3 text-right font-mono font-semibold text-white">
                    ₹{stock.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-right font-mono font-bold">
                    <span className={`inline-flex items-center gap-1 ${stock.isUp ? "text-success" : "text-danger"}`}>
                      {stock.isUp ? "+" : ""}
                      {stock.change.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-3 text-center hidden md:table-cell font-mono text-[10px] text-slate-400">
                    ₹{stock.low.toFixed(2)} - ₹{stock.high.toFixed(2)}
                  </td>
                  <td className="py-3 text-right hidden sm:table-cell font-mono text-slate-400">{stock.volume}</td>
                  <td className="py-3 text-center flex justify-center items-center">
                    <svg className="w-20 h-5 overflow-visible" viewBox="0 0 80 20">
                      <path
                        d={drawSparkline(stock.history, 80, 20)}
                        fill="none"
                        stroke={stock.isUp ? "#10B981" : "#EF4444"}
                        strokeWidth="1.2"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-slate-500 mt-4 italic flex items-center gap-1">
            <Info className="w-3 h-3 text-secondary" />
            These figures demonstrate live Nifty shares frequently verified in legal transmission audits.
          </p>
        </div>
      )}

      {/* TAB 3: IEPF ASSET TRACKER */}
      {activeTab === "iepf" && (
        <div className="pt-2">
          <div className="bg-slate-950/40 p-4 rounded border border-slate-800/80 mb-6 flex items-start gap-3">
            <BarChart2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white font-serif">IEPF Share Recovery Industry Benchmarks</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Over ₹50,000+ Crores of unclaimed dividends and physical share certificates remain with the IEPF Authority. Below are recovery benchmarks for top organizations based on our historical legal filings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {iepfWealth.map(item => (
              <div key={item.company} className="p-4 rounded-lg bg-slate-950/50 border border-slate-800 hover:border-slate-700/80 transition-colors">
                <div className="flex justify-between items-start">
                  <h4 className="font-serif text-sm font-semibold text-white">{item.company}</h4>
                  <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider">Unclaimed Target</span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-900/80 text-[10px] sm:text-xs">
                  <div>
                    <span className="text-slate-500 uppercase tracking-widest text-[9px] block">Est. Market Pool</span>
                    <span className="text-white font-bold block mt-0.5">{item.estimatedUnclaimed}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase tracking-widest text-[9px] block">Avg. Audit Time</span>
                    <span className="text-white font-bold block mt-0.5">{item.avgRecoveryPeriod}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase tracking-widest text-[9px] block">RTA Audit Difficulty</span>
                    <span className={`font-bold block mt-0.5 ${
                      item.difficulty === "Low" ? "text-success" : item.difficulty === "Medium" ? "text-[#D4AF37]" : "text-danger"
                    }`}>{item.difficulty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
