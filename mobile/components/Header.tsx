import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import decode from "jwt-decode";

interface User {
  sub: string;
  name: string;
  avatarUrl: string;
}

interface HeaderProps {
  onPressAtualizar: any;
}

export default function Header({ onPressAtualizar }: HeaderProps) {
  const [isToken, setIsToken] = useState(false);
  const [token, setToken] = useState("");

  setTimeout(async () => {
    setToken(await SecureStore.getItemAsync("token"));
    setIsToken(!!token);
  }, 2);

  if (!isToken) {
    return <></>;
  }
  const user: User = decode(token);
  return (
    <View style={styles.header}>
      <Text style={styles.username}>Olá, {user.name}</Text>
      <Button title="Atualizar" onPress={onPressAtualizar} />
      <Button
        title="Sair"
        onPress={() => {
          SecureStore.setItemAsync("token", "");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // flex: 1 / 20,
    minHeight: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f0f7",
  },
  username: {
    fontSize: 18,
  },
});
