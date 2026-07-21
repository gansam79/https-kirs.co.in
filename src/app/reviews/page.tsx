"use client";

import React, { useState } from "react";
import { Star, MessageSquare, CheckCircle2, ThumbsUp, PlusCircle, AlertCircle } from "lucide-react";
import { getBasePath } from "@/lib/basePath";

interface Review {
  id: number;
  name: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
  likes: number;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: "Amitesh Sen",
    rating: 5,
    category: "Verified Heir",
    comment: "Our family had 500 physical shares of Tata Motors from 1996. After my father passed, we had no idea how to demat them without a Will. KIRS drafted all succession bonds and guided us through court certification. Absolute experts!",
    date: "June 2026",
    likes: 12,
  },
  {
    id: 2,
    name: "Dr. Rajesh Patel",
    rating: 5,
    category: "Verified NRI Desk",
    comment: "I was living in New Jersey and trying to claim my deceased uncle's Reliance dividends from IEPF. The RTA rejected my documents twice due to spelling mismatches. The NRI desk at KIRS managed everything with embassy notarizations. Outstanding.",
    date: "May 2026",
    likes: 9,
  },
  {
    id: 3,
    name: "Kavitha Sharma",
    rating: 5,
    category: "Verified Owner",
    comment: "Highly professional work. My physical share certificate had signature differences from my bank account. They resolved the signature mismatch via Form ISR-2 updates and helped me convert everything to Demat in 2 months.",
    date: "April 2026",
    likes: 8,
  },
  {
    id: 4,
    name: "Milind Deshpande",
    rating: 5,
    category: "Verified Heir",
    comment: "We had a long-pending dispute regarding my late grandfather's bank deposits and physical mutual fund folios. KI&RS helped us clear the documentation roadblock under their success fee model. Extremely transparent and reliable team.",
    date: "March 2026",
    likes: 15,
  },
  {
    id: 5,
    name: "Sunita Kulkarni",
    rating: 5,
    category: "Verified Owner",
    comment: "Excellent guidance for unclaimed insurance policies. I had lost the original policy document of my husband. KIRS assisted in obtaining a duplicate policy and compiling the IEPF claim file. Highly recommended for Pune residents.",
    date: "February 2026",
    likes: 6,
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Verified Owner");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch reviews from the database on page load
  React.useEffect(() => {
    async function fetchReviews() {
      try {
        const basePath = getBasePath();
        const response = await fetch(`${basePath}/api/reviews`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setReviews(data);
          }
        }
      } catch (err) {
        console.error("Failed to load reviews from database:", err);
      }
    }
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !comment) {
      setError("Please fill out all fields.");
      return;
    }
    
    try {
      const basePath = getBasePath();
      const response = await fetch(`${basePath}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          rating,
          category,
          comment
        })
      });

      if (!response.ok) {
        throw new Error("Failed to post review.");
      }

      // Re-fetch updated reviews list from database
      const fetchResponse = await fetch(`${basePath}/api/reviews`);
      if (fetchResponse.ok) {
        const data = await fetchResponse.json();
        if (data && data.length > 0) {
          setReviews(data);
        }
      } else {
        const newReview: Review = {
          id: Date.now(),
          name,
          rating,
          category,
          comment,
          date: "Just now",
          likes: 0,
        };
        setReviews([newReview, ...reviews]);
      }

      setIsSubmitted(true);
      setError("");
      setName("");
      setEmail("");
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again.");
    }
  };

  const handleLike = async (id: number) => {
    setReviews(
      reviews.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );

    try {
      const basePath = getBasePath();
      await fetch(`${basePath}/api/reviews?id=${id}`, {
        method: "PATCH"
      });
    } catch (err) {
      console.error("Failed to register review like:", err);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Client Experiences</span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary font-bold tracking-tight">
            Investor Testimonials & Reviews
          </h1>
          <div className="w-16 h-[2px] bg-secondary mx-auto"></div>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Real feedback from clients and families who recovered their lost portfolios, physical share certificates, and unclaimed dividends through KI&RS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Review List */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-xl font-bold text-primary flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-secondary" />
              Latest Reviews ({reviews.length})
            </h2>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4 transition-all hover:border-slate-350">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "text-secondary fill-secondary" : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{review.date}</span>
                  </div>

                  <p className="text-slate-650 text-xs leading-relaxed italic">
                    "{review.comment}"
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{review.name}</span>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        {review.category}
                      </span>
                    </div>

                    <button
                      onClick={() => handleLike(review.id)}
                      className="text-slate-400 hover:text-primary flex items-center gap-1 text-[10px] font-semibold transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Helpful ({review.likes})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Submit Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 sticky top-24">
              <h2 className="font-serif text-xl font-bold text-primary flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-secondary" />
                Share Your Experience
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed">
                Your feedback helps us maintain the highest documentation standards. Submit your review and rating below.
              </p>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-lg text-center space-y-4 animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <div>
                    <h3 className="font-bold text-sm">Review Submitted Successfully!</h3>
                    <p className="text-xs text-emerald-600 mt-1.5 leading-relaxed">
                      Thank you! Your feedback has been sent to our moderation desk. We will review and list it publicly soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-emerald-600 text-white text-xs font-bold py-2 rounded hover:bg-emerald-700 transition-colors"
                  >
                    Submit Another Review
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-800 text-xs p-3 rounded flex items-center gap-2 border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Rating Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">Overall Rating</label>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="p-1 focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 transition-colors ${
                                starValue <= (hoverRating ?? rating)
                                  ? "text-secondary fill-secondary"
                                  : "text-slate-200"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="client-name" className="text-xs font-bold text-slate-700 block">Full Name</label>
                    <input
                      id="client-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Purushottam Samgir"
                      className="w-full border border-slate-350 rounded px-3 py-2 text-xs focus:outline-none focus:border-secondary bg-slate-50"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="client-email" className="text-xs font-bold text-slate-700 block">Email Address</label>
                    <input
                      id="client-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. client@example.com"
                      className="w-full border border-slate-350 rounded px-3 py-2 text-xs focus:outline-none focus:border-secondary bg-slate-50"
                      required
                    />
                  </div>

                  {/* Category Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="client-category" className="text-xs font-bold text-slate-700 block">Client Category</label>
                    <select
                      id="client-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-slate-350 rounded px-3 py-2 text-xs focus:outline-none focus:border-secondary bg-slate-50"
                    >
                      <option value="Verified Owner">Verified Owner</option>
                      <option value="Verified Heir">Verified Heir</option>
                      <option value="Verified NRI Desk">Verified NRI Desk</option>
                      <option value="Corporate Client">Corporate Client</option>
                    </select>
                  </div>

                  {/* Comment Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="client-comment" className="text-xs font-bold text-slate-700 block">Your Review</label>
                    <textarea
                      id="client-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share details of your experience with our services..."
                      rows={4}
                      className="w-full border border-slate-350 rounded px-3 py-2 text-xs focus:outline-none focus:border-secondary bg-slate-50 leading-relaxed"
                      required
                    ></textarea>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-slate-900 text-white font-bold py-2.5 rounded text-xs uppercase tracking-wider transition-colors shadow-md"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
