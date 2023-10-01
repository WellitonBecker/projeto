import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { api } from "../src/lib/api";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [login, setLogin] = useState(true);

  const [firstName, setFirstName] = useState("Welliton");
  const [lastName, setLastName] = useState("Luiz Becker");
  const [email, setEmail] = useState("welliton.lbecker@gmail.com");
  const [password, setPassword] = useState("Welliton@18");

  const handleLogin = async () => {
    if (!email || !password) {
      // Verifique se o email e a senha foram preenchidos
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    const response = await api.get("/usuario/login", {
      params: {
        email,
        password: password.toString(),
      },
    });
    const { token } = response.data;

    if (token === "nonexistent" || token === undefined) {
      Alert.alert("Erro", "Email ou senha incorreto.");
    } else {
      await SecureStore.setItemAsync("token", token);
      onLogin();
    }
  };
  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    const retorno = await api.post("/usuario/register", {
      firstName,
      lastName,
      email,
      password,
    });

    if (retorno.data == "nonexistent") {
      alert("Usuário Inexistente");
    }
    if (retorno.status == 200) {
      const { token } = retorno.data;

      if (token === "nonexistent" || token === undefined) {
        Alert.alert("Erro", "Email ou senha incorreto.");
      } else {
        await SecureStore.setItemAsync("token", token);
        onLogin();
      }
    } else {
      alert(retorno.data);
    }
  };

  return (
    <View style={styles.container}>
      {!login && (
        <>
          <TextInput
            placeholder="Primeiro Nome"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Último Nome"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />
        </>
      )}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.button}>
        <Button
          title={login ? "Entrar" : "Cadastrar"}
          onPress={login ? handleLogin : handleSignUp}
        />
      </View>
      <View style={styles.containerTextSingupLogin}>
        <Text>Não possui uma conta? </Text>
        <TouchableOpacity onPress={() => setLogin(!login)}>
          <Text style={styles.textSingupLogin}>
            {login ? "Registre-se" : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 15,
    padding: 15,
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    width: "80%",
  },
  containerTextSingupLogin: {
    marginTop: 40,
    flexDirection: "row",
  },
  textSingupLogin: {
    color: "#190ccc",
  },
});
