"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface itemProps {
  codigo: string;
  nome: string;
  salario: string;
  tipo: string;
  ativo: string;
}

interface props {
  codigoEmpresa: string;
  token: string | undefined;
  itens: Array<itemProps>;
}

export default function TableFuncionario({
  token,
  codigoEmpresa,
  itens,
}: props) {
  const router = useRouter();

  async function excluirFuncionario(funcioario: string) {
    await api.delete(
      `/funcionario?funcionario=${funcioario}&empresa=${codigoEmpresa}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    router.refresh();
  }

  function criaLinhas(indice: number, item?: itemProps) {
    return (
      <tr className="hover:bg-gray-100" key={indice}>
        <td className="border py-1 text-center max-md:hidden">
          {item?.codigo}
        </td>
        <td className="border px-2 py-1">{item?.nome}</td>
        <td className="border py-1 text-center">{item?.salario}</td>
        <td className="border py-1 text-center max-md:w-[25%]">{item?.tipo}</td>
        <td className="border py-1 text-center max-md:hidden">{item?.ativo}</td>
        <td className="border py-1 text-center">
          {item?.codigo != undefined && (
            <div className="grid grid-cols-2 items-center max-md:grid-cols-1">
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Alterar</p>
              </a>
              <a
                className="font-medium text-red-600 hover:underline"
                onClick={() => excluirFuncionario(item.codigo)}
              >
                <p>Excluir</p>
              </a>
            </div>
          )}
        </td>
      </tr>
    );
  }

  let indiceLinha = 0;
  return (
    <table className="w-full table-auto">
      <thead className="sticky bg-gray-300">
        <tr>
          <th className="w-[10%] border px-2 py-2 max-md:hidden">Código</th>
          <th className="border px-4 py-2">Nome</th>
          <th className="w-[5%] border px-4 py-2">Salário</th>
          <th className="w-[15%] border px-4 py-2 max-md:w-[25%]">Tipo</th>
          <th className="w-[5%] border px-4 py-2 max-md:hidden">Ativo</th>
          <th className="w-[13%] border px-4 py-2 max-lg:w-[15%]">Ações</th>
        </tr>
      </thead>
      <tbody>{itens.map((item) => criaLinhas(++indiceLinha, item))}</tbody>
    </table>
  );
}
