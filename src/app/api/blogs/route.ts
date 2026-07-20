import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import { blogData, BlogPost } from "@/data/blogData";

function formatBlogRow(row: any): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category || "",
    date: row.date || "",
    readTime: row.read_time || "",
    excerpt: row.excerpt || "",
    content: typeof row.content === "string" ? JSON.parse(row.content) : (row.content || []),
    keywords: typeof row.keywords === "string" ? JSON.parse(row.keywords) : (row.keywords || []),
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    await initializeDatabase();

    if (slug) {
      const rows = await query<any[]>("SELECT * FROM blogs WHERE slug = ? LIMIT 1", [slug]);
      if (rows && rows.length > 0) {
        return NextResponse.json(formatBlogRow(rows[0]));
      }
      const staticPost = blogData.find((b) => b.slug === slug);
      if (staticPost) return NextResponse.json(staticPost);
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    const rows = await query<any[]>("SELECT * FROM blogs ORDER BY id DESC");
    if (rows && rows.length > 0) {
      return NextResponse.json(rows.map(formatBlogRow));
    }

    return NextResponse.json(blogData);
  } catch (error: any) {
    console.error("API Blogs GET Error:", error);
    return NextResponse.json(blogData);
  }
}
