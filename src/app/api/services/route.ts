import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import { servicesData, Service } from "@/data/servicesData";

// Helper to format database row into frontend Service model
function formatServiceRow(row: any): Service {
  return {
    slug: row.slug,
    title: row.title,
    shortDesc: row.short_desc || "",
    longDesc: row.long_desc || "",
    timeline: row.timeline || "",
    eligibility: typeof row.eligibility === "string" ? JSON.parse(row.eligibility) : (row.eligibility || []),
    documents: typeof row.documents === "string" ? JSON.parse(row.documents) : (row.documents || []),
    faqs: typeof row.faqs === "string" ? JSON.parse(row.faqs) : (row.faqs || []),
  };
}

// GET all services
export async function GET() {
  try {
    await initializeDatabase();
    const rows = await query<any[]>("SELECT * FROM services ORDER BY id ASC");
    if (rows && rows.length > 0) {
      const services = rows.map(formatServiceRow);
      return NextResponse.json(services);
    }
    // Fallback to static servicesData if table empty
    return NextResponse.json(servicesData);
  } catch (error: any) {
    console.error("API Services GET Error:", error);
    // Graceful fallback to static array if database query fails
    return NextResponse.json(servicesData);
  }
}

// POST create or update a service
export async function POST(request: Request) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const { slug, title, shortDesc, longDesc, timeline, eligibility, documents, faqs } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: "Slug and title are required." },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO services (slug, title, short_desc, long_desc, timeline, eligibility, documents, faqs)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
         title = VALUES(title),
         short_desc = VALUES(short_desc),
         long_desc = VALUES(long_desc),
         timeline = VALUES(timeline),
         eligibility = VALUES(eligibility),
         documents = VALUES(documents),
         faqs = VALUES(faqs)`,
      [
        slug,
        title,
        shortDesc || "",
        longDesc || "",
        timeline || "",
        JSON.stringify(eligibility || []),
        JSON.stringify(documents || []),
        JSON.stringify(faqs || []),
      ]
    );

    return NextResponse.json({ success: true, message: "Service saved to database successfully." });
  } catch (error: any) {
    console.error("API Services POST Error:", error);
    return NextResponse.json(
      { error: "Database operation failed: " + (error.message || error) },
      { status: 500 }
    );
  }
}
