const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config();

const { query, initializeDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize DB on server start
initializeDatabase().catch((err) => {
  console.warn("Database initialization notice:", err.message);
});

// Helper: Build Full HTML Email
function buildEmailHtml(body) {
  const name = body.name || 'N/A';
  const email = body.email || 'N/A';
  const phone = body.phone || 'N/A';
  const formType = (body.type || (body.service ? 'Service Enquiry' : 'General Contact')).toUpperCase();
  const service = body.service || body.claimType || body.assetType || 'N/A';
  const company = body.company || body.companyName || 'N/A';
  const date = body.date || 'N/A';
  const slot = body.slot || 'N/A';
  const notes = body.notes || body.message || body.comments || '';
  
  const sharesHeld = body.sharesHeld || body.estimatedShares || '';
  const folioNumber = body.folioNumber || '';
  const claimType = body.claimType || body.holdingType || '';
  const estimatedValue = body.estimatedValue || body.approxValue || '';
  const hasOldCertificates = body.hasOldCertificates !== undefined ? (body.hasOldCertificates ? 'Yes' : 'No') : '';
  const isDeceased = body.isDeceased !== undefined ? (body.isDeceased ? 'Yes' : 'No') : '';
  const legalSuccessionStatus = body.legalSuccessionStatus || '';
  const selectedDocs = Array.isArray(body.selectedDocs) ? body.selectedDocs.join(', ') : (body.selectedDocs || '');

  const detailRows = [
    { label: 'Form Category', value: formType },
    { label: 'Full Name', value: name },
    { label: 'Phone Number', value: phone },
    { label: 'Email Address', value: email },
    { label: 'Company / Registrar', value: company !== 'N/A' ? company : '' },
    { label: 'Service Requested', value: service !== 'N/A' ? service : '' },
    { label: 'Consultation Date', value: date !== 'N/A' ? date : '' },
    { label: 'Consultation Slot', value: slot !== 'N/A' ? slot : '' },
    { label: 'Shares / Folios Count', value: sharesHeld },
    { label: 'Folio / Certificate No.', value: folioNumber },
    { label: 'Claim / Holding Type', value: claimType },
    { label: 'Estimated Portfolio Value', value: estimatedValue },
    { label: 'Has Physical Certificates?', value: hasOldCertificates },
    { label: 'Deceased / Inheritance Case?', value: isDeceased },
    { label: 'Legal Succession Status', value: legalSuccessionStatus },
    { label: 'Checklist Documents', value: selectedDocs },
    { label: 'Notes / Query Details', value: notes },
  ].filter(item => item.value && item.value !== 'N/A');

  const allKeys = Object.keys(body);
  const extraRows = allKeys
    .map(key => {
      let val = body[key];
      if (typeof val === 'object') val = JSON.stringify(val);
      return `<tr><td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 35%; background-color: #f8fafc;">${key}</td><td style="padding: 8px 12px; border: 1px solid #e2e8f0; color: #1e293b;">${val || '—'}</td></tr>`;
    })
    .join('');

  const cleanPhone = phone !== 'N/A' ? phone.replace(/[^0-9]/g, '') : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Lead - KIRS</title>
    </head>
    <body style="margin: 0; padding: 20px; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b;">
      <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0B1920 0%, #17303B 100%); padding: 24px 28px; border-bottom: 3px solid #D4AF37;">
          <h1 style="margin: 0 0 6px 0; color: #D4AF37; font-size: 20px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
            KALAVATI INVESTMENT & RECOVERY SERVICES
          </h1>
          <p style="margin: 0; color: #cbd5e1; font-size: 13px; letter-spacing: 0.3px;">
            New Website Consultation & Lead Notification
          </p>
        </div>

        <!-- Lead Summary Banner -->
        <div style="background-color: #f8fafc; padding: 14px 28px; border-bottom: 1px solid #e2e8f0;">
          <span style="display: inline-block; background-color: #D4AF37; color: #0B1920; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px;">
            ${formType}
          </span>
          <span style="color: #64748b; font-size: 12px; float: right; padding-top: 3px;">
            Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </span>
        </div>

        <!-- Main Details Table -->
        <div style="padding: 24px 28px;">
          <h2 style="margin: 0 0 16px 0; color: #0B1920; font-size: 16px; font-weight: 700; border-left: 4px solid #D4AF37; padding-left: 10px;">
            Submitted Client Information
          </h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            ${detailRows.map(row => `
              <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #475569; width: 38%; background-color: #fafafa;">
                  ${row.label}
                </td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;">
                  ${row.value}
                </td>
              </tr>
            `).join('')}
          </table>

          <!-- Quick Action Buttons -->
          <div style="margin-bottom: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
            <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">
              Quick Follow-Up Actions
            </p>
            ${phone && phone !== 'N/A' ? `
              <a href="tel:${phone}" style="display: inline-block; margin: 4px; padding: 8px 16px; background-color: #0B1920; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">
                📞 Call (${phone})
              </a>
            ` : ''}
            ${cleanPhone ? `
              <a href="https://wa.me/${cleanPhone}" target="_blank" style="display: inline-block; margin: 4px; padding: 8px 16px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600;">
                💬 Chat on WhatsApp
              </a>
            ` : ''}
            ${email && email !== 'N/A' ? `
              <a href="mailto:${email}" style="display: inline-block; margin: 4px; padding: 8px 16px; background-color: #D4AF37; color: #0B1920; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 700;">
                ✉️ Reply to ${email}
              </a>
            ` : ''}
          </div>

          <!-- Full Raw Data Breakdown -->
          <details style="margin-top: 20px; font-size: 12px; color: #64748b;">
            <summary style="cursor: pointer; font-weight: 600; padding: 8px 0; color: #475569;">
              View Complete Raw Submission Payload (${allKeys.length} fields)
            </summary>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; border: 1px solid #e2e8f0;">
              ${extraRows}
            </table>
          </details>
        </div>

        <!-- Footer -->
        <div style="background-color: #0B1920; color: #94a3b8; padding: 16px 28px; text-align: center; font-size: 12px; border-top: 1px solid #334155;">
          <p style="margin: 0;">
            KIRS Automation Desk &bull; 33/1B/1, Datta Nagar, Katraj, Pune 411046 &bull; <a href="https://kirs.co.in" style="color: #D4AF37; text-decoration: none;">kirs.co.in</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Router for API endpoints
const router = express.Router();

// 1. Health Check & DB Init
router.get('/init-db', async (req, res) => {
  try {
    await initializeDatabase();
    const services = await query('SELECT COUNT(*) as count FROM services');
    const blogs = await query('SELECT COUNT(*) as count FROM blogs');
    const reviews = await query('SELECT COUNT(*) as count FROM reviews');
    const contacts = await query('SELECT COUNT(*) as count FROM contacts');

    res.json({
      success: true,
      message: 'Database initialized successfully!',
      stats: {
        services: services[0]?.count || 0,
        blogs: blogs[0]?.count || 0,
        reviews: reviews[0]?.count || 0,
        contacts: contacts[0]?.count || 0,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'DB Init Failed: ' + err.message });
  }
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. Services Endpoints
router.get('/services', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM services ORDER BY id ASC');
    const services = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      shortDesc: r.short_desc || '',
      longDesc: r.long_desc || '',
      timeline: r.timeline || '',
      eligibility: typeof r.eligibility === 'string' ? JSON.parse(r.eligibility) : r.eligibility || [],
      documents: typeof r.documents === 'string' ? JSON.parse(r.documents) : r.documents || [],
      faqs: typeof r.faqs === 'string' ? JSON.parse(r.faqs) : r.faqs || [],
    }));
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/services/:slug', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM services WHERE slug = ? LIMIT 1', [req.params.slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const r = rows[0];
    res.json({
      slug: r.slug,
      title: r.title,
      shortDesc: r.short_desc || '',
      longDesc: r.long_desc || '',
      timeline: r.timeline || '',
      eligibility: typeof r.eligibility === 'string' ? JSON.parse(r.eligibility) : r.eligibility || [],
      documents: typeof r.documents === 'string' ? JSON.parse(r.documents) : r.documents || [],
      faqs: typeof r.faqs === 'string' ? JSON.parse(r.faqs) : r.faqs || [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Blogs Endpoints
router.get('/blogs', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM blogs ORDER BY id DESC');
    const blogs = rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      category: r.category || '',
      date: r.date || '',
      readTime: r.read_time || '',
      excerpt: r.excerpt || '',
      content: typeof r.content === 'string' ? JSON.parse(r.content) : r.content || [],
      keywords: typeof r.keywords === 'string' ? JSON.parse(r.keywords) : r.keywords || [],
    }));
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/blogs/:slug', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM blogs WHERE slug = ? LIMIT 1', [req.params.slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Article not found' });
    }
    const r = rows[0];
    res.json({
      slug: r.slug,
      title: r.title,
      category: r.category || '',
      date: r.date || '',
      readTime: r.read_time || '',
      excerpt: r.excerpt || '',
      content: typeof r.content === 'string' ? JSON.parse(r.content) : r.content || [],
      keywords: typeof r.keywords === 'string' ? JSON.parse(r.keywords) : r.keywords || [],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Reviews Endpoints
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY id DESC");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/reviews', async (req, res) => {
  try {
    const { name, rating, category, comment } = req.body;
    if (!name || !rating || !category || !comment) {
      return res.status(400).json({ error: 'Missing required review fields.' });
    }
    await query(
      "INSERT INTO reviews (name, rating, category, comment, likes, status) VALUES (?, ?, ?, ?, 0, 'approved')",
      [name, Number(rating), category, comment]
    );

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: String(process.env.SMTP_SECURE) !== 'false',
        auth: {
          user: process.env.SMTP_USER || 'website@kirs.co.in',
          pass: process.env.SMTP_PASS || 'WebsiteEmail@25',
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
      });

      const stars = '⭐'.repeat(Math.min(5, Math.max(1, Number(rating))));

      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER || 'website@kirs.co.in'}>`,
        to: process.env.SMTP_TO || 'info@kirs.co.in',
        subject: `New Client Review (${rating} Stars) from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px; border-radius: 8px;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37; padding-bottom: 8px;">New Client Review Submitted</h2>
            <p><strong>Reviewer Name:</strong> ${name}</p>
            <p><strong>Rating:</strong> ${stars} (${rating} / 5)</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Comment:</strong> ${comment}</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Express SMTP Review Email Notice:', emailErr.message);
    }

    res.json({ success: true, message: 'Review posted and notification sent successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/reviews', async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Review ID required.' });
    await query('UPDATE reviews SET likes = likes + 1 WHERE id = ?', [id]);
    res.json({ success: true, message: 'Liked review.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Contact / Lead Submission Endpoint
router.post('/contact', async (req, res) => {
  try {
    const body = req.body || {};
    const name = body.name || '';
    const email = body.email || '';
    const phone = body.phone || '';
    const company = body.company || body.companyName || '';
    const service = body.service || body.claimType || body.assetType || body.type || 'General Contact';
    const date = body.date || '';
    const slot = body.slot || '';
    const notes = body.notes || body.message || (typeof body.details === 'object' ? JSON.stringify(body.details) : body.details || '');
    let formType = body.type || (service ? 'service' : 'contact');

    // DB Insertion into contacts table
    try {
      await query(
        `INSERT INTO contacts (name, email, phone, company, service, date, slot, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, phone, company, service, date, slot, notes]
      );

      // If service inquiry, also log into service_enquiries
      if (formType === 'service' || formType === 'share_recovery_inquiry') {
        await query(
          `INSERT INTO service_enquiries (name, email, phone, company, service, date, slot, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [name, email, phone, company, service, date, slot, notes]
        );
      }

      // Log full payload into queries table
      await query(
        'INSERT INTO queries (type, name, email, phone, details) VALUES (?, ?, ?, ?, ?)',
        [formType, name || '', email || '', phone || '', JSON.stringify(body, null, 2)]
      );
    } catch (dbErr) {
      console.warn('Backend DB Storage Notice:', dbErr.message);
    }

    // SMTP Email Notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: String(process.env.SMTP_SECURE) !== 'false',
        auth: {
          user: process.env.SMTP_USER || 'website@kirs.co.in',
          pass: process.env.SMTP_PASS || 'WebsiteEmail@25',
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 12000,
        greetingTimeout: 12000,
        socketTimeout: 15000,
      });

      const mailSubject = `New Lead [${formType.toUpperCase()}]: ${name || phone || email}`;
      const mailHtml = buildEmailHtml(body);

      await transporter.sendMail({
        from: `"${name ? name + ' via KIRS' : 'KIRS Lead'}" <${process.env.SMTP_USER || 'website@kirs.co.in'}>`,
        to: process.env.SMTP_TO || 'info@kirs.co.in',
        replyTo: email || undefined,
        subject: mailSubject,
        html: mailHtml,
      });
      console.log(`Express SMTP lead email sent successfully for ${name || email}`);
    } catch (emailErr) {
      console.error('SMTP Email Notice:', emailErr.message);
    }

    res.json({ success: true, message: 'Lead recorded and notification sent successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mount router on BOTH '/api' and '/' so Passenger rewrites or direct requests work seamlessly
app.use('/api', router);
app.use('/', router);

// Start Server
app.listen(PORT, () => {
  console.log(`KIRS Express API Server running on port ${PORT}`);
});

module.exports = app;
