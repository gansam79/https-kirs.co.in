import mysql from "mysql2/promise";
import { servicesData } from "@/data/servicesData";
import { blogData } from "@/data/blogData";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "193.203.184.226",
  user: process.env.DB_USER || "u686584126_kirsdb",
  password: process.env.DB_PASSWORD || "Kirs@2026Db",
  database: process.env.DB_NAME || "u686584126_kirsdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Helper function to run database queries
export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [results] = await pool.execute(sql, params);
  return results as T;
}

// Function to initialize tables and seed static data if empty
export async function initializeDatabase() {
  try {
    // 1. Create contacts table
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        service VARCHAR(255),
        date VARCHAR(50),
        slot VARCHAR(50),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    try {
      await query(`ALTER TABLE contacts ADD COLUMN service VARCHAR(255) AFTER company;`);
    } catch (err) {
      // Ignore if column already exists
    }

    // 2. Create service_enquiries table
    await query(`
      CREATE TABLE IF NOT EXISTS service_enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        company VARCHAR(255),
        service VARCHAR(255),
        date VARCHAR(50),
        slot VARCHAR(50),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Create queries table for general leads (guide, drafts, subscriptions, eligibility)
    await query(`
      CREATE TABLE IF NOT EXISTS queries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 4. Create reviews table
    await query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        category VARCHAR(100) NOT NULL,
        comment TEXT NOT NULL,
        likes INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'approved',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 5. Pre-populate initial reviews if table is empty
    const reviewsCount = await query<any[]>("SELECT COUNT(*) as count FROM reviews");
    if (reviewsCount[0].count === 0) {
      const initialReviews = [
        {
          name: "Amitesh Sen",
          rating: 5,
          category: "Verified Heir",
          comment: "Our family had 500 physical shares of Tata Motors from 1996. After my father passed, we had no idea how to demat them without a Will. KIRS drafted all succession bonds and guided us through court certification. Absolute experts!",
          likes: 12,
        },
        {
          name: "Dr. Rajesh Patel",
          rating: 5,
          category: "Verified NRI Desk",
          comment: "I was living in New Jersey and trying to claim my deceased uncle's Reliance dividends from IEPF. The RTA rejected my documents twice due to spelling mismatches. The NRI desk at KIRS managed everything with embassy notarizations. Outstanding.",
          likes: 9,
        },
        {
          name: "Kavitha Sharma",
          rating: 5,
          category: "Verified Owner",
          comment: "Highly professional work. My physical share certificate had signature differences from my bank account. They resolved the signature mismatch via Form ISR-2 updates and helped me convert everything to Demat in 2 months.",
          likes: 8,
        },
        {
          name: "Milind Deshpande",
          rating: 5,
          category: "Verified Heir",
          comment: "We had a long-pending dispute regarding my late grandfather's bank deposits and physical mutual fund folios. KI&RS helped us clear the documentation roadblock under their success fee model. Extremely transparent and reliable team.",
          likes: 15,
        },
        {
          name: "Sunita Kulkarni",
          rating: 5,
          category: "Verified Owner",
          comment: "Excellent guidance for unclaimed insurance policies. I had lost the original policy document of my husband. KIRS assisted in obtaining a duplicate policy and compiling the IEPF claim file. Highly recommended for Pune residents.",
          likes: 6,
        },
      ];

      for (const r of initialReviews) {
        await query(
          "INSERT INTO reviews (name, rating, category, comment, likes, status) VALUES (?, ?, ?, ?, ?, 'approved')",
          [r.name, r.rating, r.category, r.comment, r.likes]
        );
      }
      console.log("Database initialized with seed review data.");
    }

    // 6. Create services table
    await query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        short_desc TEXT,
        long_desc LONGTEXT,
        timeline VARCHAR(100),
        eligibility JSON,
        documents JSON,
        faqs JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Seed services if table is empty
    const servicesCount = await query<any[]>("SELECT COUNT(*) as count FROM services");
    if (servicesCount[0].count === 0) {
      for (const s of servicesData) {
        await query(
          `INSERT INTO services (slug, title, short_desc, long_desc, timeline, eligibility, documents, faqs) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            s.slug,
            s.title,
            s.shortDesc,
            s.longDesc,
            s.timeline,
            JSON.stringify(s.eligibility),
            JSON.stringify(s.documents),
            JSON.stringify(s.faqs),
          ]
        );
      }
      console.log("Database initialized with seed services data.");
    }

    // 7. Create blogs table
    await query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        date VARCHAR(100),
        read_time VARCHAR(100),
        excerpt TEXT,
        content JSON,
        keywords JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Seed blogs if table is empty
    const blogsCount = await query<any[]>("SELECT COUNT(*) as count FROM blogs");
    if (blogsCount[0].count === 0) {
      for (const b of blogData) {
        await query(
          `INSERT INTO blogs (slug, title, category, date, read_time, excerpt, content, keywords) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            b.slug,
            b.title,
            b.category,
            b.date,
            b.readTime,
            b.excerpt,
            JSON.stringify(b.content),
            JSON.stringify(b.keywords),
          ]
        );
      }
      console.log("Database initialized with seed blog data.");
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

export default pool;
