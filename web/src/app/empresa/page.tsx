"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";

export const metadata = {
  title: "Empresa",
  description: "Empresa",
};

export default function Page() {
  const breacrumb = [{ link: "", nome: "Empresa" }];
  const user = {
    avatarUrl:
      "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
    nome: "BELLEAPP",
    bio: "ascasc",
    email: "casv",
    website: "va",
    phone: "asc",
    endereco: "asc",
  };
  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState(user.nome);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [endereco, setEndereco] = useState(user.endereco);

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
          <h1 className="mb-5 text-5xl font-bold">Empresa</h1>
          <img
            src={avatarUrl} // Usar o estado atualizado
            alt={`Foto de perfil de ${nome}`}
            className="mx-auto mb-4 h-32 w-32 rounded-full"
          />
          {editing ? (
            <div className="space-y-3 text-start">
              <div className="mb-4 ">
                <Label htmlFor="nome" value="Nome:" />
                <TextInput
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="email" value="Email:" />
                <TextInput
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="telefone" value="Telefone:" />
                <TextInput
                  id="telefone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefone"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="endereco" value="Endereço:" />
                <TextInput
                  id="endereco"
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Endereço"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <h2 className="mb-2 text-2xl font-semibold">{nome}</h2>
              </div>
              <div className="mb-4">
                <Label htmlFor="email" value="Email:" />
                <p className="text-lg font-semibold">{email}</p>
              </div>
              <div className="mb-4">
                <Label htmlFor="telefone" value="Telefone:" />
                <p className="text-lg font-semibold">{phone}</p>
              </div>
              <div className="mb-4">
                <Label htmlFor="endereco" value="Endereço:" />
                <p className="text-lg font-semibold">{endereco}</p>
              </div>
            </div>
          )}

          <div className="mb-4 mt-4">
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
