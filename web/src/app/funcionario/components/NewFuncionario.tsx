"use client";

import SearchableList from "@/components/SearchableListUsuario";
import { api } from "@/lib/api";
import { Button, Label, Modal, Tabs, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { HiClipboardList, HiUserCircle } from "react-icons/hi";
import ListaServicoCheckBox from "./ListaServicoCheckBox";
import { getEmpresa } from "@/lib/auth";

interface props {
  token: string | undefined;
  codigoEmpresa: string;
}

export default function ButtonNewFuncionario({ token, codigoEmpresa }: props) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [salario, setSalario] = useState("0.00");
  const [tipo, setTipo] = useState(2);
  const [selectedFuncioario, setSelectedFuncioario] = useState<any | null>(
    null
  );
  const [selectedServicos, setSelectedServicos] = useState<number[]>([]);

  const props = { openModal, setOpenModal };
  const router = useRouter();

  async function incluirFuncionario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedFuncioario) {
      alert("É necessaário selecionar um funcionário!");
    }
    const retorno = await api.post(
      "/funcionario",
      {
        funcionario: selectedFuncioario.codigo,
        salario,
        tipo,
        empresa: codigoEmpresa,
        servicos: selectedServicos.length > 0 ? selectedServicos : [],
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
      resetDados();
      router.refresh();
    }
  }

  async function resetDados() {
    setSalario("");
    setTipo(2);
    setSelectedFuncioario(null);
    setSelectedServicos([]);
  }

  return (
    <>
      <button
        onClick={() => props.setOpenModal("form-elements")}
        className="m-auto w-fit rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800"
      >
        Incluir Funcionário
      </button>
      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => {
          props.setOpenModal(undefined);
          resetDados();
        }}
      >
        <h2 className="absolute ml-5 p-2 text-xl font-medium text-gray-900 dark:text-white">
          Cadastro de Funcionário
        </h2>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={incluirFuncionario}>
            <Tabs.Group aria-label="Default tabs" style="default">
              <Tabs.Item active icon={HiUserCircle} title="Funcionário">
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 block">
                      <Label htmlFor="salario" value="Funcionário:" />
                    </div>
                    <SearchableList
                      onSelectItem={(item) => setSelectedFuncioario(item)}
                    />
                  </div>
                  <div>
                    <div className="mb-1 block">
                      <Label htmlFor="salario" value="Salário (R$):" />
                    </div>
                    <TextInput
                      id="salario"
                      type="number"
                      maxLength={6}
                      value={salario}
                      onChange={(event) =>
                        setSalario(new Number(event.target.value).toFixed(2))
                      }
                    />
                  </div>

                  <div>
                    <div className="flex flex-row items-center justify-center gap-5">
                      <div className="flex items-center">
                        <input
                          checked={tipo == 1}
                          id="administrador"
                          type="radio"
                          value=""
                          name="tipo_funcioario"
                          onChange={() => setTipo(1)}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                          htmlFor="administrador"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Administrador
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          checked={tipo == 2}
                          id="funcioario"
                          type="radio"
                          value=""
                          name="tipo_funcioario"
                          onChange={() => setTipo(2)}
                          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                          htmlFor="funcioario"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Funcionário
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item active icon={HiClipboardList} title="Serviços">
                <ListaServicoCheckBox
                  empresa={codigoEmpresa}
                  token={token}
                  onSelect={(servico) => {
                    const servicos = selectedServicos;

                    if (selectedServicos.includes(servico)) {
                      const index = servicos.indexOf(servico);
                      servicos.splice(index, 1);
                    } else {
                      servicos.push(servico);
                    }
                    setSelectedServicos(servicos);
                  }}
                />
              </Tabs.Item>
            </Tabs.Group>
            <div className="mt-2 w-full">
              <div className="m-auto w-fit">
                <Button type="submit">Confirmar</Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
