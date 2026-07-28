export interface StockData {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  cmp: number; // Current Market Price in INR (Default baseline)
  baseYear: number;
  splitBonusFactor1980s: number; // Multiplier if bought in 1980-1989
  splitBonusFactor1990s: number; // Multiplier if bought in 1990-1999
  splitBonusFactor2000s: number; // Multiplier if bought in 2000-2009
  splitBonusFactor2010s: number; // Multiplier if bought in 2010-2019
  avgAnnualDividendPerShare: number; // Estimated dividend per expanded share annually over last 10 yrs
  historyNotes: string;
  rtaName: string;
}

export const TOP_INDIAN_STOCKS: StockData[] = [
  {
    id: "wipro",
    name: "Wipro Limited",
    ticker: "WIPRO",
    sector: "Information Technology",
    cmp: 535,
    baseYear: 1980,
    splitBonusFactor1980s: 32768, // Famous Wipro 100 shares to 3.2+ Cr shares story
    splitBonusFactor1990s: 1024,
    splitBonusFactor2000s: 32,
    splitBonusFactor2010s: 4,
    avgAnnualDividendPerShare: 6.5,
    historyNotes: "Multiple 1:1, 2:1 bonus issues and 1:5 stock split in 1999. 100 shares in 1980 grew to over 3.2 Crore shares!",
    rtaName: "KFin Technologies Limited"
  },
  {
    id: "infosys",
    name: "Infosys Limited",
    ticker: "INFY",
    sector: "Information Technology",
    cmp: 1850,
    baseYear: 1993,
    splitBonusFactor1980s: 2048,
    splitBonusFactor1990s: 1024,
    splitBonusFactor2000s: 64,
    splitBonusFactor2010s: 8,
    avgAnnualDividendPerShare: 36,
    historyNotes: "Bonus issues in 1994, 1997, 1999, 2004, 2006, 2014, 2015, and 2018 (1:1). 100 IPO shares in 1993 became 102,400 shares.",
    rtaName: "KFin Technologies Limited"
  },
  {
    id: "reliance",
    name: "Reliance Industries Ltd",
    ticker: "RELIANCE",
    sector: "Oil, Gas & Energy / Telecom",
    cmp: 2950,
    baseYear: 1980,
    splitBonusFactor1980s: 128,
    splitBonusFactor1990s: 32,
    splitBonusFactor2000s: 16,
    splitBonusFactor2010s: 4,
    avgAnnualDividendPerShare: 10,
    historyNotes: "Bonus issues in 1983, 1997, 2009, 2017 (1:1), and Jio Financial Services demerger allotment in 2023.",
    rtaName: "KFin Technologies Limited"
  },
  {
    id: "tcs",
    name: "Tata Consultancy Services",
    ticker: "TCS",
    sector: "Information Technology",
    cmp: 4250,
    baseYear: 2004,
    splitBonusFactor1980s: 16,
    splitBonusFactor1990s: 16,
    splitBonusFactor2000s: 8,
    splitBonusFactor2010s: 2,
    avgAnnualDividendPerShare: 115,
    historyNotes: "IPO in 2004. 1:1 bonus issues in 2006, 2009, and 2018 alongside consistent high dividend payouts.",
    rtaName: "Link Intime India Pvt Ltd"
  },
  {
    id: "hdfcbank",
    name: "HDFC Bank Limited",
    ticker: "HDFCBANK",
    sector: "Banking & Financial Services",
    cmp: 1680,
    baseYear: 1995,
    splitBonusFactor1980s: 50,
    splitBonusFactor1990s: 50,
    splitBonusFactor2000s: 10,
    splitBonusFactor2010s: 2,
    avgAnnualDividendPerShare: 19.5,
    historyNotes: "Stock split from face value ₹10 to ₹2 in 2011 (1:5) and ₹2 to ₹1 in 2019 (1:2).",
    rtaName: "Datamatics / Dataintime / HDFC Direct Desk"
  },
  {
    id: "itc",
    name: "ITC Limited",
    ticker: "ITC",
    sector: "FMCG / Tobacco & Hotels",
    cmp: 475,
    baseYear: 1980,
    splitBonusFactor1980s: 288,
    splitBonusFactor1990s: 96,
    splitBonusFactor2000s: 24,
    splitBonusFactor2010s: 3,
    avgAnnualDividendPerShare: 14,
    historyNotes: "1:10 stock split in 2005 (FV ₹1) plus 1:1 bonus issues in 1980, 1989, 1991, 1994, 2005, 2010, 2016.",
    rtaName: "ITC In-house Share Department"
  },
  {
    id: "lnt",
    name: "Larsen & Toubro Ltd",
    ticker: "LT",
    sector: "Engineering & Infrastructure",
    cmp: 3620,
    baseYear: 1980,
    splitBonusFactor1980s: 96,
    splitBonusFactor1990s: 32,
    splitBonusFactor2000s: 12,
    splitBonusFactor2010s: 2,
    avgAnnualDividendPerShare: 32,
    historyNotes: "Bonus issues in 1986 (3:5), 2006 (1:1), 2008 (1:1), 2013 (1:2), 2017 (1:2). UltraTech Cement demerger.",
    rtaName: "KFin Technologies Limited"
  },
  {
    id: "tatamotors",
    name: "Tata Motors Limited",
    ticker: "TATAMOTORS",
    sector: "Automotive",
    cmp: 980,
    baseYear: 1980,
    splitBonusFactor1980s: 30,
    splitBonusFactor1990s: 15,
    splitBonusFactor2000s: 5,
    splitBonusFactor2010s: 1,
    avgAnnualDividendPerShare: 6,
    historyNotes: "Stock split from face value ₹10 to ₹2 in 2011 (1:5 split). Bonus issue in 1995 (3:5).",
    rtaName: "Link Intime India Pvt Ltd"
  },
  {
    id: "sbi",
    name: "State Bank of India",
    ticker: "SBIN",
    sector: "Banking & Financial Services",
    cmp: 840,
    baseYear: 1993,
    splitBonusFactor1980s: 10,
    splitBonusFactor1990s: 10,
    splitBonusFactor2000s: 10,
    splitBonusFactor2010s: 1,
    avgAnnualDividendPerShare: 13.7,
    historyNotes: "Stock split from face value ₹10 to ₹1 in 2014 (1:10 ratio multiplier).",
    rtaName: "Alankit Assignments Ltd"
  },
  {
    id: "asianpaints",
    name: "Asian Paints Limited",
    ticker: "ASIANPAINT",
    sector: "Consumer Durables / Paints",
    cmp: 2980,
    baseYear: 1982,
    splitBonusFactor1980s: 480,
    splitBonusFactor1990s: 120,
    splitBonusFactor2000s: 30,
    splitBonusFactor2010s: 10,
    avgAnnualDividendPerShare: 25.5,
    historyNotes: "Stock split in 2013 from FV ₹10 to ₹1 (1:10). Bonus issues in 1987, 1992, 1996, 2000, 2003.",
    rtaName: "Link Intime India Pvt Ltd"
  },
  {
    id: "hul",
    name: "Hindustan Unilever Ltd",
    ticker: "HINDUNILVR",
    sector: "FMCG",
    cmp: 2720,
    baseYear: 1980,
    splitBonusFactor1980s: 100,
    splitBonusFactor1990s: 50,
    splitBonusFactor2000s: 10,
    splitBonusFactor2010s: 1,
    avgAnnualDividendPerShare: 42,
    historyNotes: "Stock split in 2000 from FV ₹10 to ₹1 (1:10 ratio). Regular high dividend yield payouts.",
    rtaName: "KFin Technologies Limited"
  },
  {
    id: "titan",
    name: "Titan Company Limited",
    ticker: "TITAN",
    sector: "Consumer Durables / Jewelry",
    cmp: 3450,
    baseYear: 1987,
    splitBonusFactor1980s: 50,
    splitBonusFactor1990s: 50,
    splitBonusFactor2000s: 10,
    splitBonusFactor2010s: 1,
    avgAnnualDividendPerShare: 11,
    historyNotes: "Stock split in 2011 from FV ₹10 to ₹1 (1:10) plus 1:1 bonus issue in 2011.",
    rtaName: "Link Intime India Pvt Ltd"
  }
];

