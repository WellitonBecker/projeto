import { api } from "@/lib/api";
import { Modal, Label, TextInput, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface Agendamento {
  codigo: string;
  cliente: string;
  servico: string;
  funcionario: string;
  codigoFuncionario: string;
  valor: string;
  situacao: string;
  dataHora: string;
}

interface DetalhesPedidoProps {
  openModal: any;
  setOpenModal: any;
  codigoEmpresa: string;
  token: string | undefined;
  eventInfo: Agendamento | undefined;
}

export default function DetalhesPedido({
  openModal,
  setOpenModal,
  eventInfo,
  codigoEmpresa,
  token,
}: DetalhesPedidoProps) {
  const agendamentoPendente = eventInfo?.situacao == "1";
  const agendamentoDisponivel = eventInfo?.situacao == "0";
  const agendamentoCancelado = eventInfo?.situacao == "3";

  const [servico, setServico] = useState("");
  const [cliente, setCliente] = useState("");

  const router = useRouter();

  async function handleSubmitAgendamento(event: FormEvent<HTMLFormElement>) {}

  async function incluirAgendamento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const retorno = await api.post(
      "/servico",
      {
        funcionario: eventInfo?.codigoFuncionario,
        servico,
        usuario: cliente,
        empresa: codigoEmpresa,
        dataHora: eventInfo?.dataHora,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (retorno.status != 200) {
      alert("Erro ao cadastrar serviço");
    } else {
      setOpenModal(undefined);
      router.refresh();
    }
  }

  async function cancelarAgendamento() {
    alert("cancelar");
  }
  async function concluirAgendamento() {
    alert("concluir");
  }

  const dataHora = eventInfo?.dataHora;
  let dataHoraObj;
  if (dataHora) {
    dataHoraObj = new Date(
      +dataHora.substring(0, "yyyy".length),
      +dataHora.substring("yyyy-".length, "yyyy-mm".length),
      +dataHora.substring("yyyy-mm-".length, "yyyy-mm-dd".length) - 1,
      +dataHora.substring("yyyy-mm-ddT".length, "yyyy-mm-ddThh".length),
      +dataHora.substring("yyyy-mm-ddThh:".length, "yyyy-mm-ddThh:mm".length),
      +dataHora.substring(
        "yyyy-mm-ddThh:mm:".length,
        "yyyy-mm-ddThh:mm:ss".length
      )
    );
    dataHoraObj.setHours(dataHoraObj.getHours() - 3);
  } else {
    dataHoraObj = new Date();
  }

  return (
    <Modal
      show={openModal === "form-elements"}
      size="md"
      popup
      onClose={() => {
        setOpenModal(undefined);
        setCliente("");
        setServico("");
      }}
    >
      <Modal.Header />
      <Modal.Body>
        <form onSubmit={handleSubmitAgendamento}>
          <div className="space-y-3">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">
              Agendamento
            </h2>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="funcionario" value="Funcionário:" />
              </div>
              <TextInput
                id="funcionario"
                type="text"
                value={eventInfo?.funcionario}
                disabled
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="cliente" value="Cliente:" />
              </div>
              <TextInput
                id="cliente"
                type="text"
                required
                disabled={!agendamentoDisponivel}
                value={cliente}
                onChange={(event) => setCliente(event.target.value)}
              />
            </div>

            <div>
              <div className="mb-1 block">
                <Label htmlFor="servico" value="Serviço:" />
              </div>
              <TextInput
                id="servico"
                type="text"
                disabled={!agendamentoDisponivel}
                required
                value={servico}
                onChange={(event) => setServico(event.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="data" value="Data:" />
                </div>
                <TextInput
                  id="data"
                  type="text"
                  disabled
                  value={dataHoraObj.toLocaleDateString()}
                />
              </div>
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="time" value="Hora:" />
                </div>
                <TextInput
                  id="time"
                  type="text"
                  disabled
                  value={dataHoraObj.toLocaleTimeString()}
                />
              </div>
            </div>
            <div className="mt-2 w-full">
              <div className="m-auto w-fit">
                {agendamentoPendente && (
                  <div className="grid grid-cols-2 gap-2">
                    <a onClick={concluirAgendamento}>
                      <Button color={"green"}>Concluir</Button>
                    </a>
                    <a onClick={cancelarAgendamento}>
                      <Button color={"red"}>Cancelar</Button>
                    </a>
                  </div>
                )}
                {agendamentoDisponivel && (
                  <Button type="submit">Incluir</Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
