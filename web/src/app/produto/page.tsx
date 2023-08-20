import Breadcrumb from "@/components/Breadcrumb";

export default function Produto() {
  const breacrumb = [{link: '', nome: 'Produtos'}]
  return (
    <>
      <Breadcrumb items={breacrumb}/>
    </>
  );
}
