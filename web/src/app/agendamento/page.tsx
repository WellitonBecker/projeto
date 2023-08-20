import Breadcrumb from "@/components/Breadcrumb";

export default function Agendamento() {
  const breacrumb = [{link: '', nome: 'Agendamentos'}]
  return (
    <>
      <Breadcrumb items={breacrumb}/>
    </>
  );
}
