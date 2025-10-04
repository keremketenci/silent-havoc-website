import { NextRequest, NextResponse } from "next/server";

// const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const ACCESS_TOKEN = "IGAAQKVbH4Y8hBZAFRqdUtEOEtaRnk0ZAXdLTzBqbDhvNjAxMFB5RlJzbUNkc0p6ZAjFNRWljUmRhRUlGV1BEMHFSMlBJdkxhMDZATenZAja2JKU2N3blFPMTJDODR6aFV2SXRYSkc2QkFjYnFzVzFQZAFJndXZAZAeDlFYVljOHVGZAXlQSQZDZD";

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
