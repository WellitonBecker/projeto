interface CardEmpresaProps {
  title: string;
  info?: Array<string>;
}

export default function CardEmpresa({ title, info }: CardEmpresaProps) {
  return (
    <div className="w-fit rounded-lg border border-gray-200 bg-gray-50 p-6 pb-3 shadow">
      <div className="grid grid-cols-1">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
        {info?.map((item, i) => {
          return (
            <p key={i}>
              {item}
            </p>
          ) 
        })}
        <div className="flex mt-4">
          <a
            href="#"
            className="m-auto w-fit rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Selecionar
          </a>
        </div>
      </div>
    </div>
  );
}
