import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

interface Agendamento {
  nomeEmpresa: string;
  servico: string;
  funcionario: string;
  valor: string;
  situacao: number;
  dataHora: string;
}

interface AppointmentCardProps {
  agendamento: Agendamento;
  onFeedbackPress: () => void; // Função para feedback
  onCancelPress: () => void; // Função para cancelar
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  agendamento,
  onFeedbackPress,
  onCancelPress,
}) => {
  const data = agendamento.dataHora.split(", ")[0];
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Text style={styles.textDescricao}>Empresa: </Text>
        {agendamento.nomeEmpresa}
      </Text>
      <Text>
        <Text style={styles.textDescricao}>Servico: </Text>
        {agendamento.servico}
      </Text>
      <Text>
        <Text style={styles.textDescricao}>Funcionário(a): </Text>
        {agendamento.funcionario}
      </Text>
      <Text>
        {agendamento.situacao != 4 ? (
          <>
            <Text style={styles.textDescricao}>Data/Hora: </Text>
            {agendamento.dataHora}
          </>
        ) : (
          <>
            <Text style={styles.textDescricao}>Data: </Text>
            {data}
          </>
        )}
      </Text>
      <Text>
        <Text style={styles.textDescricao}>Situação: </Text>
        {agendamento.situacao == 1
          ? "Agendado"
          : agendamento.situacao == 2
          ? "Concluído"
          : agendamento.situacao == 4
          ? "Lista de Espera"
          : "Cancelado"}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginLeft: 5,
          marginRight: 5,
          marginTop: 15,
          gap: 10,
        }}
      >
        {agendamento.situacao < 3 && (
          <TouchableOpacity>
            <Button
              title="Feedback"
              color={"#b59618"}
              onPress={onFeedbackPress}
            />
          </TouchableOpacity>
        )}
        {agendamento.situacao == 1 && (
          <TouchableOpacity>
            <Button
              title="Cancelar"
              color={"#bf0202"}
              onPress={onCancelPress}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#565756",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButton: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
  textDescricao: {
    fontWeight: "bold",
  },
});

export default AppointmentCard;
