import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Bookmark, BookOpen, AlertCircle } from "lucide-react";
import { blogData, BlogPost } from "@/data/blogData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link
            href="/knowledge-center"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-primary text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Knowledge Center
          </Link>
          <div className="text-[10px] text-slate-400 font-medium select-none">
            Blog / <span className="text-slate-600">{post.category}</span>
          </div>
        </div>

        {/* Blog Article Core Container */}
        <article className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden select-none">
          
          {/* Cover Header info */}
          <div className="bg-primary text-white p-6 sm:p-10 border-b border-slate-800 space-y-4 relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 blur-xl rounded-full"></div>
            
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider relative z-10">
              <span className="text-secondary">{post.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
            </div>

            <h1 className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-white leading-tight relative z-10">
              {post.title}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light italic relative z-10 border-l border-secondary/50 pl-3">
              "{post.excerpt}"
            </p>
          </div>

          {/* Article content panels */}
          <div className="p-6 sm:p-10 space-y-5 text-xs text-slate-700 leading-relaxed font-light border-b border-slate-100">
            {post.content.map((paragraph, index) => (
              <p key={index} className="whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Meta Keywords & Action footer */}
          <div className="p-6 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 items-center select-none">
              <Bookmark className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mr-1">Tags:</span>
              {post.keywords.map((kw, idx) => (
                <span key={idx} className="bg-white border border-slate-200 text-slate-505 text-[9px] px-2 py-0.5 rounded font-mono">
                  {kw}
                </span>
              ))}
            </div>
            
            <Link
              href="/contact"
              className="w-full sm:w-auto text-center bg-primary hover:bg-slate-900 text-white font-bold text-xs px-5 py-2.5 rounded uppercase tracking-wider transition-colors shadow-md border border-slate-800"
            >
              Consult an Expert
            </Link>
          </div>

        </article>

        {/* Safety compliance disclaimers */}
        <div className="bg-slate-100 border border-slate-200 rounded p-5 flex gap-3 items-start text-[10px] text-slate-500 leading-normal">
          <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <p>
            <strong>Compliance Advisory:</strong> The details provided in this guide are for general informational, educational purposes only and do not constitute legal or financial counsel. Filing processes, stamp duties, court jurisdictions, and RTA requirements can evolve. Always check recent MCA/SEBI notifications. KIRS represents clients under professional service agreements and is not affiliated with the government.
          </p>
        </div>

      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}
