'use client'
import Breadcrumb from "@/components/Breadcrumb";
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
        <div className="rounded-lg bg-white p-8 text-center shadow-2xl m-auto w-96">
          <img
            src={avatarUrl} // Usar o estado atualizado
            alt={`Foto de perfil de ${firstName} ${lastName}`}
            className="mx-auto mb-4 h-32 w-32 rounded-full"
          />
          {editing ? (
            <div className="mb-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mr-2 border border-gray-300 p-2"
                placeholder="Primeiro Nome"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="ml-2 border border-gray-300 p-2"
                placeholder="Último Nome"
              />
            </div>
          ) : (
            <div className="mb-4">
              <h2 className="mb-2 text-2xl font-semibold">
                {firstName} {lastName}
              </h2>
            </div>
          )}
          {editing && (
            <div className="mb-4">
              <input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="border border-gray-300 p-2"
                placeholder="URL da Imagem do Avatar"
              />
            </div>
          )}

          <div className="mb-4">
            <div>
              <label className="text-gray-600">Email:</label>
              {editing ? (
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-2"
                  placeholder="Email"
                />
              ) : (
                <p className="text-lg font-semibold">{email}</p>
              )}
            </div>
            <div className="mt-4">
              <label className="text-gray-600">Telefone:</label>
              {editing ? (
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 p-2"
                  placeholder="Telefone"
                />
              ) : (
                <p className="text-lg font-semibold">{phone}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            {editing ? (
              <button
                onClick={handleSaveClick}
                className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Salvar
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Editar
              </button>
            )}

            {editing && (
              <button
                onClick={() => setEditing(false)}
                className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
