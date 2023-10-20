"use client";

import { api } from "@/lib/api";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import router from "next/router";
import { FormEvent, useEffect, useState } from "react";

interface props {
  token: string | undefined;
  codigoEmpresa: string;
  restricaoSelected: string | undefined;
  setRestricaoSelected: any;
  openModal: any;
  setOpenModal: any;
}

export default function UpdateRestricao({
  token,
  codigoEmpresa,
  restricaoSelected,
  setRestricaoSelected,
  openModal,
  setOpenModal,
}: props) {
  const [data, setData] = useState("");
  const [inicio, setInicio] = useState("");
  const [termino, setTermino] = useState("");

  const router = useRouter();

  async function alterarRestricao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const retorno = await api.patch(
      "/restricaoagenda",
      {
        data,
        inicio,
        termino,
        codigo: restricaoSelected,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (retorno.status != 200) {
      alert("Erro ao alterar restrição da agenda");
    } else {
      setRestricaoSelected("");
      setOpenModal(undefined);
      router.refresh();
    }
  }

  async function buscarRestricao() {
    if (restricaoSelected == undefined || restricaoSelected == "") {
      return;
    }
    const retorno = await api.get(`/restricaoagenda/busca`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        codigo: restricaoSelected,
      },
    });

    if (retorno.status != 200) {
      alert("Erro ao buscar dados da Restrição");
    } else {
      const restricao = retorno.data;
      setData(restricao.data);
      setInicio(restricao.inicio);
      setTermino(restricao.termino);
      setOpenModal("form-elements");
    }
  }

  useEffect(() => {
    buscarRestricao();
  }, [restricaoSelected]);

  return (
    <>
      <Modal
        show={openModal === "form-elements"}
        size="md"
        popup
        onClose={() => {
          setRestricaoSelected("");
          setOpenModal(undefined);
          setData("");
          setInicio("");
          setTermino("");
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={alterarRestricao}>
            <div className="space-y-3">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Cadastro de Restrição da Empresa
              </h2>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="data" value="Data:" />
                </div>
                <TextInput
                  id="data"
                  type="date"
                  required
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="inicio" value="Inicio:" />
                </div>
                <TextInput
                  id="datainicio"
                  type="time"
                  required
                  value={inicio}
                  onChange={(event) => setInicio(event.target.value)}
                />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label htmlFor="termino" value="Término:" />
                </div>
                <TextInput
                  id="termino"
                  type="time"
                  required
                  value={termino}
                  onChange={(event) => setTermino(event.target.value)}
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
