import React from "react";

import Router from "./navigation/Router";

import * as SplashScreen from "expo-splash-screen";

export default function App() {
  SplashScreen.hideAsync();
  return <Router />;
}
