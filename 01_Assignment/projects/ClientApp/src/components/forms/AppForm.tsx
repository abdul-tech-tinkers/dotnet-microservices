import React from "react";
import { Formik } from "formik";
interface props {
  initialValues: any;
  onSubmit: () => void;
  validationSchema: any;
  children: React.ReactNode;
}

function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: props) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
