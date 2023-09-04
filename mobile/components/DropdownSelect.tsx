import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const DropdownSelect = ({ apiEndpoint, onValueChange }) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Faça uma chamada à API para buscar os dados
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = data.map((item) => ({
          label: item.name, // Nome exibido na lista
          value: item.id, // Valor associado ao item selecionado
        }));
        setOptions(parsedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
        setIsLoading(false);
      });
  }, [apiEndpoint]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <RNPickerSelect
          items={options}
          onValueChange={(value) => onValueChange(value)}
          style={pickerSelectStyles}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    color: "black",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 5,
    color: "black",
  },
});

export default DropdownSelect;
