"use client";

import { api } from "@/lib/api";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface props {
  token: string | undefined;
  codigoEmpresa: string;
}

export default function ButtonNewServico({ token, codigoEmpresa }: props) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("0.00");
  const [duracao, setDuracao] = useState("30");

  const props = { openModal, setOpenModal, descricao, setDescricao };
  const router = useRouter();

  async function incluirServico(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const retorno = await api.post(
      "/servico",
      {
        descricao,
        valor,
        duracao,
        empresa: codigoEmpresa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (retorno.status != 200) {
      alert("Erro ao cadastrar serviço");
    } else {
      setOpenModal(undefined);
      router.refresh();
    }
  }

  return (
    <>
      <button
        onClick={() => props.setOpenModal("form-elements")}
        className="m-auto w-fit rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800"
      >
        Incluir novo Serviço
      </button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => {
          props.setOpenModal(undefined);
          setDescricao("");
          setValor("");
          setDuracao("");
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={incluirServico}>
            <div className="space-y-3">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Cadastro de Serviço
              </h2>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="descricao" value="Descrição:" />
                </div>
                <TextInput
                  id="descricao"
                  type="text"
                  maxLength={200}
                  required
                  value={descricao}
                  onChange={(event) => setDescricao(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="valor" value="Valor (R$):" />
                </div>
                <TextInput
                  id="valor"
                  type="number"
                  maxLength={6}
                  required
                  value={valor}
                  onChange={(event) =>
                    setValor(new Number(event.target.value).toFixed(2))
                  }
                />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label htmlFor="duracao" value="Duração (minutos):" />
                </div>
                <TextInput
                  id="duracao"
                  type="number"
                  max={9999}
                  minLength={1}
                  maxLength={4}
                  required
                  value={duracao}
                  onChange={(event) => setDuracao(event.target.value)}
                />
              </div>
              <div className="mt-2 w-full">
                <div className="m-auto w-fit">
                  <Button type="submit">Confirmar</Button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
