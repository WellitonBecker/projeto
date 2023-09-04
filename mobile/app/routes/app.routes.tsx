import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from "../screens/Home";
import LoginScreen from "../../components/LoginScreen";

interface AppRoutesProps {
  onLogin: () => void;
  isUserAuthenticate: boolean;
}

export function AppRoutes({ onLogin, isUserAuthenticate }: AppRoutesProps) {
  return (
    <>
      <Navigator screenOptions={{ headerShown: false }}>
        {isUserAuthenticate ? (
          <>
            <Screen name="home" component={Home} />
          </>
        ) : (
          <Screen name="login">
            {() => <LoginScreen onLogin={onLogin} />}
          </Screen>
        )}
      </Navigator>
    </>
  );
}
