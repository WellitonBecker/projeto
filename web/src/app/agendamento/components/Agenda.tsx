"use client";
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!

interface Agendamento {
  codigo: string;
  cliente: string;
  servico: string;
  funcionario: string;
  valor: string;
  situacao: string;
  dataHora: string;
}

interface AgendaProps {
  itens: Agendamento[];
}

export default function Agenda({ itens }: AgendaProps) {
  const listaEventos = new Array();
  itens.map((item) => {
    let cor;
    switch (parseInt(item.situacao)) {
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
      title: `${item.servico} - ${item.cliente}`,
      date: item.dataHora,
      end: dataFim,
      backgroundColor: cor,
      borderColor: cor,
    });
  });

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <p>{eventInfo.event.title}</p>
      </>
    );
  }

  function clickEvent(eventInfo: any) {
    alert(JSON.stringify(eventInfo));
  }
  return (
    <FullCalendar
      height={"100%"}
      plugins={[timeGridPlugin]}
      initialView="timeGridWeek"
      weekends={false}
      eventContent={renderEventContent}
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
  );
}
