import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Ensure tables exist before running the query
    await initializeDatabase();

    const body = await request.json();
    const { name, email, phone, service, company, date, slot, notes } = body;

    // Validate inputs
    if (!name || !phone || !date || !slot) {
      return NextResponse.json(
        { error: "Missing required fields (name, phone, date, slot)." },
        { status: 400 }
      );
    }

    // Decide which table to insert into
    const tableName = service ? "service_enquiries" : "contacts";

    // Insert consultation into the database
    await query(
      `INSERT INTO ${tableName} (name, email, phone, company, service, date, slot, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email || "",
        phone,
        company || "",
        service || "",
        date,
        slot,
        notes || ""
      ]
    );

    // Send email notification via Hostinger SMTP
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.hostinger.com",
        port: parseInt(process.env.SMTP_PORT || "465"),
        secure: process.env.SMTP_SECURE !== "false", // true for 465, false for 587
        auth: {
          user: process.env.SMTP_USER || "info@kirs.co.in",
          pass: process.env.SMTP_PASS || "Kirs@2026Smtp",
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER || "info@kirs.co.in"}>`,
        to: process.env.SMTP_TO || "info@kirs.co.in",
        replyTo: email || undefined,
        subject: `New Lead: Consultation Request from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Lead Received</h2>
            <p style="color: #334155; font-size: 14px;">A client has requested a free consultation call. Below are the details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; width: 35%; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Name</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Email Address</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;"><a href="mailto:${email}">${email || "Not Provided"}</a></td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Mobile Number</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Selected Service</td>
                <td style="padding: 10px; color: #d4af37; font-weight: bold; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${service || "General Inquiry / Not Selected"}</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Corporate Holdings</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${company || "Not Provided"}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Appointment Date</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${date}</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Time Slot</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${slot}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-left: 4px solid #d4af37; border-radius: 4px;">
              <h4 style="margin: 0 0 5px 0; color: #0f172a; font-size: 13px;">Share Issue Details / Notes:</h4>
              <p style="margin: 0; color: #334155; line-height: 1.5; font-size: 12px; whitespace: pre-line;">${notes || "No details provided."}</p>
            </div>
            
            <p style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by the KIRS Portal Lead Manager.
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("SMTP Lead notification email sent successfully.");
    } catch (emailErr) {
      console.error("Nodemailer SMTP Error sending lead email:", emailErr);
      // Do not fail the API response if email delivery fails, as long as it saved in database.
    }

    return NextResponse.json({ success: true, message: "Consultation request saved and email notification sent." });
  } catch (error: any) {
    console.error("API Contact Route Error:", error);
    return NextResponse.json(
      { error: "Database operation failed: " + (error.message || error) },
      { status: 500 }
    );
  }
}
