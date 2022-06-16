import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Platform, StyleSheet } from 'react-native'

const typography = () => {
  const oldTextRender = Text.render
  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args)
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    })
  }
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Roboto_400Regular'
  }
});

export default function Router() {
  typography()

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
