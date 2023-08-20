"use client";

import { api } from "@/lib/api";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface props {
  token: string | undefined;
}

export default function ButtonNewEmpresa({ token }: props) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const props = { openModal, setOpenModal, email, setEmail };
  const router = useRouter();

  async function incluirEmpresa(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const retorno = await api.post(
      "/empresa",
      {
        email,
        nome,
        telefone,
        endereco,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (retorno.status != 200) {
      alert("Erro ao cadastrar empresa");
    } else {
      setOpenModal(undefined);
      const { codigo } = retorno.data;
      router.push(
        `/api/empresa?empresa=${parseInt(codigo)}&tokenUsuario=${token}`
      );
    }
  }

  return (
    <>
      <button
        onClick={() => props.setOpenModal("form-elements")}
        className="m-auto w-fit rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800"
      >
        Incluir nova Empresa
      </button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={incluirEmpresa}>
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Cadastro de Empresa
              </h2>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="nome_empresa" value="Nome:" />
                </div>
                <TextInput
                  id="nome_empresa"
                  type="text"
                  maxLength={100}
                  required
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="email" value="Email:" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  maxLength={200}
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="telefone" value="Telefone:" />
                </div>
                <TextInput
                  id="telefone"
                  type="text"
                  maxLength={15}
                  required
                  value={telefone}
                  onChange={(event) => setTelefone(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="endereco" value="Endereço:" />
                </div>
                <TextInput
                  id="endereco"
                  type="text"
                  maxLength={100}
                  required
                  value={endereco}
                  onChange={(event) => setEndereco(event.target.value)}
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
