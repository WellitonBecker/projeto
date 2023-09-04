// ServiceSelect.js
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { api } from "../src/lib/api";

interface Servico {
  sequencia: string;
  descricao: string;
  valor: string;
  ativo: boolean;
}

const ServiceSelect = ({ empresa, onSelect }) => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedServico, setSelectedServico] = useState("");

  async function loadServicos() {
    if (!!empresa) {
      const response = await api.get(`/novoagendamento/servicos/${empresa}`);
      setServicos(response.data);
    } else {
      setServicos([]);
    }
  }

  useEffect(() => {
    loadServicos();
    setSelectedServico("")
  }, [empresa]);

  return (
    <View>
      <Text>Serviço:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedServico}
        onValueChange={(itemValue) => {
          setSelectedServico(itemValue);
          onSelect(itemValue);
        }}
      >
        <Picker.Item label="Selecione..." value="" />
        {servicos.map((service) => {
          if (service.ativo) {
            const valor = new Number(service.valor)
              .toFixed(2)
              .replace(".", ",");
            return (
              <Picker.Item
                label={`${service.descricao} (R$ ${valor})`}
                value={service.sequencia}
                key={service.sequencia}
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

export default ServiceSelect;
