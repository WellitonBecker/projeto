import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { api } from "../src/lib/api";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
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

  return (
    <View style={styles.container}>
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
        <Button title="Login" onPress={handleLogin} />
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
    width: "80%", // Aumente a largura aqui
    marginBottom: 15,
    padding: 15,
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    width: "80%",
  },
});
