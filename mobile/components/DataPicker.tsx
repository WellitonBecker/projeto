import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SafeAreaView, Button } from "react-native";

export default function DataPicker({ onSelect }) {
  const [date, setDate] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    onSelect(currentDate);
  };

  const showMode = () => {
    DateTimePickerAndroid.open({
      value: date == null ? new Date() : date,
      onChange,
      mode: "date",
      minimumDate: new Date(),
      is24Hour: true,
    });
  };
  const titleButton =
    date == null ? "Escolha uma data" : date.toLocaleDateString();

  return (
    <SafeAreaView>
      <Button onPress={showMode} title={titleButton} color="gray" />
    </SafeAreaView>
  );
}
