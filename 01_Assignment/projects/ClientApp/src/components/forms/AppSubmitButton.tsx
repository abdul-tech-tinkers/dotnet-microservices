import { useFormikContext } from "formik";
import React from "react";

import AppButton from "../AppButton";
import * as colors from "../../config/colors";

interface props extends ComponentProps<"Button"> {
  children: React.ReactNode;
  color: string;
  width: string;
}

const AppSubmitButton = ({
  children,
  color = colors.primary,
  width = "100%",
  ...rest
}: props) => {
  const { handleSubmit, isValid, dirty } = useFormikContext();
  return (
    <AppButton
      isDisabled={!isValid || !dirty}
      color={color}
      width={width}
      {...rest}
      onClick={handleSubmit}
    >
      {children}
    </AppButton>
  );
};

export default AppSubmitButton;
