import { MetadataRoute } from "next";
import { servicesData } from "@/data/servicesData";

export const dynamic = "force-static";
import { blogData } from "@/data/blogData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kirs.co.in";

  // Static Pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/services",
    "/regulatory-awareness",
    "/eligibility-checker",
    "/document-checklist",
    "/knowledge-center",
    "/privacy-policy",
    "/terms-of-use",
    "/compliance-notice",
    "/reviews",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Service Pages
  const servicePages = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic Blog Pages
  const blogPages = blogData.map((post) => ({
    url: `${baseUrl}/knowledge-center/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages];
}
