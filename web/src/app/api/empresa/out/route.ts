import { NextRequest, NextResponse } from "next/server";
const urlBase = String(process.env.NEXT_URL_BASE);

export async function GET(request: NextRequest) {
  return NextResponse.redirect(urlBase, {
    headers: {
      "Set-Cookie": `empresa=; Path=/; max-age=0;`,
    },
  });
}
