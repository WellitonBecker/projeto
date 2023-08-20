import { api } from "@/lib/api";
import CardEmpresa from "../CardEmpresa";
import { cookies } from "next/headers";
import ButtonNewEmpresa from "../NewEmpresa";
import { NextResponse } from "next/server";

interface Empresa {
  codigo: string;
  nome: string;
  telefone: string;
  endereco: string;
}

export default async function LayoutMinhasEmpresas() {
  const token = cookies().get("token")?.value;
  const response = await api.get("/empresas/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const empresas :Array<Empresa> = response.data;

  return (
    <main className="relative h-screen w-screen bg-gray-100 ">
      <div className="absolute right-6 top-6 ">
        <ButtonNewEmpresa token={token} />
      </div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid grid-cols-4 gap-4 p-14 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {empresas.map((empresa) => {
            const info = new Array()
            if(empresa.telefone){
              info.push(`Telefone: ${empresa.telefone}`)
            }
            if(empresa.endereco){
              info.push(`Endereço: ${empresa.endereco}`)
            }
            return (
              <CardEmpresa
                title={empresa.nome}
                codigo={empresa.codigo}
                token={token}
                info={info}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
