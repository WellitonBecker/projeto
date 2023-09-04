import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import CompanySelect from "./CompanySelect";
import ProfessionalSelect from "./ProfessionalSelect";
import ServiceSelect from "./ServiceSelect";

interface NewAgendamentoProps {
  onCloseModal: () => void;
}

export default function NewAgendamento({ onCloseModal }: NewAgendamentoProps) {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");

  return (
    <View style={styles.container}>
      <CompanySelect onSelect={setSelectedCompany} />
      <ServiceSelect empresa={selectedCompany} onSelect={setSelectedService} />
      <ProfessionalSelect
        empresa={selectedCompany}
        servico={selectedService}
        onSelect={setSelectedProfessional}
      />
      <View style={styles.footer}>
        <View style={styles.buttonFooter}>
          <Button title="Confirmar" />
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
    justifyContent: "center",
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
