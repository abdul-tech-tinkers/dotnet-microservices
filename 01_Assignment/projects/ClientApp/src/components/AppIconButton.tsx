import React from "react";
import { IconButton } from "@chakra-ui/react";
interface props {
  aria_label: string;
  icon?: React.ReactElement;
  visible: boolean;
  onClick: () => void;
}
const AppIconButton = ({
  aria_label,
  icon,
  onClick,
  visible = true,
}: props) => {
  return (
    <IconButton
      disabled={!visible}
      aria-label={aria_label}
      variant="unstyled"
      icon={icon}
      onClick={onClick}
    ></IconButton>
  );
};

export default AppIconButton;
