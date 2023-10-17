import { Select } from "flowbite-react";
import React, { useState } from "react";

interface Funcionario {
  codigo: string;
  nome: string;
}

interface ListaFuncionariosProps {
  funcionarios: Array<Funcionario>;
  funcionarioSelecionado: any;
  setFuncionarioSelecionado: any;
}

export default function ListaFuncionarios({
  funcionarios,
  funcionarioSelecionado,
  setFuncionarioSelecionado,
}: ListaFuncionariosProps) {
  const handleSelecionarOpcao = (event: any) => {
    const opcao = event.target.value;
    setFuncionarioSelecionado(opcao);
  };

  return (
    <div>
      <Select
        className="h-9 w-64 text-xs"
        value={funcionarioSelecionado}
        onChange={handleSelecionarOpcao}
      >
        <option value="">Selecione um funcionário...</option>
        {funcionarios.map((funcionario, index) => (
          <option key={index} value={funcionario.codigo}>
            {funcionario.nome}
          </option>
        ))}
      </Select>
    </div>
  );
}
