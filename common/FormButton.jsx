import React from "react";
import { useFormikContext } from "formik";
import CommonButton from "./CommonButton";
import { useEffect } from "react";

export default function FormButton({ ...props }) {
  const
    {
      submitForm,
      isValid
    }
      = useFormikContext();

  return (
    <CommonButton
      onPress={submitForm}
      disabled={!isValid}
      {...props}
    />
  );
}
