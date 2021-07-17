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

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

export default function App() {
  SplashScreen.hideAsync();

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
