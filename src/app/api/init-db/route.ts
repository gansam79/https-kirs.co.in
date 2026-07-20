import { NextResponse } from "next/server";
import { initializeDatabase, query } from "@/lib/db";

export async function GET() {
  try {
    await initializeDatabase();
    const servicesCount = await query<any[]>("SELECT COUNT(*) as count FROM services");
    const blogsCount = await query<any[]>("SELECT COUNT(*) as count FROM blogs");
    const reviewsCount = await query<any[]>("SELECT COUNT(*) as count FROM reviews");
    const contactsCount = await query<any[]>("SELECT COUNT(*) as count FROM contacts");

    return NextResponse.json({
      success: true,
      message: "Database tables created and initialized successfully!",
      stats: {
        services: servicesCount[0]?.count || 0,
        blogs: blogsCount[0]?.count || 0,
        reviews: reviewsCount[0]?.count || 0,
        contacts: contactsCount[0]?.count || 0,
      }
    });
  } catch (error: any) {
    console.error("API Init DB Error:", error);
    return NextResponse.json(
      { error: "Database initialization failed: " + (error.message || error) },
      { status: 500 }
    );
  }
}
