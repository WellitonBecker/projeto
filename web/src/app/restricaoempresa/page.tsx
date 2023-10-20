import Breadcrumb from "@/components/Breadcrumb";
import { getEmpresa } from "@/lib/auth";
import { cookies } from "next/headers";
import ButtonNewRestricao from "./components/NewRestricao";
import { api } from "@/lib/api";
import TableRestricao from "./components/Table";

interface Restricao {
  codigo: string;
  data: string;
  inicio: string;
  termino: string;
}

export const metadata = {
  title: "Restrições da Empresa",
  description: "Restrições da Empresa ",
};

export default async function Page() {
  const breacrumb = [{ link: "", nome: "Restrições da Empresa" }];
  const token = cookies().get("token")?.value;
  const { sub } = getEmpresa();

  const response = await api.get(`/restricaoagenda?empresa=${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const restricoes: Array<Restricao> = response.data;

  return (
    <>
      <Breadcrumb items={breacrumb} />
      <div className="mb-4 mt-4">
        <ButtonNewRestricao codigoEmpresa={sub} token={token} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <TableRestricao itens={restricoes} token={token} codigoEmpresa={sub} />
      </div>
    </>
  );
}
