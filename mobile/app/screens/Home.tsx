import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { api } from "../../src/lib/api";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import NewAgendamento from "../../components/NewAgendamento";
import AppointmentCard from "../../components/AppointmentCard";

interface Agendamento {
  nomeEmpresa: string;
  servico: string;
  funcionario: string;
  valor: string;
  situacao: number;
  dataHora: string;
}

export function Home() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  async function loadMemories() {
    const token = await SecureStore.getItemAsync("token");
    const response = await api.get("/agendamentos/usuario", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);

    setAgendamentos(response.data);
  }

  useEffect(() => {
    loadMemories();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <Header />
      <View>
        <Button title="Novo agendamento" onPress={toggleModal} />
      </View>
      <ScrollView>
        {agendamentos.length == 0 ? (
          <View style={styles.viewEmpty}>
            <Text>Você ainda não possui nenhum agendamento</Text>
          </View>
        ) : (
          agendamentos.map((agendamento) => {
            return (
              <AppointmentCard
                agendamento={agendamento}
                onCancelPress={() => {}}
                onFeedbackPress={() => {}}
                key={agendamento.dataHora}
              />
            );
          })
        )}
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        style={{
          width: "100%",
          backgroundColor: "rgba(255, 255, 255)",
          margin: 0,
          paddingLeft: 20,
          justifyContent: "center",
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={{ marginTop: 15, fontSize: 25 }}>Novo Agendamento</Text>
          <NewAgendamento onCloseModal={toggleModal} />
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
});
