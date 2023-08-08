import CardEmpresa from "../CardEmpresa";

export default function LayoutMinhasEmpresas() {
  return (
    <main className="relative h-screen w-screen bg-gray-100 ">
      <div className="flex h-full w-full items-center justify-center">
        <div className="grid grid-cols-4 gap-4 p-14 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          <CardEmpresa
            title="TEste"
            info={["Telefone: 57844554-81", "Endereço: Rua Duque de Caxias"]}
          />
        </div>
      </div>
    </main>
  );
}
