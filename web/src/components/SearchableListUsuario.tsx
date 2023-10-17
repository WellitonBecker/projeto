import { api } from "@/lib/api";
import { Spinner, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";

interface Usuario {
  codigo: string;
  nome: string;
}

export default function SearchableList({
  onSelectItem,
}: {
  onSelectItem: (item: any) => void;
}) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Usuario[]>([]);
  const [mostraLista, setMostraLista] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  async function loadLista() {
    var response = null;
    try {
      response = await api.get("usuario/search", {
        params: {
          nome: searchTerm,
        },
      });
    } catch (error) {
    } finally {
      const usuarios = response?.data;
      if (response !== null && response.status == 200 && usuarios.length > 0) {
        setSearchResults(response.data);
      } else {
        setSearchResults([]);
      }
      setMostraLista(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!!selectedItem) {
      setMostraLista(false);
      setSelectedItem(false);
      return;
    }
    if (searchTerm.length >= 3) {
      setIsLoading(true);
      // Simule uma chamada à API com base em searchTerm
      // Substitua isso pela chamada real à sua API
      setSearchResults([]);
      loadLista();
    } else {
      setSearchResults([]);
      setMostraLista(false);
    }
  }, [searchTerm]);

  const handleSelectItem = (item: any) => {
    setSelectedItem(item);
    setSearchTerm(item.nome);
    onSelectItem(item);
  };

  return (
    <>
      <TextInput
        type="text"
        placeholder="Digite pelo menos 3 letras..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ zIndex: 1 }} // Defina um z-index alto para o campo de pesquisa
      />
      {isLoading && (
        <div className="absolute z-10 flex h-16 w-full items-center justify-center border bg-white ">
          <Spinner aria-label="Default status example" size="lg" />
        </div>
      )}
      {mostraLista && (
        <>
          {searchResults.length == 0 ? (
            <div className="absolute z-10 flex h-16 w-full items-center justify-center border bg-white ">
              <p>Não foi encontrado nenhum termo com "{searchTerm}"</p>
            </div>
          ) : (
            <ul
              className="absolute mt-1 w-full rounded border bg-white"
              style={{ zIndex: 2 }}
            >
              {searchResults.map((result) => (
                <li
                  key={result.codigo}
                  onClick={() => handleSelectItem(result)}
                  className={`cursor-pointer p-2`}
                >
                  {result.nome}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
}