export interface CalculationInput {
  stockId: string;
  customCompanyName?: string;
  originalShareCount: number;
  purchaseDecade: "1980s" | "1990s" | "2000s" | "2010s";
  unclaimedDividendYears: number;
  customCmp?: number; // Optional user-overridden live market price
}

export interface CalculationResult {
  stockName: string;
  ticker: string;
  originalCount: number;
  purchaseDecade: string;
  splitBonusFactor: number;
  expandedShareCount: number;
  currentMarketPrice: number;
  estimatedSharesMarketValue: number;
  estimatedAnnualDividendPerShare: number;
  estimatedTotalUnclaimedDividends: number;
  grandTotalEstimatedWealth: number;
  historyNotes: string;
  rtaName: string;
  chartData: {
    label: string;
    value: number;
    color: string;
  }[];
}

export function calculateUnclaimedAssetValue(input: CalculationInput): CalculationResult {
  const stock = TOP_INDIAN_STOCKS.find((s) => s.id === input.stockId) || TOP_INDIAN_STOCKS[0];
  
  // Use custom CMP if provided and valid, otherwise fallback to baseline CMP
  const effectiveCmp = (input.customCmp && input.customCmp > 0) ? input.customCmp : stock.cmp;

  let factor = 1;
  switch (input.purchaseDecade) {
    case "1980s":
      factor = stock.splitBonusFactor1980s;
      break;
    case "1990s":
      factor = stock.splitBonusFactor1990s;
      break;
    case "2000s":
      factor = stock.splitBonusFactor2000s;
      break;
    case "2010s":
      factor = stock.splitBonusFactor2010s;
      break;
    default:
      factor = 1;
  }

  const sharesCount = Math.max(1, input.originalShareCount);
  const expandedShares = sharesCount * factor;
  const sharesValue = expandedShares * effectiveCmp;
  
  const divYears = Math.min(30, Math.max(1, input.unclaimedDividendYears));
  const totalDividends = expandedShares * stock.avgAnnualDividendPerShare * divYears;
  
  const grandTotal = sharesValue + totalDividends;
  const originalEstValue = sharesCount * 50; // Nominal face value baseline

  return {
    stockName: stock.name,
    ticker: stock.ticker,
    originalCount: sharesCount,
    purchaseDecade: input.purchaseDecade,
    splitBonusFactor: factor,
    expandedShareCount: expandedShares,
    currentMarketPrice: effectiveCmp,
    estimatedSharesMarketValue: sharesValue,
    estimatedAnnualDividendPerShare: stock.avgAnnualDividendPerShare,
    estimatedTotalUnclaimedDividends: totalDividends,
    grandTotalEstimatedWealth: grandTotal,
    historyNotes: stock.historyNotes,
    rtaName: stock.rtaName,
    chartData: [
      { label: "Nominal Purchase Cost", value: originalEstValue, color: "#94a3b8" },
      { label: "Stock Split & Bonus Expansion", value: Math.max(0, sharesValue - originalEstValue), color: "#3b82f6" },
      { label: "Accumulated Unclaimed Dividends", value: totalDividends, color: "#d4af37" },
    ]
  };
}

// Optional helper to fetch live price from Yahoo Finance public quote endpoint
export async function fetchLiveStockPrice(tickerSymbol: string): Promise<number | null> {
  try {
    const symbol = tickerSymbol.endsWith(".NS") || tickerSymbol.endsWith(".BO") ? tickerSymbol : `${tickerSymbol}.NS`;
    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m&range=1d`);
    if (!res.ok) return null;
    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    const price = meta?.regularMarketPrice;
    if (typeof price === "number" && price > 0) {
      return price;
    }
  } catch (e) {
    console.warn("Live stock price fetch unavailable, using current daily baseline:", e);
  }
  return null;
}

export function formatINR(val: number): string {
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Crores`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${val.toLocaleString("en-IN")}`;
}
