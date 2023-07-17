import React from "react";
import { IconButton } from "@chakra-ui/react";
interface props {
  aria_label: string;
  icon?: React.ReactElement;
  visible: boolean;
}
const AppIconButton = ({ aria_label, icon, visible = true }: props) => {
  return (
    <IconButton
      disabled={!visible}
      aria-label={aria_label}
      variant="unstyled"
      icon={icon}
    ></IconButton>
  );
};

export default AppIconButton;
