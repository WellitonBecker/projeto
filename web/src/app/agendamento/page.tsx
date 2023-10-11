import { api } from "@/lib/api";
import { getEmpresa } from "@/lib/auth";
import { cookies } from "next/headers";
import React from "react";
import Agenda from "./components/Agenda";

interface Agendamento {
  codigo: string;
  cliente: string;
  servico: string;
  funcionario: string;
  codigoFuncionario: string;
  valor: string;
  situacao: string;
  dataHora: string;
}

export const metadata = {
  title: "Agendamentos",
  description: "Agendamentos da Empresa.",
};

export default async function Page() {
  const token = cookies().get("token")?.value;
  const { sub } = getEmpresa();

  const responseFuncionarios = await api.get(`/funcionarios?empresa=${sub}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const responseAgendamentos = await api.get(
    `/agendamentos/empresa?empresa=${sub}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const agendamentosFunc = responseAgendamentos.data.reduce(
    (agrupados: any, agendamento: Agendamento) => {
      const funcionario = agendamento.codigoFuncionario;
      if (!agrupados[funcionario]) {
        agrupados[funcionario] = [];
      }
      agrupados[funcionario].push(agendamento);
      return agrupados;
    },
    {}
  );

  const responseAgendamentosDisp = await api.get(
    `/agendamentos/empresa/apenasdisponiveis?empresa=${sub}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const agendamentosFuncDisp = responseAgendamentosDisp.data.reduce(
    (agrupados: any, agendamento: Agendamento) => {
      const funcionario = agendamento.codigoFuncionario;
      if (!agrupados[funcionario]) {
        agrupados[funcionario] = [];
      }
      agrupados[funcionario].push(agendamento);
      return agrupados;
    },
    {}
  );

  return (
    <>
      <Agenda
        funcionarios={responseFuncionarios.data}
        agendamentosFunc={agendamentosFunc}
        agendamentosFuncDisp={agendamentosFuncDisp}
      />
    </>
  );
}
