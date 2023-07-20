import { Checkbox } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const AppCheckBox = ({ children, isChecked, onChange }: Props) => {
  return (
    <Checkbox
      size="md"
      colorScheme="green"
      defaultChecked={isChecked}
      onChange={(e) => {
        onChange(e.target.checked);
      }}
    >
      {children}
    </Checkbox>
  );
};

export default AppCheckBox;
