import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import nodemailer from "nodemailer";

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
      console.log(`SMTP review notification email sent successfully for ${name}.`);
    } catch (emailErr) {
      console.error("Nodemailer SMTP Error sending review email:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Review posted and email notification sent." });
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
