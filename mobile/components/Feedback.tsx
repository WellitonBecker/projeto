import { useEffect, useState } from "react";
import { View, StyleSheet, Button, Alert, Text, TextInput } from "react-native";
import { api } from "../src/lib/api";
import * as SecureStore from "expo-secure-store";
import { Colors } from "react-native/Libraries/NewAppScreen";
import RatingBar from "./RatingBar";

interface Feedback {
  descricao: string;
  nota: number;
}

interface FeedbackProps {
  onCloseModal: () => void;
  feedback?: Feedback;
  agendamento: string;
}

export default function Feedback({ onCloseModal, agendamento }: FeedbackProps) {
  const [descricao, setDescricao] = useState<String>("");
  const [nota, setNota] = useState<Number>(null);

  useEffect(() => {
    if (agendamento != null) {
      buscaFeedback();
    }
  }, [agendamento]);

  async function incluirFeedback() {
    const token = await SecureStore.getItemAsync("token");

    if (!agendamento || !nota) {
      Alert.alert("Erro", "Necessário que todos os campos sejam selecionados.");
    } else {
      const response = await api.post(
        "/feedback",
        {
          agendamento,
          nota,
          descricao,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        onCloseModal();
        setDescricao("");
        setNota(null);
      }
    }
  }

  async function buscaFeedback() {
    const token = await SecureStore.getItemAsync("token");

    const response = await api.get(`/feedback/${agendamento}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const feedback = response.data;
    console.log(response)
    if (feedback) {
      setNota(feedback.nota);
      setDescricao(feedback.descricao);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Descrição: </Text>
      <View style={styles.textAreaContainer}>
        <TextInput
          style={styles.textArea}
          underlineColorAndroid="transparent"
          value={descricao.toString()}
          onChangeText={setDescricao}
          numberOfLines={10}
          multiline={true}
        />
      </View>
      <RatingBar defaultRating={+nota} setDefaultRating={setNota} />
      <View style={styles.footer}>
        <View style={styles.buttonFooter}>
          <Button title="Confirmar" onPress={incluirFeedback} />
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
  textAreaContainer: {
    borderColor: Colors.grey20,
    borderWidth: 1,
    padding: 5,
    backgroundColor: '#345'
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
  },
});
