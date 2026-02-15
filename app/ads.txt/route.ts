import { NextResponse } from "next/server";

const AUTH_STRING = "google.com, %PUBLISHER_ID%, DIRECT, f08c47fec0942fa0";

export const dynamic = "force-static";

export async function GET() {
  const publisherId =
    process.env.ADSENSE_PUBLISHER_ID?.trim() ||
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID?.trim() ||
    "pub-YOUR_PUBLISHER_ID";
  const content = AUTH_STRING.replace("%PUBLISHER_ID%", publisherId);

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
