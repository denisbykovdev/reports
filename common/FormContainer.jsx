import React, { Fragment } from "react";
import { Formik } from "formik";

export default function FormContainer({
  children,
  initialValues,
  onSubmit,
  validationSchema,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnMount
    >
      {() => <Fragment>{children}</Fragment>}
    </Formik>
  );
}
