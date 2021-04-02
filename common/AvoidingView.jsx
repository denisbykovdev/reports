import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";


export default function AvoidingView({ children, style }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[styles.avoidingContainer, style]}
      enabled
      // keyboardVerticalOffset={Platform.select({
      //   ios: (Constants.statusBarHeight), 
      //   // ios: 40,
      //   android: 78
      // })}
      // style={{
      //   backgroundColor: 'rgba(0, 0, 0, 0)',
      // }}
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
