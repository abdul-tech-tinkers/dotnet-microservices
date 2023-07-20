import React from "react";
import { useFormikContext } from "formik";
import AppCheckBox from "../AppCheckBox";
import AppErrorMessage from "./AppErrorMessage";
interface Props {
  name: string;
  children: React.ReactNode;
  isChecked: boolean;
}

const AppFormCheckBox = ({ name, children, isChecked }: Props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const OnChange = (checked: boolean) => {
    setFieldTouched(name, true);
    setFieldValue(name, checked);
  };
  return (
    <>
      <AppCheckBox onChange={OnChange} isChecked={isChecked}>
        {children}
      </AppCheckBox>
      <AppErrorMessage visible={touched[name]}>{errors[name]}</AppErrorMessage>
    </>
  );
};

export default AppFormCheckBox;
