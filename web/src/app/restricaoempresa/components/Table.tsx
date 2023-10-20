"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonUpdate from "@/components/ButtonUpdate";
import ButtonDelete from "@/components/ButtonDelete";
import UpdateRestricao from "./UpdateRestricao";

interface itemProps {
  codigo: string;
  data: string;
  inicio: string;
  termino: string;
}

interface props {
  codigoEmpresa: string;
  token: string | undefined;
  itens: Array<itemProps>;
}

export default function TableRestricao({ token, codigoEmpresa, itens }: props) {
  const [openModalUpdate, setOpenModalUpdate] = useState<string | undefined>();
  const [restricaoSelected, setRestricaoSelected] = useState<string>();
  const router = useRouter();

  async function excluirRestricao(codigo: string) {
    await api.delete(`/restricaoagenda?codigo=${codigo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    router.refresh();
  }

  function criaLinhas(indice: number, item?: itemProps) {
    let data = "";
    if (item?.data) {
      const dataArray = item?.data.split("-");
      data = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
    }
    return (
      <tr className="hover:bg-gray-100" key={indice}>
        <td className="w-[10%] border py-1 text-center max-md:hidden">
          {item?.codigo}
        </td>
        <td className="border px-2 py-1 text-center">{data}</td>
        <td className="w-[10%] border py-1 text-center">{item?.inicio}</td>
        <td className="w-[10%] border py-1 text-center">{item?.termino}</td>
        <td className="w-[12%] border py-1 text-center">
          {item?.codigo != undefined && (
            <div className="grid grid-cols-2 max-md:grid-cols-1">
              <ButtonUpdate
                title="Serviço"
                onClick={() => {
                  setRestricaoSelected(item?.codigo);
                }}
              />
              <ButtonDelete
                title="Serviço"
                onClick={() => excluirRestricao(item.codigo)}
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
            <th className="w-[10%] border px-2 py-2 max-md:hidden">Código</th>
            <th className="border px-4 py-2">Data</th>
            <th className="w-[10%] border px-4 py-2">Início</th>
            <th className="w-[10%] border px-4 py-2">Término</th>
            <th className="w-[12%] border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>{itens.map((item) => criaLinhas(++indiceLinha, item))}</tbody>
      </table>
      <UpdateRestricao
        codigoEmpresa={codigoEmpresa}
        token={token}
        restricaoSelected={restricaoSelected}
        openModal={openModalUpdate}
        setOpenModal={setOpenModalUpdate}
        setRestricaoSelected={setRestricaoSelected}
      />
    </>
  );
}
