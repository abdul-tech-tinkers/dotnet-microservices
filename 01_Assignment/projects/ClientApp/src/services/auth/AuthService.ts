// take name and password
// contact the backend and try to login
// if login is fine set the token in auth storage
// set login is successful global flag with user details
// name of the function is login
import AuthStorage from "./AuthStorage";

const AuthService = () => {
  const logIn = (token: string) => {
    AuthStorage.storeToken(token);
  };

  const logOut = () => {
    // remove user context
    AuthStorage.removeToken();
  };

  return { logIn, logOut };
};
export default AuthService;
