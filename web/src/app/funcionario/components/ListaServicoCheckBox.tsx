import Servico from "@/app/servico/page";
import { api } from "@/lib/api";
import { Checkbox, Label } from "flowbite-react";
import { useEffect, useState } from "react";

interface Servico {
  sequencia: string;
  descricao: string;
}

interface ListaServicoProps {
  onSelect: (servico: number) => void;
  empresa: string;
  token: string | undefined;
  selecionados?: Array<number>;
}

export default function ListaServicoCheckBox({
  onSelect,
  empresa,
  token,
  selecionados,
}: ListaServicoProps) {
  const [servicos, setServicos] = useState<Servico[]>([]);

  async function loadServicos() {
    const response = await api.get("/servicos", {
      params: {
        empresa,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setServicos(response.data);
  }

  useEffect(() => {
    loadServicos();
  }, []);

  return (
    <div className="flex max-w-md flex-col gap-4" id="checkbox">
      {servicos.map((servico) => {
        const servicoSelecionado = selecionados?.includes(
          parseInt(servico.sequencia)
        );

        return (
          <div className="flex items-center gap-2">
            <Checkbox
              id={`servico_${servico.sequencia}`}
              onChange={(e) => onSelect(parseInt(servico.sequencia))}
              checked={servicoSelecionado}
            />
            <Label className="flex" htmlFor={`servico_${servico.sequencia}`}>
              <p>{servico.descricao}</p>
            </Label>
          </div>
        );
      })}
    </div>
  );
}
