import { MdPerson2, MdOutlineLock } from "react-icons/md";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppText from "../components/AppText";
import AppFormInput from "../components/forms/AppFormInput";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import useLogin from "../hooks/useLogin";

import AuthService from "../services/auth/AuthService";
import { User } from "../services/auth/LoginService";
import AppErrorMessage from "../components/forms/AppErrorMessage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(8).label("User Name"),
  password: Yup.string().required().min(8).label("Password"),
});

const initialValues: User = {
  name: "LabManager",
  password: "",
};
const LoginScreen = () => {
  const userLogin = useLogin();
  const authService = AuthService();
  const [loginFailed, setLoginFailed] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    const user: User = {
      name: values.name,
      password: values.password,
    };
    const response = await userLogin.mutateAsync(user);

    if (response) {
      authService.logIn(response.token);
      setLoginFailed(false);
      navigate("home");
    } else {
      setLoginFailed(true);
      actions.resetForm(initialValues);
    }
  };

  return (
    <Flex h="100vh" justifyContent="center" alignItems="center">
      <Box w={350} h={325} rounded="md" borderWidth={1} borderRadius="lg" p={5}>
        <AppForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppText fontSize="2xl">Siemens Operator Login</AppText>
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
            icon={<MdOutlineLock />}
          ></AppFormInput>
          <AppErrorMessage visible={loginFailed}>
            Invalid Login, Please retry.
          </AppErrorMessage>
          <AppSubmitButton
            isLoading={userLogin.isLoading}
            loadingText="Logging In"
          >
            Login
          </AppSubmitButton>
        </AppForm>
      </Box>
    </Flex>
  );
};

export default LoginScreen;
