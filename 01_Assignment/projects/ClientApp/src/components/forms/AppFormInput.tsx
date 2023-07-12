import React from "react";
import { useFormikContext } from "formik";
import AppInput from "../AppInput";
import AppErrorMessage from "./AppErrorMessage";

interface props {
  name: string;
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
}
const AppFormInput = ({ name, icon, placeholder, type }: props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <AppInput
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={(event) => setFieldValue(name, event.target.value)}
        icon={icon}
        placeholder={placeholder}
        type={type}
      ></AppInput>
      <AppErrorMessage visible={touched[name]} >{errors[name]}</AppErrorMessage>
    </>
  );
};

export default AppFormInput;
