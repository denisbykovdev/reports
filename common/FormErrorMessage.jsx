import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../utils/colors";
import fonts from "../utils/fonts";
import { responsiveWidth } from "../utils/layout";

export default function FormErrorMessage({ error, visible }) {
  if (!error || !visible) {
    return null;
  }

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: responsiveWidth(28)
  },
  errorText: {
      fontSize: fonts.small,
      color: colors.error, 
      marginBottom: responsiveWidth(10)
  },
});
