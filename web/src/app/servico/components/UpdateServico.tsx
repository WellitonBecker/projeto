"use client";

import { api } from "@/lib/api";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import router from "next/router";
import { FormEvent, useEffect, useState } from "react";

interface props {
  token: string | undefined;
  codigoEmpresa: string;
  servicoSelected: string | undefined;
  openModal: any;
  setOpenModal: any;
}

export default function UpdateServico({
  token,
  codigoEmpresa,
  servicoSelected,
  openModal,
  setOpenModal,
}: props) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [duracao, setDuracao] = useState("");

  const router = useRouter();

  async function alterarServico(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const retorno = await api.patch(
      "/servico",
      {
        descricao,
        valor: valor.toString(),
        duracao: duracao.toString(),
        empresa: codigoEmpresa,
        ativo: 1,
        sequencia: servicoSelected,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (retorno.status != 200) {
      alert("Erro ao alterar serviço");
    } else {
      setOpenModal(undefined);
      router.refresh();
    }
  }

  async function buscarServico() {
    if (servicoSelected == undefined) {
      return;
    }
    const retorno = await api.get(`/servico/busca`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        empresa: codigoEmpresa,
        sequencia: servicoSelected,
      },
    });

    if (retorno.status != 200) {
      alert("Erro ao buscar dados do serviço");
    } else {
      const servico = retorno.data;
      setDescricao(servico.descricao);
      setDuracao(servico.duracao);
      setValor(parseFloat(servico.valor).toFixed(2));
      setOpenModal("form-elements");
    }
  }

  useEffect(() => {
    buscarServico();
  }, [servicoSelected]);

  return (
    <>
      <Modal
        show={openModal === "form-elements"}
        size="md"
        popup
        onClose={() => {
          setOpenModal(undefined);
          setDescricao("");
          setValor("");
          setDuracao("");
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={alterarServico}>
            <div className="space-y-3">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Alterar Serviço
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
