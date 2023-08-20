import Breadcrumb from "@/components/Breadcrumb";

export default function FluxoCaixa() {
  const breacrumb = [{link: '', nome: 'Entrada/Saída'}]
  return (
    <>
      <Breadcrumb items={breacrumb}/>
    </>
  );
}
