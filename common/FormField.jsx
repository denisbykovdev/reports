import React, { useState } from "react";
import { useFormikContext } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../utils/colors";

export default function FormField({
  name,
  width = "100%",
  placeholder,
  borderRadius = "5",
  children,
}) {
  const {
    setFieldValue,
    setFieldTouched,
    values,
    errors,
    touched,
  } = useFormikContext();

  return (
    <View style={styles.formFieldContainer}>
      <View style={styles.formField}>
        <TextInput
          value={values[name]}
          onChangeText={(text) => {
            setFieldValue(name, text);
          }}
          onBlur={() => setFieldTouched(name)}
          placeholder={placeholder}
          placeholderTextColor={}
          style={[
            styles.input,
            {
              width: width,
              borderRadius: borderRadius,
            },
          ]}
        />

        {children}
      </View>
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  formFieldContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  formField: {
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    flexDirection: "row-reverse"
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.darkWhite,
    backgroundColor: colors.white,
  },
});