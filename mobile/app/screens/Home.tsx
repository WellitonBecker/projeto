import { Button, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { api } from "../../src/lib/api";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import NewAgendamento from "../../components/NewAgendamento";

interface Agendamento {
  nomeEmpresa: string;
  enderecoEmpresa: string;
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
      {agendamentos.length == 0 ? (
        <View style={styles.viewEmpty}>
          <Text>Você ainda não possui nenhum agendamento</Text>
        </View>
      ) : (
        agendamentos.map((agendamento) => {
          console.log(agendamento);
        })
      )}

      <Modal isVisible={isModalVisible} style={{ width: "90%" }}>
        <View style={styles.modalContainer}>
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
    justifyContent: "center",
    alignItems: "center",
  },
});
