"use client";

import { api } from "@/lib/api";
import { Button, Label, Modal, Tabs, TextInput } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import router from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { HiUserCircle, HiClipboardList } from "react-icons/hi";
import ListaServicoCheckBox from "./ListaServicoCheckBox";

interface props {
  token: string | undefined;
  codigoEmpresa: string;
  funcionarioSelected: string | undefined;
}

export default function UpdateFuncioario({
  token,
  codigoEmpresa,
  funcionarioSelected,
}: props) {
  const [nomeFuncioario, setNomeFuncioario] = useState("");
  const [salario, setSalario] = useState("");
  const [selectedServicos, setSelectedServicos] = useState<number[]>([]);

  const [openModal, setOpenModal] = useState<string | undefined>();

  const router = useRouter();

  async function alterarFuncioario(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const retorno = await api.patch(
      "/funcionario",
      {
        funcionario: funcionarioSelected,
        salario: salario.toString(),
        empresa: codigoEmpresa,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (retorno.status != 200) {
      alert("Erro ao alterar serviço");
    } else {
      setOpenModal(undefined);
      router.refresh();
    }
  }

  async function buscarFuncionario() {
    if (funcionarioSelected == undefined) {
      return;
    }
    const retorno = await api.get(`/funcionario/busca`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        empresa: codigoEmpresa,
        funcionario: funcionarioSelected,
      },
    });

    if (retorno.status != 200) {
      alert("Erro ao buscar dados do serviço");
    } else {
      const funcionario = retorno.data;
      setNomeFuncioario(funcionario.nome);
      setSalario(parseFloat(funcionario.salario).toFixed(2));
      setSelectedServicos(funcionario.servicos);
      setOpenModal("form-elements");
    }
  }

  useEffect(() => {
    buscarFuncionario();
  }, [funcionarioSelected]);

  return (
    <>
      <Modal
        show={openModal === "form-elements"}
        size="md"
        popup
        onClose={() => {
          setOpenModal(undefined);
          setNomeFuncioario("");
          setSalario("");
          setSelectedServicos([]);
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={alterarFuncioario}>
            <Tabs.Group aria-label="Default tabs" style="default">
              <Tabs.Item active icon={HiUserCircle} title="Funcionário">
                <div className="space-y-3">
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                    Alterar Serviço
                  </h2>
                  <div>
                    <div className="mb-1 block">
                      <Label htmlFor="nomeFuncionario" value="Funcionário:" />
                    </div>
                    <TextInput
                      id="nomeFuncionario"
                      type="text"
                      value={nomeFuncioario}
                      disabled
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
                  <div className="mt-2 w-full">
                    <div className="m-auto w-fit">
                      <Button type="submit">Confirmar</Button>
                    </div>
                  </div>
                </div>
              </Tabs.Item>
              <Tabs.Item active icon={HiClipboardList} title="Serviços">
                <ListaServicoCheckBox
                  empresa={codigoEmpresa}
                  token={token}
                  selecionados={selectedServicos}
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
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
