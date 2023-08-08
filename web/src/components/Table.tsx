interface ColunsHeader {
  grid_cols: string;
  colunas: Array<{ name: string }>;
}

interface TableProps {
  colHeaders: ColunsHeader;
}

export default function Table({ colHeaders }: TableProps) {
  return (
    <div className="m-5 overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr className={`grid ${colHeaders.grid_cols}`}>
            {colHeaders.colunas.map((item, i) => {
              return (
                <th
                  key={i}
                  scope="col"
                  className={"px-2 py-4 font-medium text-gray-900"}
                >
                  {item.name}
                </th>
              );
            })}
          </tr>
        </thead>
      </table>
    </div>
  );
}
