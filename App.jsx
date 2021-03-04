import React from "react";
import Router from "./navigation/Router";
import * as SplashScreen from "expo-splash-screen";
import AuthProvider from "./providers/AuthProvider";
import { I18nManager } from "react-native";

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);


export default function App() {
  SplashScreen.hideAsync();
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
