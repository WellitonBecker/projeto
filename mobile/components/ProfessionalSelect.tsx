// ProfessionalSelect.js
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { api } from "../src/lib/api";

interface Profissional {
  codigo: string;
  nome: string;
  ativo: boolean;
}

const ProfessionalSelect = ({ empresa, servico, onSelect }) => {
  const [profisionais, setProfisionais] = useState<Profissional[]>([]);
  const [selectedProfissional, setSelectedProfissional] = useState("");

  async function loadProfissionais() {
    if (!!empresa || !!servico) {
      const response = await api.get(`/novoagendamento/profissionais`, {
        params: {
          empresa,
          servico,
        },
      });
      setProfisionais(response.data);
    } else {
      setProfisionais([]);
    }
  }

  useEffect(() => {
    loadProfissionais();
    setSelectedProfissional("");
  }, [servico]);

  return (
    <View>
      <Text>Profissional:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedProfissional}
        onValueChange={(itemValue) => {
          setSelectedProfissional(itemValue);
          onSelect(itemValue); // Envia a seleção de empresa para a função de callback
        }}
      >
        <Picker.Item label="Selecione..." value="" />
        {profisionais.map((professional) => {
          if (professional.ativo) {
            return (
              <Picker.Item
                label={professional.nome}
                value={professional.codigo}
                key={professional.codigo}
              />
            );
          }
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "#fff",
  },
});

export default ProfessionalSelect;
