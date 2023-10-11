import Breadcrumb from "@/components/Breadcrumb";
import { api } from "@/lib/api";
import { getEmpresa } from "@/lib/auth";
import { cookies } from "next/headers";
import ButtonNewUsuario from "./components/NewUsuario";
import TableUsuario from "./components/Table";

interface Usuario {
  nome: string;
  telefone: string;
}

export const metadata = {
  title: "Usuário",
  description: "Usuários.",
};

export default async function Produto() {
  const token = cookies().get("token")?.value;

  const response = await api.get(`/usuario/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const breacrumb = [{ link: "", nome: "Usuários" }];
  const usuarios: Array<Usuario> = response.data;
  return (
    <>
      <Breadcrumb items={breacrumb} />
      <div className="mb-4 mt-4">
        <ButtonNewUsuario token={token} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <TableUsuario itens={usuarios} />
      </div>
    </>
  );
}
