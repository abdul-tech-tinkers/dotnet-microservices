import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "../AppText";
import * as colors from "../../config/colors";
interface props {
  children: React.ReactNode;
  visible: boolean;
}
const AppErrorMessage = ({ children, visible }: props) => {
  if (!visible || !children) return;
  return (
    <AppText marginLeft={1} color={colors.danger}>
      {children}
    </AppText>
  );
};

export default AppErrorMessage;
