import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET() {
  const results: any = {};
  
  // Test 1: Configured DB Host
  try {
    const config1 = {
      host: process.env.DB_HOST || "193.203.184.226",
      user: process.env.DB_USER || "u686584126_kirsdb",
      password: process.env.DB_PASSWORD || "Kirs@2026Db",
      database: process.env.DB_NAME || "u686584126_kirsdb",
      connectTimeout: 3000 // 3 seconds timeout
    };
    results.configuredHost = { host: config1.host, user: config1.user };
    const conn = await mysql.createConnection(config1);
    await conn.execute("SELECT 1");
    await conn.end();
    results.configuredHost.status = "SUCCESS";
  } catch (err: any) {
    results.configuredHost.status = "FAILED";
    results.configuredHost.error = err.message || String(err);
  }

  // Test 2: Localhost DB Host
  try {
    const config2 = {
      host: "localhost",
      user: process.env.DB_USER || "u686584126_kirsdb",
      password: process.env.DB_PASSWORD || "Kirs@2026Db",
      database: process.env.DB_NAME || "u686584126_kirsdb",
      connectTimeout: 3000
    };
    results.localhostHost = { host: "localhost", user: config2.user };
    const conn = await mysql.createConnection(config2);
    await conn.execute("SELECT 1");
    await conn.end();
    results.localhostHost.status = "SUCCESS";
  } catch (err: any) {
    results.localhostHost.status = "FAILED";
    results.localhostHost.error = err.message || String(err);
  }

  // Test 3: 127.0.0.1 DB Host
  try {
    const config3 = {
      host: "127.0.0.1",
      user: process.env.DB_USER || "u686584126_kirsdb",
      password: process.env.DB_PASSWORD || "Kirs@2026Db",
      database: process.env.DB_NAME || "u686584126_kirsdb",
      connectTimeout: 3000
    };
    results.ipHost = { host: "127.0.0.1", user: config3.user };
    const conn = await mysql.createConnection(config3);
    await conn.execute("SELECT 1");
    await conn.end();
    results.ipHost.status = "SUCCESS";
  } catch (err: any) {
    results.ipHost.status = "FAILED";
    results.ipHost.error = err.message || String(err);
  }

  return NextResponse.json(results);
}
