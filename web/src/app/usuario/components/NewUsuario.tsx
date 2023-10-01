"use client";

import { api } from "@/lib/api";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface props {
  token: string | undefined;
}

export default function ButtonNewUsuario({ token }: props) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const props = { openModal, setOpenModal };
  const router = useRouter();

  async function incluirUsuario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const retorno = await api.post(
      "/usuario/register",
      {
        firstName,
        lastName,
        email,
        password: "123456789",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (retorno.status != 200) {
      alert("Erro ao cadastrar usuário");
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
        Incluir Usuário
      </button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => {
          props.setOpenModal(undefined);
          setFirstName("");
          setLastName("");
          setEmail("");
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={incluirUsuario}>
            <div className="space-y-3">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                Cadastro de Usuário
              </h2>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="firstName" value="Primeiro Nome:" />
                </div>
                <TextInput
                  id="firstName"
                  type="text"
                  maxLength={50}
                  required
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="lastName" value="Último Nome:" />
                </div>
                <TextInput
                  id="lastName"
                  type="text"
                  maxLength={100}
                  required
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="email" value="Email:" />
                </div>
                <TextInput
                  id="email"
                  type="text"
                  maxLength={200}
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
