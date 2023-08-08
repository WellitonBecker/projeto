import CardEmpresa from "@/components/CardEmpresa";
import Table from "@/components/Table";

export default function Agendamentos() {
  const colHeaders = {
    colunas: [{ name: "Código" }, { name: "Código" }, { name: "Nome" }],
    grid_cols: "grid-cols-[1fr_5fr_10fr]",
  };

  return (
    // <div className=" h-full w-full ">
    // <Table colHeaders={colHeaders} />
    <CardEmpresa title="TEste" info={['Telefone: 57844554-81', 'Endereço: Rua Duque de Caxias']} />
    // </div>
  );
}
