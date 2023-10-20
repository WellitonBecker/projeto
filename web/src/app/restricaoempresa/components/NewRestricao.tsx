"use client";

import { api } from "@/lib/api";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface props {
  token: string | undefined;
  codigoEmpresa: string;
}

export default function ButtonNewRestricao({ token, codigoEmpresa }: props) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [data, setData] = useState("");
  const [inicio, setInicio] = useState("08:00");
  const [termino, setTermino] = useState("18:00");

  const router = useRouter();

  async function incluirRestricao(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const retorno = await api.post(
      "/restricaoagenda",
      {
        data,
        inicio,
        termino,
        empresa: codigoEmpresa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (retorno.status != 200) {
      alert("Erro ao cadastrar restrição da agenda");
    } else {
      setOpenModal(undefined);
      router.refresh();
    }
  }

  return (
    <>
      <button
        onClick={() => setOpenModal("form-elements")}
        className="m-auto w-fit rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800"
      >
        Incluir Restrição
      </button>
      <Modal
        show={openModal === "form-elements"}
        size="md"
        popup
        onClose={() => {
          setOpenModal(undefined);
          setData("");
          setInicio("");
          setTermino("");
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={incluirRestricao}>
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
