import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";

export function Routes() {
  const [isUserAuthenticate, setIsUserAuthenticate] = useState<null | boolean>(
    null
  );
  const handleLogins = () => {
    setIsUserAuthenticate(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <AppRoutes
          onLogin={handleLogins}
          isUserAuthenticate={isUserAuthenticate}
        />
      </NavigationContainer>
    </View>
  );
}
