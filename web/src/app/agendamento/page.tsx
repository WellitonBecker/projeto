import { api } from "@/lib/api";
import { getEmpresa } from "@/lib/auth";
import { cookies } from "next/headers";
import React, { useState } from "react";
import Servico from "../servico/page";
import Breadcrumb from "@/components/Breadcrumb";
import Agenda from "./components/Agenda";

export const metadata = {
  title: "Agendamentos",
  description: "Agendamentos da Empresa.",
};

export default async function Page() {
  const breacrumb = [{ link: "", nome: "Agendamento" }];
  const token = cookies().get("token")?.value;
  const { sub } = getEmpresa();

  const response = await api.get(`/agendamentos/empresa?empresa=${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <>
      <Breadcrumb items={breacrumb} />
      <Agenda itens={response.data} />
    </>
  );
}
