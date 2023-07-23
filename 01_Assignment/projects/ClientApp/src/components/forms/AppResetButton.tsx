import { useFormikContext } from "formik";
import React from "react";

import AppButton from "../AppButton";
import * as colors from "../../config/colors";

interface props extends ComponentProps<"Button"> {
  children: React.ReactNode;
  color: string;
  width: string;
}

const AppResetButton = ({
  children = "Reset",
  color = colors.secondary,
  width = "100%",
  ...rest
}: props) => {
  const { resetForm, isValid, dirty } = useFormikContext();
  return (
    <AppButton
      isDisabled={!isValid || !dirty}
      color={color}
      width={width}
      {...rest}
      onClick={() => resetForm()}
    >
      {children}
    </AppButton>
  );
};

export default AppResetButton;
