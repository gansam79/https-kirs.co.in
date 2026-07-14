import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";

// Fetch all approved reviews
export async function GET() {
  try {
    await initializeDatabase();
    // Return approved reviews, latest first
    const reviews = await query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY id DESC");
    return NextResponse.json(reviews);
  } catch (error: any) {
    console.error("API Reviews GET Error:", error);
    return NextResponse.json(
      { error: "Database operation failed: " + (error.message || error) },
      { status: 500 }
    );
  }
}

// Add a new review
export async function POST(request: Request) {
  try {
    await initializeDatabase();
    const body = await request.json();
    const { name, rating, category, comment } = body;

    // Validate inputs
    if (!name || !rating || !category || !comment) {
      return NextResponse.json(
        { error: "Missing required fields (name, rating, category, comment)." },
        { status: 400 }
      );
    }

    // Insert new review as approved so it displays immediately
    await query(
      "INSERT INTO reviews (name, rating, category, comment, likes, status) VALUES (?, ?, ?, ?, 0, 'approved')",
      [name, Number(rating), category, comment]
    );

    return NextResponse.json({ success: true, message: "Review posted successfully." });
  } catch (error: any) {
    console.error("API Reviews POST Error:", error);
    return NextResponse.json(
      { error: "Database operation failed: " + (error.message || error) },
      { status: 500 }
    );
  }
}

// Increment likes/helpful count for a review
export async function PATCH(request: Request) {
  try {
    await initializeDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Review ID is required." }, { status: 400 });
    }

    await query("UPDATE reviews SET likes = likes + 1 WHERE id = ?", [id]);
    return NextResponse.json({ success: true, message: "Review liked successfully." });
  } catch (error: any) {
    console.error("API Reviews PATCH Error:", error);
    return NextResponse.json(
      { error: "Database operation failed: " + (error.message || error) },
      { status: 500 }
    );
  }
}
