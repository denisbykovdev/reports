import React from "react";
import Router from "./navigation/Router";
import * as SplashScreen from "expo-splash-screen";
import AuthProvider from "./providers/AuthProvider";


export default function App() {
  SplashScreen.hideAsync();
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
