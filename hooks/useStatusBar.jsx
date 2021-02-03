import React, { useCallback } from "react";
import { Platform, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import colors from "../utils/colors";

//ios/Android
export default function useStatusBar(
  style, 
  color = colors.white, 
  animated = true) {

  useFocusEffect(
    useCallback(() => {
      Platform.OS === `Android`
        ? StatusBar.setBackgroundColor(color, animated)
        : StatusBar.setBarStyle(style, animated);
    }, [Platform.OS])
  );
}
