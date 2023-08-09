import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

const urlBase = String(process.env.NEXT_URL_BASE);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const empresa = searchParams.get("empresa");
  const tokenUsuario = searchParams.get("tokenUsuario");

  const response = await api.get('/empresa/token', {
    params: {
      codigo: empresa,
    },
    headers: {
      Authorization: `Bearer ${tokenUsuario}`,
    },
  })
  
  const {tokenEmpresa} = response.data
  const cookieExpiredInSeconds = 60 * 60 * 24 * 30;

  return NextResponse.redirect(urlBase, {
    headers: {
      "Set-Cookie": `empresa=${tokenEmpresa}; Path=/; max-age=${cookieExpiredInSeconds};`,
    },
  });
}
