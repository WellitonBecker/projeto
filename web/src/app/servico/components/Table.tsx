"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import UpdateServico from "./UpdateServico";
import { useState } from "react";
import ButtonUpdate from "@/components/ButtonUpdate";
import ButtonDelete from "@/components/ButtonDelete";

interface itemProps {
  sequencia: string;
  descricao: string;
  valor: string;
  duracao: string;
}

interface props {
  codigoEmpresa: string;
  token: string | undefined;
  itens: Array<itemProps>;
}

export default function TableServico({ token, codigoEmpresa, itens }: props) {
  const [openModalUpdate, setOpenModalUpdate] = useState<string | undefined>();
  const [servicoSelected, setServicoSelected] = useState<string>();
  const router = useRouter();

  async function excluirServico(sequencia: string) {
    await api.delete(
      `/servico?sequencia=${sequencia}&empresa=${codigoEmpresa}`,
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
        <td className="w-[10%] border py-1 text-center max-md:hidden">
          {item?.sequencia}
        </td>
        <td className="border px-2 py-1">{item?.descricao}</td>
        <td className="w-[5%] border py-1 text-center">
          {item != undefined &&
            parseFloat(item.valor).toFixed(2).toString().replace(".", ",")}
        </td>
        <td className="w-[5%] border py-1 text-center">{item?.duracao}</td>
        <td className="w-[12%] border py-1 text-center">
          {item?.sequencia != undefined && (
            <div className="grid grid-cols-2 max-md:grid-cols-1">
              <ButtonUpdate
                title="Serviço"
                onClick={() => {
                  setServicoSelected(item?.sequencia);
                }}
              />
              <ButtonDelete
                title="Serviço"
                onClick={() => excluirServico(item.sequencia)}
              />
            </div>
          )}
        </td>
      </tr>
    );
  }
  let indiceLinha = 0;
  return (
    <>
      <table className="w-full table-auto">
        <thead className="sticky bg-gray-300">
          <tr>
            <th className="w-[10%] border px-2 py-2 max-md:hidden">
              Sequência
            </th>
            <th className="border px-4 py-2">Descrição</th>
            <th className="w-[5%] border px-4 py-2">Valor</th>
            <th className="w-[5%] border px-4 py-2">Duração</th>
            <th className="w-[12%] border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>{itens.map((item) => criaLinhas(++indiceLinha, item))}</tbody>
      </table>
      <UpdateServico
        codigoEmpresa={codigoEmpresa}
        token={token}
        servicoSelected={servicoSelected}
        openModal={openModalUpdate}
        setOpenModal={setOpenModalUpdate}
      />
    </>
  );
}
