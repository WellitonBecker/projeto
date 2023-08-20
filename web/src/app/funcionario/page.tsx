import Breadcrumb from '@/components/Breadcrumb'

export default function Funcionario() {
  const breacrumb = [{link: '', nome: 'Funcionários'}]
  return (
    <>
      <Breadcrumb items={breacrumb}/>
    </>
  );
}
