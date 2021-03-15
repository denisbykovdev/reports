import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ReportsScreen from "../screens/ReportsScreen";
import ReportScreen from "../screens/ReportScreen";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Reports" headerMode="none">
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Report" component={ReportScreen} />
    </Stack.Navigator>
  );
}
