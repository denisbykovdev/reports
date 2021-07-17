import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { createStackNavigator } from "@react-navigation/stack";
// import { StateInspector } from "reinspect";

export default function Router() {

  const RouterStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RouterStack.Navigator headerMode="none">
        <RouterStack.Screen name="AuthStack" component={AuthStack} />
        <RouterStack.Screen name="AppStack" component={AppStack} />
      </RouterStack.Navigator>
    </NavigationContainer>
  );
}
