"use client";

import { api } from "@/lib/api";
import { Table } from "flowbite-react";
import { useRouter } from "next/navigation";

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
      <Table.Row
        className="overflow-auto bg-white dark:border-gray-700 dark:bg-gray-800"
        id={item?.sequencia}
        key={indice}
      >
        <Table.Cell className="max-md:hidden">{item?.sequencia}</Table.Cell>
        <Table.Cell>{item?.descricao}</Table.Cell>
        <Table.Cell>{item?.valor}</Table.Cell>
        <Table.Cell>{item?.duracao}</Table.Cell>
        <Table.Cell>
          {item?.sequencia != undefined && (
            <div className="grid max-w-[100px] grid-cols-2 max-md:grid-cols-1">
              <a
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                href="/tables"
              >
                <p>Alterar</p>
              </a>
              <a
                className="font-medium text-red-600 hover:underline"
                onClick={() => excluirServico(item.sequencia)}
              >
                <p>Excluir</p>
              </a>
            </div>
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
  let indiceLinha = 0;

  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell className="max-md:hidden">Sequencia</Table.HeadCell>
        <Table.HeadCell>Descrição</Table.HeadCell>
        <Table.HeadCell>Valor</Table.HeadCell>
        <Table.HeadCell>Duração</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Ações</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y overflow-y-auto">
        {itens.map((item) => criaLinhas(++indiceLinha, item))}
        {Array.from({ length: 15 - itens.length }).map(() =>
          criaLinhas(++indiceLinha)
        )}
      </Table.Body>
    </Table>
  );
}
