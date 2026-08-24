const mysql = require("mysql2/promise");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
require("dotenv").config(); // fallback for production passenger environment

const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "u686584126_kirsdb";
const dbPass = process.env.DB_PASSWORD || "Kirs@2026Db";
const dbName = process.env.DB_NAME || "u686584126_kirsdb";

const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function query(sql, params = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (err) {
    console.error("Database query execution error:", err.message);
    throw err;
  }
}

async function initializeDatabase() {
  try {
    // 1. Create contacts table
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL DEFAULT '',
        email VARCHAR(255) NOT NULL DEFAULT '',
        phone VARCHAR(50) NOT NULL DEFAULT '',
        company VARCHAR(255) DEFAULT '',
        service VARCHAR(255) DEFAULT '',
        date VARCHAR(50) DEFAULT '',
        slot VARCHAR(50) DEFAULT '',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 2. Create service_enquiries table
    await query(`
      CREATE TABLE IF NOT EXISTS service_enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL DEFAULT '',
        email VARCHAR(255) NOT NULL DEFAULT '',
        phone VARCHAR(50) NOT NULL DEFAULT '',
        company VARCHAR(255) DEFAULT '',
        service VARCHAR(255) DEFAULT '',
        date VARCHAR(50) DEFAULT '',
        slot VARCHAR(50) DEFAULT '',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // 3. Create queries table
    await query(`
      CREATE TABLE IF NOT EXISTS queries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL DEFAULT 'contact',
        name VARCHAR(255) DEFAULT '',
        email VARCHAR(255) DEFAULT '',
        phone VARCHAR(50) DEFAULT '',
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

    // 5. Seed initial reviews if table is empty
    const reviewsCount = await query("SELECT COUNT(*) as count FROM reviews");
    if (reviewsCount && reviewsCount[0] && reviewsCount[0].count === 0) {
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

    console.log("MySQL Database connection and table verification successful!");
  } catch (error) {
    console.error("Express DB Initialization Notice:", error.message);
  }
}

module.exports = {
  pool,
  query,
  initializeDatabase,
};
