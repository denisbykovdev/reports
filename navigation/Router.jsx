import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { createStackNavigator } from "@react-navigation/stack";
import { StateInspector } from "reinspect";
import useLocker from "../hooks/useLocker";

export default function Router() {
  useLocker();

  const RouterStack = createStackNavigator();

  return (
    <StateInspector name="app">
      <NavigationContainer>
        <RouterStack.Navigator headerMode="none">
          <RouterStack.Screen name="AuthStack" component={AuthStack} />
          <RouterStack.Screen name="AppStack" component={AppStack} />
        </RouterStack.Navigator>
      </NavigationContainer>

    </StateInspector>
  );
}
