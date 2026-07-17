import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Ensure tables exist before running the query
    await initializeDatabase();

    const body = await request.json();
    const { name, email, phone, service, company, date, slot, notes } = body;

    let formType = body.type;
    if (!formType) {
      formType = service ? "service" : "contact";
    }

    // Validate inputs based on form type
    if (formType === "contact" || formType === "service") {
      if (!name || !phone || !date || !slot) {
        return NextResponse.json(
          { error: "Missing required fields (name, phone, date, slot)." },
          { status: 400 }
        );
      }
    } else if (formType === "eligibility") {
      if (!name || !phone || !email) {
        return NextResponse.json(
          { error: "Missing required fields (name, phone, email)." },
          { status: 400 }
        );
      }
    } else if (formType === "guide") {
      if (!name || !email || !phone) {
        return NextResponse.json(
          { error: "Missing required fields (name, email, phone)." },
          { status: 400 }
        );
      }
    } else if (formType === "draft") {
      if (!name || !email) {
        return NextResponse.json(
          { error: "Missing required fields (name, email)." },
          { status: 400 }
        );
      }
    } else if (formType === "subscribe") {
      if (!email) {
        return NextResponse.json(
          { error: "Missing required field (email)." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Invalid form submission type." },
        { status: 400 }
      );
    }

    // Insert consultation into the database
    if (formType === "contact" || formType === "service") {
      const tableName = formType === "service" ? "service_enquiries" : "contacts";
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
    } else {
      // For general query types, store details as JSON
      const detailsObj: Record<string, any> = {};
      if (formType === "eligibility") {
        detailsObj.assetType = body.assetType || "";
        detailsObj.holdingType = body.holdingType || "";
        detailsObj.issueType = body.issueType || "";
        detailsObj.claimantType = body.claimantType || "";
        detailsObj.approxValue = body.approxValue || "";
        detailsObj.companyName = body.companyName || "";
      } else if (formType === "draft") {
        detailsObj.requestedServiceChecklist = service || "";
      }

      await query(
        `INSERT INTO queries (type, name, email, phone, details) VALUES (?, ?, ?, ?, ?)`,
        [
          formType,
          name || null,
          email || null,
          phone || null,
          JSON.stringify(detailsObj)
        ]
      );
    }

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

      let mailSubject = `New Lead: General Inquiry`;
      let mailHtml = "";
      const senderName = name || email || "Subscriber";

      if (formType === "contact" || formType === "service") {
        mailSubject = `New Lead: Consultation Request from ${name}`;
        mailHtml = `
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
              <p style="margin: 0; color: #334155; line-height: 1.5; font-size: 12px; white-space: pre-line;">${notes || "No details provided."}</p>
            </div>
            
            <p style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by the KIRS Portal Lead Manager.
            </p>
          </div>
        `;
      } else if (formType === "eligibility") {
        mailSubject = `New Lead: Eligibility Checker Inquiry from ${name}`;
        
        const friendlyApproxValue = {
          under_1l: "Under ₹1 Lakh",
          "1_to_5l": "₹1 Lakh to ₹5 Lakhs",
          "5_to_20l": "₹5 Lakhs to ₹20 Lakhs",
          over_20l: "Above ₹20 Lakhs"
        }[body.approxValue as string] || body.approxValue || "Not Selected";

        const friendlyAssetType = {
          shares: "Physical Shares",
          mutual_funds: "Mutual Funds",
          bank_deposits: "Bank Deposits & NBFCs",
          insurance: "Unclaimed Insurance",
          pension: "Pension & EPF",
          other: "Other Assets"
        }[body.assetType as string] || body.assetType || "Not Selected";

        const friendlyHoldingType = {
          self: "Held in own name",
          deceased: "Inherited from deceased relative (with Will)",
          deceased_no_will: "Inherited from deceased relative (no Will/Nomination)",
          joint: "Joint Holder details incorrect"
        }[body.holdingType as string] || body.holdingType || "Not Selected";

        const friendlyIssueType = {
          lost: "Lost / Damaged original certificate",
          iepf: "Transferred to IEPF / Government",
          signature: "Signature mismatch with bank/RTA",
          transmission: "Name mismatch / Transmission pending",
          duplicate: "Duplicate certificates required",
          other: "Other issue"
        }[body.issueType as string] || body.issueType || "Not Selected";

        mailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Lead: Eligibility Check</h2>
            <p style="color: #334155; font-size: 14px;">A user has completed the claim eligibility checker. Below are the details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; width: 35%; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Name</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Email Address</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Mobile Number</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Target Company</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${body.companyName || "Not Provided"}</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Estimated Portfolio Value</td>
                <td style="padding: 10px; color: #d4af37; font-weight: bold; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${friendlyApproxValue}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Asset Category</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${friendlyAssetType}</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Ownership Status</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${friendlyHoldingType}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Claim / Blockage Issue</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${friendlyIssueType}</td>
              </tr>
            </table>

            <p style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by the KIRS Portal Lead Manager.
            </p>
          </div>
        `;
      } else if (formType === "guide") {
        mailSubject = `New Lead: PDF Guide Requested by ${name}`;
        mailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Lead: PDF Guide Request</h2>
            <p style="color: #334155; font-size: 14px;">A user has requested the PDF Guide download. Details below:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; width: 35%; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Name</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Email Address</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Mobile Number</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;"><a href="tel:${phone}">${phone}</a></td>
              </tr>
            </table>

            <p style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by the KIRS Portal Lead Manager.
            </p>
          </div>
        `;
      } else if (formType === "draft") {
        mailSubject = `New Lead: Custom Draft Template Request from ${name}`;
        mailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Lead: Draft Templates Request</h2>
            <p style="color: #334155; font-size: 14px;">A user has requested custom draft Word templates. Details below:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; width: 35%; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Name</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Email Address</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Active Checklist View</td>
                <td style="padding: 10px; color: #d4af37; font-weight: bold; border-bottom: 1px solid #e2e8f0; font-size: 13px;">${service || "General Recovery"}</td>
              </tr>
            </table>

            <p style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by the KIRS Portal Lead Manager.
            </p>
          </div>
        `;
      } else if (formType === "subscribe") {
        mailSubject = `New Subscriber: Newsletter Alert Joined by ${email}`;
        mailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0;">New Newsletter Subscriber</h2>
            <p style="color: #334155; font-size: 14px;">A visitor has subscribed to the Investor Alerts newsletter. Details below:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr style="background-color: #f8fafc;">
                <td style="padding: 10px; font-weight: bold; width: 35%; color: #475569; border-bottom: 1px solid #e2e8f0; font-size: 13px;">Email Address</td>
                <td style="padding: 10px; color: #0f172a; border-bottom: 1px solid #e2e8f0; font-size: 13px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
            </table>

            <p style="margin-top: 30px; font-size: 11px; color: #94a3b8; text-align: center;">
              This notification was generated automatically by the KIRS Portal Lead Manager.
            </p>
          </div>
        `;
      }

      const mailOptions = {
        from: `"${senderName}" <${process.env.SMTP_USER || "info@kirs.co.in"}>`,
        to: process.env.SMTP_TO || "info@kirs.co.in",
        replyTo: email || undefined,
        subject: mailSubject,
        html: mailHtml,
      };

      await transporter.sendMail(mailOptions);
      console.log(`SMTP lead notification (${formType}) email sent successfully.`);
    } catch (emailErr) {
      console.error("Nodemailer SMTP Error sending lead email:", emailErr);
      // Do not fail the API response if email delivery fails, as long as it saved in database.
    }

    return NextResponse.json({ success: true, message: "Request saved and email notification sent." });
  } catch (error: any) {
    console.error("API Contact Route Error:", error);
    return NextResponse.json(
      { error: "Database operation failed: " + (error.message || error) },
      { status: 500 }
    );
  }
}
