interface itemProps {
  nome: string;
  email: string;
}

interface props {
  itens: Array<itemProps>;
}

export default function TableUsuario({ itens }: props) {
  function criaLinhas(indice: number, item?: itemProps) {
    return (
      <tr className="hover:bg-gray-100" key={indice}>
        <td className="border px-2 py-1">{item?.nome}</td>
        <td className="border px-2 py-1">{item?.email}</td>
      </tr>
    );
  }
  let indiceLinha = 0;
  return (
    <table className="w-full table-auto">
      <thead className="sticky bg-gray-300">
        <tr>
          <th className="border px-4 py-2">Nome</th>
          <th className="border px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>{itens.map((item) => criaLinhas(++indiceLinha, item))}</tbody>
    </table>
  );
}
