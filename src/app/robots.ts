import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // Prevents indexing of backend routes if added later
    },
    sitemap: "https://https-kirs.co.in/sitemap.xml",
  };
}
