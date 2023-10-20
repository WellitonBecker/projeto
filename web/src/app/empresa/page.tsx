"use client";
import Breadcrumb from "@/components/Breadcrumb";
import { Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import imagemLogo from "../../assets/logo-belleapp.svg";
import Image from "next/image";

export const metadata = {
  title: "Empresa",
  description: "Empresa",
};

export default function Page() {
  // const imagemLogo = Image
  const breacrumb = [{ link: "", nome: "Empresa" }];
  const user = {
    // avatarUrl:
    //   "http://cbissn.ibict.br/images/phocagallery/galeria2/thumbs/phoca_thumb_l_image03_grd.png",
    avatarUrl: "../../assets/logo.png",
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

  const horariosEmpresa = [
    { periodo: 0, horarioinicio: "", horariotermino: "" },
    { periodo: 1, horarioinicio: "08:00", horariotermino: "18:00" },
    { periodo: 2, horarioinicio: "08:00", horariotermino: "18:00" },
    { periodo: 3, horarioinicio: "08:00", horariotermino: "18:00" },
    { periodo: 4, horarioinicio: "08:00", horariotermino: "18:00" },
    { periodo: 5, horarioinicio: "08:00", horariotermino: "18:00" },
    { periodo: 6, horarioinicio: "", horariotermino: "" },
  ];

  const listaPeriodos = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  return (
    <>
      <Breadcrumb items={breacrumb} />
      <div className="flex h-full w-full items-center align-middle ">
        <div className="m-auto rounded-lg bg-white p-8 text-center shadow-2xl">
          <h1 className="mb-5 text-5xl font-bold">Empresa</h1>

          <fieldset className="flex items-center gap-8 border border-gray-100 p-5 text-start">
            {/* <img
              src={avatarUrl} // Usar o estado atualizado
              alt={`Foto de perfil de ${nome}`}
              className="mx-auto mb-4 mr-5 h-32 w-32 rounded-full"
            /> */}
            <Image
              src={imagemLogo}
              width={5}
              height={5}
              alt={`Foto de perfil de ${nome}`}
              className="mx-auto mb-4 mr-5 h-32 w-32 rounded-full"
            />
            <div className="w-72 ">
              <div className="mb-3">
                <Label className="ml-1" htmlFor="nome" value="Nome:" />
                <TextInput
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Nome"
                  disabled={!editing}
                />
              </div>
              <div className="mt-3">
                <Label className="ml-1" htmlFor="email" value="Email:" />
                <TextInput
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  disabled={!editing}
                />
              </div>
              <div className="mt-3">
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
              <div className="mt-3">
                <Label className="ml-1" htmlFor="endereco" value="Endereço:" />
                <TextInput
                  id="endereco"
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Endereço"
                  disabled={!editing}
                />
              </div>
            </div>
            <div>
              {horariosEmpresa.map((periodo, index) => {
                return (
                  <div className="flex gap-2 p-1">
                    <Select id="periodo" disabled>
                      {listaPeriodos.map((periodoOption, indexOption) => {
                        const selected = index == indexOption;
                        return (
                          <option value={indexOption} selected={selected}>
                            {periodoOption}
                          </option>
                        );
                      })}
                    </Select>
                    <TextInput
                      id={`horarioInicio${index}`}
                      value={periodo.horarioinicio}
                      type="time"
                      disabled={!editing}
                    />
                    <TextInput
                      id={`horarioTermino${index}`}
                      value={periodo.horariotermino}
                      type="time"
                      disabled={!editing}
                    />
                  </div>
                );
              })}
            </div>
          </fieldset>
          <div className="mb-4 mt-4">
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
                  className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
