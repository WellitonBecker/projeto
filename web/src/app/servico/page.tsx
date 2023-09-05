import Breadcrumb from "@/components/Breadcrumb";
import TableServico from "./components/Table";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { getEmpresa } from "@/lib/auth";
import ButtonNewServico from "./components/NewServico";

interface Servico {
  sequencia: string;
  descricao: string;
  valor: string;
  duracao: string;
}

export const metadata = {
  title: "Serviço",
  description: "Serviços da Empresa.",
};

export default async function Servico() {
  const breacrumb = [{ link: "", nome: "Serviços" }];
  const token = cookies().get("token")?.value;
  const { sub } = getEmpresa();

  const response = await api.get(`/servicos?empresa=${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const servicos: Array<Servico> = response.data;
  return (
    <>
      <Breadcrumb items={breacrumb} />
      <div className="mb-4 mt-4">
        <ButtonNewServico codigoEmpresa={sub} token={token} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <TableServico itens={servicos} token={token} codigoEmpresa={sub} />
      </div>
    </>
  );
}
