import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { api } from "../../src/lib/api";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import NewAgendamento from "../../components/NewAgendamento";
import AppointmentCard from "../../components/AppointmentCard";
import Feedback from "../../components/Feedback";

interface Agendamento {
  codigo: string;
  nomeEmpresa: string;
  servico: string;
  funcionario: string;
  valor: string;
  situacao: number;
  dataHora: string;
  feedback: Array<{ agendamento: string; descricao: string; nota: number }>;
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
    setAgendamentos(response.data);
  }

  async function onPressCancelar(codigo: string) {
    const token = await SecureStore.getItemAsync("token");
    await api.patch(
      `/agendamento`,
      {
        codigo,
        situacao: "3",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    loadMemories();
  }

  useEffect(() => {
    loadMemories();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalFeedbackVisible, setIsModalFeedbackVisible] = useState(false);
  const [feedbackSelected, setFeedbackSelected] = useState(null);
  const [agendamentoSelected, setAgendamentoSelected] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalFeedback = () => {
    setIsModalFeedbackVisible(!isModalFeedbackVisible);
    setAgendamentoSelected(null);
    setFeedbackSelected(null);
  };

  return (
    <>
      <Header onPressAtualizar={loadMemories} />
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
                onCancelPress={() => onPressCancelar(agendamento.codigo)}
                onFeedbackPress={() => {
                  toggleModalFeedback();
                  setAgendamentoSelected(agendamento.codigo);
                  if (agendamento.feedback.length > 0) {
                    setFeedbackSelected(agendamento.feedback[0]);
                  }
                }}
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
          backgroundColor: "#ffffff",
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
      <Modal
        isVisible={isModalFeedbackVisible}
        style={{
          width: "100%",
          backgroundColor: "#ffffff",
          margin: 0,
          paddingLeft: 20,
          justifyContent: "center",
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={{ marginTop: 15, fontSize: 25 }}>Feedback</Text>
          <Feedback
            onCloseModal={toggleModalFeedback}
            agendamento={agendamentoSelected}
          />
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
