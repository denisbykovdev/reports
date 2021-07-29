import React, { useLayoutEffect } from "react";
import Router from "./navigation/Router";
import * as SplashScreen from "expo-splash-screen";
import AuthProvider from "./providers/AuthProvider";

import { I18nManager } from "react-native";
import TypeProvider from "./providers/TypeProvider";
import DefectsProvider from "./providers/DefectsProvider";
import CheckedProvider from "./providers/CheckedProvider";

import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export default function App() {
  SplashScreen.hideAsync();

  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TypeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              <CheckedProvider>
                <DefectsProvider>
                  <Router />
                </DefectsProvider>
              </CheckedProvider>
            </AuthProvider>
          </PersistGate>
        </Provider >
      </TypeProvider>
    )
  }
}
