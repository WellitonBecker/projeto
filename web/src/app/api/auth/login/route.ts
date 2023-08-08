import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

const urlBase = String(process.env.NEXT_URL_BASE)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  const cookieExpiredInSeconds = 60 * 60 * 24 * 30;

  return NextResponse.redirect(urlBase, {
    headers: {
      "Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpiredInSeconds};`,
    },
  });
}
