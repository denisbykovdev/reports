import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import { responsiveHeight } from "../utils/layout";


export default function AvoidingView({ children, style }) {
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS == "ios" ? "padding" : "height"}
      behavior= "padding"
      style={[styles.avoidingContainer, style]}
      enabled
      keyboardVerticalOffset={Platform.select({
        // ios: (Constants.statusBarHeight), 
        ios: 0,
        android: responsiveHeight(-300)
      })}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avoidingContainer: {
    flex: 1,
  },
});
