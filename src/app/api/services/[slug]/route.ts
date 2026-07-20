import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import { servicesData, Service } from "@/data/servicesData";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    await initializeDatabase();

    const rows = await query<any[]>("SELECT * FROM services WHERE slug = ? LIMIT 1", [slug]);

    if (rows && rows.length > 0) {
      const row = rows[0];
      const service: Service = {
        slug: row.slug,
        title: row.title,
        shortDesc: row.short_desc || "",
        longDesc: row.long_desc || "",
        timeline: row.timeline || "",
        eligibility: typeof row.eligibility === "string" ? JSON.parse(row.eligibility) : (row.eligibility || []),
        documents: typeof row.documents === "string" ? JSON.parse(row.documents) : (row.documents || []),
        faqs: typeof row.faqs === "string" ? JSON.parse(row.faqs) : (row.faqs || []),
      };
      return NextResponse.json(service);
    }

    // Fallback to static servicesData if DB row not found
    const staticService = servicesData.find((s) => s.slug === slug);
    if (staticService) {
      return NextResponse.json(staticService);
    }

    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  } catch (error: any) {
    console.error("API Service Detail GET Error:", error);
    // Graceful fallback to static data
    const { slug } = await params;
    const staticService = servicesData.find((s) => s.slug === slug);
    if (staticService) {
      return NextResponse.json(staticService);
    }
    return NextResponse.json({ error: "Service query failed" }, { status: 500 });
  }
}
