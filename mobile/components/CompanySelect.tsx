// CompanySelect.js
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { api } from "../src/lib/api";
import * as SecureStore from "expo-secure-store";

interface Empresa {
  codigo: string;
  nome: string;
  endereco: string;
  telefone: number;
  email: string;
}

const CompanySelect = ({ onSelect }) => {
  const [companies, setCompanies] = useState<Empresa[]>([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  async function loadEmpresas() {
    const response = await api.get("/novoagendamento/empresas");
    setCompanies(response.data);
  }

  useEffect(() => {
    loadEmpresas();
  }, []);

  return (
    <View>
      <Text>Empresa: *</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedCompany}
        onValueChange={(itemValue) => {
          setSelectedCompany(itemValue);
          onSelect(itemValue); // Envia a seleção de empresa para a função de callback
        }}
      >
        <Picker.Item label="Selecione..." value="" />
        {companies.map((company) => (
          <Picker.Item
            label={company.nome}
            value={company.codigo}
            key={company.codigo}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "gray",
  },
});

export default CompanySelect;
