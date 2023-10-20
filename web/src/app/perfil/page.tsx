"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { Label, TextInput } from "flowbite-react";
import { cookies } from "next/headers";
import { useState } from "react";

interface Usuario {
  nome: string;
  email: string;
}

export const metadata = {
  title: "Meu Perfil",
  description: "Meu Perfil.",
};

export default function Perfil() {
  // const token = cookies().get("token")?.value;
  const breacrumb = [{ link: "", nome: "Meu Perfil" }];
  const user = {
    avatarUrl:
      "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
    firstName: "teste",
    lastName: "as",
    bio: "ascasc",
    email: "casv",
    website: "va",
    phone: "asc",
  };
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Aqui, você pode adicionar a lógica para salvar as alterações no perfil do usuário
    setEditing(false);
    // Você pode enviar as novas informações para um servidor ou atualizar o estado no componente pai
  };

  return (
    <>
      <Breadcrumb items={breacrumb} />
      <div className="flex h-full w-full items-center align-middle ">
        <div className="m-auto w-96 rounded-lg bg-white p-8 text-center shadow-2xl">
          <h1 className="mb-5 text-5xl font-bold">Perfil</h1>
          <img
            src={avatarUrl} // Usar o estado atualizado
            alt={`Foto de perfil de ${firstName} ${lastName}`}
            className="mx-auto mb-4 h-32 w-32 rounded-full"
          />
          <div className="text-start">
            <div className="mb-3">
              <Label
                className="ml-1"
                htmlFor="firstName"
                value="Primeiro Nome:"
              />
              <TextInput
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Primeiro Nome"
                disabled={!editing}
              />
            </div>
            <div className="mb-3">
              <Label className="ml-1" htmlFor="lastName" value="Último Nome:" />
              <TextInput
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Último Nome"
                disabled={!editing}
              />
            </div>
            <div className="mb-3">
              <Label className="ml-1" htmlFor="telefone" value="Telefone:" />
              <TextInput
                id="telefone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefone"
                disabled={!editing}
              />
            </div>
          </div>

          <div className="mb-4">
            {editing ? (
              <>
                <button
                  onClick={handleSaveClick}
                  className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
