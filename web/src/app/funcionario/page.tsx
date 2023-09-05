import Breadcrumb from "@/components/Breadcrumb";
import { api } from "@/lib/api";
import { getEmpresa } from "@/lib/auth";
import { cookies } from "next/headers";
import TableFuncionario from "./components/Table";
import ButtonNewFuncionario from "./components/NewFuncionario";

interface Funcionario {
  codigo: string;
  nome: string;
  salario: string;
  tipo: string;
  ativo: string;
}

export const metadata = {
  title: "Funcionário",
  description: "Funcionários da Empresa.",
};

export default async function Funcionario() {
  const token = cookies().get("token")?.value;
  const { sub } = getEmpresa();
  const breacrumb = [{ link: "", nome: "Funcionários" }];

  const response = await api.get(`/funcionarios?empresa=${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const funcionarios: Array<Funcionario> = response.data;
  return (
    <>
      <Breadcrumb items={breacrumb} />
      <div className="mb-4 mt-4">
        <ButtonNewFuncionario codigoEmpresa={sub} token={token} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <TableFuncionario itens={funcionarios} token={token} codigoEmpresa={sub} />
      </div>
    </>
  );
}
