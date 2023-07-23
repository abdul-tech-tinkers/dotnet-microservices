import React from "react";
import { useFormikContext } from "formik";
import AppCalender from "../AppCalender";
import AppErrorMessage from "./AppErrorMessage";

interface Props {
  name: string;
}

const AppFormCalendar = ({ name }: Props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const onDateSelected = async (date: Date) => {
    console.log(date);
    setFieldTouched(name, true);
    await setFieldValue(name, date);
  };

  return (
    <>
      <AppCalender
        startDate={values[name]}
        onDateSelected={(date) => onDateSelected(date)}
      />
      <AppErrorMessage visible={touched[name]}>{errors[name]}</AppErrorMessage>
    </>
  );
};

export default AppFormCalendar;
