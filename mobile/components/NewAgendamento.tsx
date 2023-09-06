import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import CompanySelect from "./CompanySelect";
import ProfessionalSelect from "./ProfessionalSelect";
import ServiceSelect from "./ServiceSelect";
import { api } from "../src/lib/api";
import * as SecureStore from "expo-secure-store";
import decode from "jwt-decode";
import DataPicker from "./DataPicker";
import TimePickerList from "./HorariosDisponivesi";

interface NewAgendamentoProps {
  onCloseModal: () => void;
}

interface User {
  sub: string;
  name: string;
  avatarUrl: string;
}

export default function NewAgendamento({ onCloseModal }: NewAgendamentoProps) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(null);
  const [selectedHorario, setSelectedHorario] = useState("");
  const [horariosDisponiveis, setHorariosDisponiveis] = useState<string[]>([]);

  async function incluirAgendamento() {
    const token = await SecureStore.getItemAsync("token");
    const user: User = decode(token);

    if (
      !selectedCompany ||
      !selectedService ||
      !selectedProfessional ||
      !selectedHorario
    ) {
      Alert.alert("Erro", "Necessário que todos os campos sejam selecionados.");
    } else {
      const dataSplit = selectedDate.toLocaleDateString().split("/");
      const horarioSplit = selectedHorario.split(":");

      const dataFormatada = new Date(
        parseInt(dataSplit[2]),
        parseInt(dataSplit[1]) - 1,
        parseInt(dataSplit[0]),
        parseInt(horarioSplit[0]),
        parseInt(horarioSplit[1]),
        parseInt("00")
      );

      const response = await api.post(
        "/agendamento",
        {
          funcionario: selectedProfessional,
          servico: selectedService,
          usuario: user.sub,
          empresa: selectedCompany,
          dataHora: `${dataFormatada.toISOString()}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        onCloseModal();
      }
    }
  }

  async function loadHorarios() {
    setHorariosDisponiveis([]);
    if (!selectedCompany || !selectedProfessional || !selectedDate) {
      return;
    }
    const response = await api.get("/novoagendamento/horarios", {
      params: {
        empresa: selectedCompany,
        funcionario: selectedProfessional,
        data: selectedDate.toLocaleDateString(),
      },
    });

    if (response.status == 200) {
      setHorariosDisponiveis(response.data);
    } else {
      setHorariosDisponiveis([]);
    }
  }

  useEffect(() => {
    loadHorarios();
  }, [selectedCompany, selectedProfessional, selectedDate]);

  return (
    <View style={styles.container}>
      <CompanySelect onSelect={setSelectedCompany} />
      <ServiceSelect empresa={selectedCompany} onSelect={setSelectedService} />
      <ProfessionalSelect
        empresa={selectedCompany}
        servico={selectedService}
        onSelect={setSelectedProfessional}
      />
      <View>
        <Text>Data: *</Text>
        <DataPicker onSelect={setSelectedDate} />
      </View>
      <View style={{ flex: 2 / 3 }}>
        <Text>Horário: *</Text>
        <View style={{ backgroundColor: "#3b3c3d", flex: 1 }}>
          <TimePickerList
            data={horariosDisponiveis}
            onSelect={setSelectedHorario}
            selectedTime={selectedHorario}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonFooter}>
          <Button title="Confirmar" onPress={incluirAgendamento} />
        </View>
        <View style={styles.buttonFooter}>
          <Button title="Fechar" onPress={onCloseModal} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    gap: 20,
    justifyContent: "flex-end",
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonFooter: {
    width: "40%",
    margin: 15,
  },
});
