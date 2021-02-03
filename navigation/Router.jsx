import React from "react";
import useToken from "../hooks/useToken";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

export default function Router() {
  const token = useToken()

  return (
    <NavigationContainer>
      {
        token ? <AppStack /> : <AuthStack />
      }
    </NavigationContainer>
  );
}
