"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, BookOpen, Clock, Calendar, ChevronRight, HelpCircle } from "lucide-react";
import { blogData, BlogPost } from "@/data/blogData";

export default function KnowledgeCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "IEPF Recovery", "Demat Conversion", "Share Transmission"];

  const filteredPosts = blogData.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Investor Knowledge Center</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
            Educational Guides & Industry Insights
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Read our SEO-rich guides explaining IEPF Form filings, SEBI dematerialization policies, transmission certifications, and estate coordination rules.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search guides (e.g. IEPF, transmission)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 border border-slate-200 rounded focus:outline-none focus:border-secondary bg-white text-slate-700 shadow-sm transition-all"
            />
          </div>
          
          {/* Categories */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] font-bold px-4 py-2 rounded-full border transition-all shrink-0 uppercase tracking-wider ${
                  selectedCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-350"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-lg max-w-lg mx-auto shadow-sm space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-350 mx-auto" />
            <h3 className="font-serif text-sm font-semibold text-slate-800">No Articles Found</h3>
            <p className="text-slate-400 text-xs px-4">
              We couldn't find matching articles for your search. Check spelling or select another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs text-[#b38728] font-semibold underline hover:text-primary transition-colors"
            >
              Clear Search Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <span className="text-secondary">{post.category}</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-primary hover:text-secondary leading-snug">
                    <Link href={`/knowledge-center/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[9px] text-slate-450 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Published: {post.date}
                  </span>
                  <Link
                    href={`/knowledge-center/${post.slug}`}
                    className="text-primary hover:text-secondary font-bold text-xs flex items-center gap-0.5 group transition-all"
                  >
                    Read Guide
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Lead Hook Banner */}
        <div className="bg-primary text-white rounded-lg p-6 sm:p-10 border border-slate-800 shadow-xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h4 className="font-serif text-lg font-bold">Unclaimed Assets audit consultation</h4>
            <p className="text-slate-300 text-xs leading-relaxed font-light">
              Are you stuck on a complicated inheritance, spelling change, or RTA verification objection? Speak to a senior KIRS relations expert for a free advisory call.
            </p>
          </div>
          <Link
            href="/contact"
            className="bg-secondary hover:bg-yellow-600 text-primary font-bold text-xs px-6 py-3 rounded uppercase tracking-wider whitespace-nowrap transition-colors shadow-md shrink-0"
          >
            Schedule Free Consultation
          </Link>
        </div>

      </div>
    </div>
  );
}
