import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./app/page";
import AboutPage from "./app/about/page";
import ServicesPage from "./app/services/page";
import ServiceDetailPage from "./app/services/[slug]/page";
import RegulatoryAwarenessPage from "./app/regulatory-awareness/page";
import EligibilityCheckerPage from "./app/eligibility-checker/page";
import DocumentChecklistPage from "./app/document-checklist/page";
import KnowledgeCenterPage from "./app/knowledge-center/page";
import BlogPostPage from "./app/knowledge-center/[slug]/page";
import ReviewsPage from "./app/reviews/page";
import ContactPage from "./app/contact/page";
import PrivacyPolicyPage from "./app/privacy-policy/page";
import TermsOfUsePage from "./app/terms-of-use/page";
import ComplianceNoticePage from "./app/compliance-notice/page";

// ScrollToTop Helper Component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const baseUrl = import.meta.env.BASE_URL || "/";

  return (
    <BrowserRouter basename={baseUrl}>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-800 antialiased">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/regulatory-awareness" element={<RegulatoryAwarenessPage />} />
            <Route path="/eligibility-checker" element={<EligibilityCheckerPage />} />
            <Route path="/document-checklist" element={<DocumentChecklistPage />} />
            <Route path="/knowledge-center" element={<KnowledgeCenterPage />} />
            <Route path="/knowledge-center/:slug" element={<BlogPostPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUsePage />} />
            <Route path="/compliance-notice" element={<ComplianceNoticePage />} />
            <Route path="/cookie-policy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
