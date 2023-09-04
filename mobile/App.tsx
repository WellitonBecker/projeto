import { StatusBar } from "react-native";
import { Routes } from "./app/routes";

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar barStyle={"light-content"} backgroundColor="transparent" />
    </>
  );
}
