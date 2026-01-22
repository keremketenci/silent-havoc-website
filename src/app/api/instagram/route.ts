import { NextRequest, NextResponse } from "next/server";

// const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const ACCESS_TOKEN = "IGAAQKVbH4Y8hBZAFlhVmJaSlFCSl9iX0VPTzloOUpmYkNZAb25YSEVaS0ZAmV1RmMVBvbkh4ZAFhiSFJEVUZAZAT3hUUG5rZADFSOFlGMlV1RmZAWdy1wVlVaZA3ZAEaWE2TlRhYWtLV3pMcEV1R282dldKbWpfYzVCQ3d2QU1ZATGNFRkdUVQZDZD";

export async function GET(req: NextRequest) {
  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${ACCESS_TOKEN}`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch Instagram posts" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
