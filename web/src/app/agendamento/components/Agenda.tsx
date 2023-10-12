"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import Breadcrumb from "@/components/Breadcrumb";
import DetalhesPedido from "./DetalhesPedido";

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

interface Funcionario {
  codigo: string;
  nome: string;
}

interface AgendaProps {
  codigoEmpresa: string;
  token: string | undefined;
  funcionarios: Array<Funcionario>;
  agendamentosFunc: {
    [codigoFuncionario: string]: Array<Agendamento>;
  };
  agendamentosFuncDisp: {
    [codigoFuncionario: string]: Array<Agendamento>;
  };
}

export default function Agenda({
  codigoEmpresa,
  token,
  funcionarios,
  agendamentosFunc,
  agendamentosFuncDisp,
}: AgendaProps) {
  const breacrumb = [{ link: "", nome: "Agendamento" }];
  const [agendamentos, setAgendamentos] = useState<Array<Agendamento>>([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");
  const [apenasDisponivel, setApenasDisponivel] = useState(false);

  const [openModal, setOpenModal] = useState<string | undefined>();
  const [eventInfo, setEventInfo] = useState<Agendamento>();

  useEffect(() => {
    setAgendamentos([]);

    const agendamentos = !apenasDisponivel
      ? agendamentosFunc[funcionarioSelecionado]
      : agendamentosFuncDisp[funcionarioSelecionado];

    if (agendamentos != undefined) {
      setAgendamentos(agendamentos);
    }
  }, [funcionarioSelecionado, apenasDisponivel]);

  const listaEventos = new Array();
  agendamentos.map((item) => {
    let cor;
    switch (parseInt(item.situacao)) {
      case 0:
        cor = "#839602";
        break;
      case 1:
        cor = "blue";
        break;
      case 2:
        cor = "green";
        break;
      default:
        return;
    }

    const dataFim = new Date(item.dataHora);
    dataFim.setMinutes(dataFim.getMinutes() + 30);
    listaEventos.push({
      id: item.codigo,
      title:
        item.codigo == null
          ? "Disponível"
          : `${item.servico} - ${item.cliente}`,
      date: item.dataHora,
      end: dataFim,
      backgroundColor: cor,
      borderColor: cor,
      ...item,
    });
  });

  function clickEvent(eventInfo: any) {
    // alert(JSON.stringify(eventInfo.event.extendedProps))
    setOpenModal("form-elements");
    setEventInfo(eventInfo.event.extendedProps);
  }

  const handleSelecionarOpcao = (event: any) => {
    const opcao = event.target.value;
    setFuncionarioSelecionado(opcao);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Breadcrumb items={breacrumb} />
        <div className="flex items-center gap-4">
          <a className="flex items-center gap-1">
            Apenas horários disponíveis:
            <input
              type="checkbox"
              className="form-checkbox border-gray-500 text-gray-200"
              value={+apenasDisponivel}
              onClick={() => {
                setApenasDisponivel(!apenasDisponivel);
              }}
            />
          </a>
          <select
            className="h-9 w-64 text-xs"
            value={funcionarioSelecionado}
            onChange={handleSelecionarOpcao}
          >
            <option value="">Selecione um funcionário...</option>
            {funcionarios.map((funcionario: Funcionario, index: number) => (
              <option key={index} value={funcionario.codigo}>
                {funcionario.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <FullCalendar
        height={"100%"}
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        weekends={false}
        eventContent={(eventInfo) => <p>{eventInfo.event.title}</p>}
        locale={"PT-BR"}
        allDaySlot={false}
        nowIndicator={true}
        initialDate={new Date()}
        slotMinTime={{ hour: 7 }}
        slotMaxTime={{ hour: 20 }}
        eventClick={clickEvent}
        headerToolbar={{
          left: "prev,today,next",
          center: "title",
          right: "timeGridDay,timeGridWeek",
        }}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
        events={listaEventos}
      />
      <DetalhesPedido
        codigoEmpresa={codigoEmpresa}
        token={token}
        eventInfo={eventInfo}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
