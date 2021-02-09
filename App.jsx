import React from "react";

import Router from "./navigation/Router";

import * as SplashScreen from "expo-splash-screen";

// import { I18nManager } from "react-native";

// I18nManager.forceRTL(false);

export default function App() {
  SplashScreen.hideAsync();
  return <Router />;
}
