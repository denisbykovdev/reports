import React from "react";
import { useFormikContext } from "formik";
import CommonButton from "./CommonButton";

export default function FormButton({ ...props }) {
  const { handleSubmit } = useFormikContext();

  return (
    <CommonButton
      onPress={handleSubmit}
      {...props}
    />
  );
}
