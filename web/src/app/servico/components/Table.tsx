"use client";

import { Table } from "flowbite-react";

interface props {
  itens: Array<{
    sequencia: string;
    descricao: string;
    valor: string;
    duracao: string;
  }>;
}

export default function TableServico({ itens }: props) {
  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Sequencia</Table.HeadCell>
        <Table.HeadCell>Descrição</Table.HeadCell>
        <Table.HeadCell>Valor</Table.HeadCell>
        <Table.HeadCell>Duração</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Ações</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {itens.map((item) => {
          return (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              id={item.sequencia}
            >
              <Table.Cell>{item.sequencia}</Table.Cell>
              <Table.Cell>{item.descricao}</Table.Cell>
              <Table.Cell>{item.valor}</Table.Cell>
              <Table.Cell>{item.duracao}</Table.Cell>
              <Table.Cell>
                <div className="grid max-w-[100px] grid-cols-2 max-md:grid-cols-1">
                  <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href="/tables"
                  >
                    <p>Alterar</p>
                  </a>
                  <a
                    className="font-medium text-red-600 hover:underline"
                    href="/tables"
                  >
                    <p>Excluir</p>
                  </a>
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
