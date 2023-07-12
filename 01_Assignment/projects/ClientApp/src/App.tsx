import React from "react";

import { MdPerson2, MdPassword } from "react-icons/md";

import { Formik } from "formik";

import AppForm from "./components/forms/AppForm";
import AppText from "./components/AppText";
import AppErrorMessage from "./components/forms/AppErrorMessage";
import AppButton from "./components/AppButton";
import AppFormInput from "./components/forms/AppFormInput";
import { Box, Center, Flex } from "@chakra-ui/react";

const App = () => {
  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Box
        w={350}
        h={250}
        
        rounded="md"
        borderWidth={2}
        borderRadius="lg"
        p={5}
      >
        <AppForm
          initialValues={{ name: "", password: "" }}
          onSubmit={() => {
            console.log("submit");
          }}
          validationSchema={null}
        >
          <AppText fontSize="lg">
            Login
          </AppText>
          <AppFormInput
            placeholder="User Name"
            name="name"
            type="text"
            icon={<MdPerson2 />}
          ></AppFormInput>
          <AppFormInput
            placeholder="Password"
            name="password"
            type="password"
            icon={<MdPassword />}
          ></AppFormInput>
          <AppButton>Login</AppButton>
        </AppForm>
      </Box>
    </Flex>
  );
};

export default App;
