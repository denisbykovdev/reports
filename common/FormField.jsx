import React, { useState } from "react";
import { useFormikContext } from "formik";
import FormErrorMessage from "./FormErrorMessage";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../utils/colors";
import { responsiveWidth, responsiveHeight } from "../utils/layout";
import fonts from "../utils/fonts";
import weights from "../utils/weights";

export default function FormField({
  name,
  width = "100%",
  placeholder,
  borderRadius = 5,
  children,
  style,
  inputStyle,
  ...otherProps
}) {
  const {
    setFieldValue,
    setFieldTouched,
    values,
    errors,
    touched,
  } = useFormikContext();

  return (
    <View style={[styles.formFieldContainer]}>
      <View
        style={[
          styles.formField,
          {
            width: width,
            borderRadius,
          },
          style
        ]}
      >
        <TextInput
          // placeholderStyle={}
          value={values[name]}
          onChangeText={(text) => {
            setFieldValue(name, text);
          }}
          onBlur={() => setFieldTouched(name)}
          placeholder={placeholder}
          // placeholderTextColor={}
          style={[styles.input, inputStyle]}
          {...otherProps}
        />

        {children}
      </View>
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  formFieldContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center'
  },
  formField: {
    alignItems: "center",
    backgroundColor: colors.white,
    justifyContent: "flex-end",
    flexDirection: "row",
    height: responsiveWidth(43),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.darkWhite,
    backgroundColor: colors.white,
    padding: responsiveWidth(10)
  },
  input: {
    height: "100%",
    width: "100%",
    textAlign : "right",
    // writingDirection: 'rtl',
    marginRight: responsiveWidth(10),
    fontSize: fonts.xsmall,
    fontWeight: weights.regular
  },
});
