import React from "react";

// 1. Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "KIRS (Kalavati Investment & Recovery Services)",
    "alternateName": "Kalavati Investment & Recovery Services",
    "url": "https://kirs.co.in",
    "logo": "https://kirs.co.in/logo-header.jpeg",
    "sameAs": [
      "https://www.linkedin.com/company/kirs-india",
      "https://twitter.com/kirs_india"
    ],
    "description": "India's trusted experts for IEPF Claim Recovery, physical share conversion to demat, share transmissions, duplicate certificates, and NRI estate recovery consultancies."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// 2. Local Business Schema (Bandra, Mumbai)
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "KIRS (Kalavati Investment & Recovery Services)",
    "image": "https://kirs.co.in/logo-header.jpeg",
    "telephone": "+919823662901",
    "email": "info@kirs.co.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "33/1B/1, Datta Nagar, Katraj",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411046",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.4529,
      "longitude": 73.8554
    },
    "url": "https://kirs.co.in",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "18:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// 3. FAQ Schema
interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// 4. Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  item: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": breadcrumb.item
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
