import React, { useLayoutEffect } from "react";
import Router from "./navigation/Router";
import * as SplashScreen from "expo-splash-screen";
import AuthProvider from "./providers/AuthProvider";

import { I18nManager } from "react-native";
import TypeProvider from "./providers/TypeProvider";
import DefectsProvider from "./providers/DefectsProvider";
import CheckedProvider from "./providers/CheckedProvider";

import { Provider } from 'react-redux';
import store from "./store";
import useLocker from "./hooks/useLocker";
// import { NetworkProvider } from 'react-native-offline';

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export default function App() {
  SplashScreen.hideAsync();
  // useLocker()

  return (
    <TypeProvider>
      <Provider store={store}>
        <AuthProvider>

          <CheckedProvider>
            <DefectsProvider>

              <Router />

            </DefectsProvider>
          </CheckedProvider>

        </AuthProvider>
      </Provider >
    </TypeProvider>
  )
}
