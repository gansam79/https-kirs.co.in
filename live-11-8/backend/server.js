const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { query, initializeDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DB on server start
initializeDatabase().catch((err) => {
  console.error("Database initialization deferred:", err.message);
});

// --- API ROUTES ---

// 1. Health Check & DB Init
app.get('/api/init-db', async (req, res) => {
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
        services: services[0].count,
        blogs: blogs[0].count,
        reviews: reviews[0].count,
        contacts: contacts[0].count,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'DB Init Failed: ' + err.message });
  }
});

// 2. Services Endpoints
app.get('/api/services', async (req, res) => {
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

app.get('/api/services/:slug', async (req, res) => {
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
app.get('/api/blogs', async (req, res) => {
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

app.get('/api/blogs/:slug', async (req, res) => {
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
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await query("SELECT * FROM reviews WHERE status = 'approved' ORDER BY id DESC");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, category, comment } = req.body;
    if (!name || !rating || !category || !comment) {
      return res.status(400).json({ error: 'Missing required review fields.' });
    }
    await query(
      "INSERT INTO reviews (name, rating, category, comment, likes, status) VALUES (?, ?, ?, ?, 0, 'approved')",
      [name, Number(rating), category, comment]
    );
    res.json({ success: true, message: 'Review posted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/reviews', async (req, res) => {
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
app.post('/api/contact', async (req, res) => {
  try {
    const body = req.body;
    const { name, email, phone, service, company, date, slot, notes } = body;
    let formType = body.type || (service ? 'service' : 'contact');

    // DB Insertion
    if (formType === 'contact' || formType === 'service') {
      const table = formType === 'service' ? 'service_enquiries' : 'contacts';
      await query(
        `INSERT INTO ${table} (name, email, phone, company, service, date, slot, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name || '', email || '', phone || '', company || '', service || '', date || '', slot || '', notes || '']
      );
    } else {
      await query(
        'INSERT INTO queries (type, name, email, phone, details) VALUES (?, ?, ?, ?, ?)',
        [formType, name || null, email || null, phone || null, JSON.stringify(body)]
      );
    }

    // SMTP Email Notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_USER || 'info@kirs.co.in',
          pass: process.env.SMTP_PASS || 'Kirs@2026Smtp',
        },
      });

      const mailSubject = `New Lead (${formType.toUpperCase()}) from ${name || email}`;
      const mailHtml = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; max-width: 600px;">
          <h2 style="color: #0f172a; border-bottom: 2px solid #d4af37;">New Lead Submitted (${formType})</h2>
          <p><strong>Name:</strong> ${name || 'N/A'}</p>
          <p><strong>Email:</strong> ${email || 'N/A'}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Service/Details:</strong> ${service || JSON.stringify(body)}</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"${name || 'KIRS Lead'}" <${process.env.SMTP_USER || 'info@kirs.co.in'}>`,
        to: process.env.SMTP_TO || 'info@kirs.co.in',
        subject: mailSubject,
        html: mailHtml,
      });
    } catch (emailErr) {
      console.error('SMTP Email Error:', emailErr);
    }

    res.json({ success: true, message: 'Lead recorded successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`KIRS Express API Server running on port ${PORT}`);
});

module.exports = app;
