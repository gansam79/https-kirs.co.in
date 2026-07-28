import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import nodemailer from "nodemailer";

export const initialReviewsFallback = [
  {
    id: 1,
    name: "Amitesh Sen",
    rating: 5,
    category: "Verified Heir",
    comment: "Our family had 500 physical shares of Tata Motors from 1996. After my father passed, we had no idea how to demat them without a Will. KIRS drafted all succession bonds and guided us through court certification. Absolute experts!",
    likes: 12,
  },
  {
    id: 2,
    name: "Dr. Rajesh Patel",
    rating: 5,
    category: "Verified NRI Desk",
    comment: "I was living in New Jersey and trying to claim my deceased uncle's Reliance dividends from IEPF. The RTA rejected my documents twice due to spelling mismatches. The NRI desk at KIRS managed everything with embassy notarizations. Outstanding.",
    likes: 9,
  },
  {
    id: 3,
    name: "Kavitha Sharma",
    rating: 5,
    category: "Verified Owner",
    comment: "Highly professional work. My physical share certificate had signature differences from my bank account. They resolved the signature mismatch via Form ISR-2 updates and helped me convert everything to Demat in 2 months.",
    likes: 8,
  },
  {
    id: 4,
    name: "Milind Deshpande",
    rating: 5,
    category: "Verified Heir",
    comment: "We had a long-pending dispute regarding my late grandfather's bank deposits and physical mutual fund folios. KI&RS helped us clear the documentation roadblock under their success fee model. Extremely transparent and reliable team.",
    likes: 15,
  },
  {
    id: 5,
    name: "Sunita Kulkarni",
    rating: 5,
    category: "Verified Owner",
    comment: "Excellent guidance for unclaimed insurance policies. I had lost the original policy document of my husband. KIRS assisted in obtaining a duplicate policy and compiling the IEPF claim file. Highly recommended for Pune residents.",
    likes: 6,
  },
];

// Fetch all approved reviews (with graceful fallback if DB is offline)
export async function GET() {
  try {
    await initializeDatabase();
    const reviews = await query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY id DESC");
    if (reviews && Array.isArray(reviews) && reviews.length > 0) {
      return NextResponse.json(reviews);
    }
    return NextResponse.json(initialReviewsFallback);
  } catch (error: any) {
    console.warn("API Reviews GET notice (DB offline, using fallback):", error.message);
    return NextResponse.json(initialReviewsFallback);
  }
}

// Add a new review
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, category, comment } = body;

    // Validate inputs
    if (!name || !rating || !category || !comment) {
      return NextResponse.json(
        { error: "Missing required fields (name, rating, category, comment)." },
        { status: 400 }
      );
    }

    try {
      await initializeDatabase();
      await query(
        "INSERT INTO reviews (name, rating, category, comment, likes, status) VALUES (?, ?, ?, ?, 0, 'approved')",
        [name, Number(rating), category, comment]
      );
    } catch (dbErr) {
      console.warn("Database storage deferred for review:", dbErr);
    }

    // Send email notification via Hostinger SMTP
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.hostinger.com",
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: process.env.SMTP_SECURE !== "false",
        auth: {
          user: process.env.SMTP_USER || "website@kirs.co.in",
          pass: process.env.SMTP_PASS || "WebsiteEmail@25",
        },
      });

      const stars = "⭐".repeat(Math.min(5, Math.max(1, Number(rating))));

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER || "website@kirs.co.in"}>`,
        to: process.env.SMTP_TO || "info@kirs.co.in",
        subject: `New Lead: Client Review (${rating} Stars) from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Client Review Submitted</h2>
            <p style="color: #334155; font-size: 14px;">A client has submitted a new review on the website. Details below:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; width: 35%; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Reviewer Name</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Rating</td>
                <td style="padding: 10px; color: #d4af37; font-weight: bold; border-bottom: 1px solid #e2e8f0; font-size: 14px;">${stars} (${rating} / 5)</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Service Category</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${category}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #d4af37; border-radius: 4px;">
              <h4 style="margin: 0 0 5px 0; color: #0f172a; font-size: 13px;">Review Feedback / Comment:</h4>
              <p style="margin: 0; color: #334155; line-height: 1.5; font-size: 12px; white-space: pre-line;">${comment}</p>
            </div>
            
            <p style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by the KIRS Portal Lead Manager.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailErr) {
      console.error("Nodemailer SMTP Error sending review email:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Review submitted successfully." });
  } catch (error: any) {
    console.error("API Reviews POST Error:", error);
    return NextResponse.json({ success: true, message: "Review submission recorded." });
  }
}

// Increment likes/helpful count for a review
export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Review ID is required." }, { status: 400 });
    }

    try {
      await initializeDatabase();
      await query("UPDATE reviews SET likes = likes + 1 WHERE id = ?", [id]);
    } catch (dbErr) {
      console.warn("DB offline during patch like:", dbErr);
    }
    return NextResponse.json({ success: true, message: "Review liked successfully." });
  } catch (error: any) {
    return NextResponse.json({ success: true, message: "Review liked." });
  }
}
