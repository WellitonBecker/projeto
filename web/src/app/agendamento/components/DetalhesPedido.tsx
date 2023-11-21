import SearchableList from "@/components/SearchableListUsuario";
import { api } from "@/lib/api";
import { Modal, Label, TextInput, Button, Select } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

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
  const [listaServicos, setListaServicos] = useState<
    Array<{
      sequencia: string;
      descricao: string;
    }>
  >([]);

  const buscaServicos = async () => {
    setListaServicos([]);
    if (eventInfo?.codigoFuncionario != undefined) {
      const response = await api.get(
        `/servico/profissional?empresa=${codigoEmpresa}&funcionario=${eventInfo?.codigoFuncionario}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setListaServicos(response.data);
    }
  };

  useEffect(() => {
    buscaServicos();
  }, [eventInfo]);

  const router = useRouter();

  const fecharModal = async () => {
    setOpenModal(undefined);
    setCliente("");
    setServico("");
  };

  async function incluirAgendamento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const retorno = await api.post(
      "/agendamento",
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
    await api.patch(
      `/agendamento?codigo=${eventInfo?.codigo}&situacao=3`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fecharModal();
  }
  async function concluirAgendamento() {
    await api.patch(
      `/agendamento?codigo=${eventInfo?.codigo}&situacao=2`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fecharModal();
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
      onClose={fecharModal}
    >
      <Modal.Header />
      <Modal.Body>
        <form onSubmit={incluirAgendamento}>
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
              {agendamentoDisponivel ? (
                <SearchableList
                  onSelectItem={(item) => setCliente(item.codigo)}
                />
              ) : (
                <TextInput id="cliente" value={eventInfo?.cliente} disabled />
              )}
              {}
            </div>

            <div>
              <div className="mb-1 block">
                <Label htmlFor="servico" value="Serviço:" />
              </div>
              {agendamentoDisponivel ? (
                <Select
                  id="servico"
                  disabled={!agendamentoDisponivel}
                  required
                  value={servico}
                  onChange={(event) => setServico(event.target.value)}
                >
                  <option defaultChecked value={""}>
                    Selecione...
                  </option>
                  {listaServicos.length > 0 &&
                    listaServicos.map((servicoLista) => {
                      const selected = servicoLista.sequencia == servico;
                      return (
                        <option
                          value={servicoLista.sequencia}
                          selected={selected}
                        >
                          {servicoLista.descricao}
                        </option>
                      );
                    })}
                </Select>
              ) : (
                <TextInput id="servico" value={eventInfo?.servico} disabled />
              )}
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
                      <Button color={"green"}>Finalizar</Button>
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
