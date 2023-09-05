import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

const TimeList = ({ data, selectedTime, onSelect }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <FlatList
        data={data}
        horizontal={false}
        numColumns={5}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <View
              style={[
                styles.item,
                selectedTime === item ? styles.selectedItem : null,
              ]}
            >
              <Text>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexBasis: "33.33%",
    backgroundColor: "gray",
    padding: 10,
    margin: 5, // Adiciona um espaçamento entre os itens
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    backgroundColor: "lightblue", // Define um destaque para o item selecionado
  },
});

export default TimeList;
