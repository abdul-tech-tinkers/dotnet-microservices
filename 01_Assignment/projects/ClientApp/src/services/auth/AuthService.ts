// take name and password
// contact the backend and try to login
// if login is fine set the token in auth storage
// set login is successful global flag with user details
// name of the function is login
import useUserStore from "../../stores/UserStore";
import AuthStorage from "./AuthStorage";
import jwtDecode from "jwt-decode";

const AuthService = () => {
  const { setUser } = useUserStore();
  const logIn = (token: string) => {
    AuthStorage.storeToken(token);
    const token_decoded = jwtDecode(token);
    const user_decoded: LoggedInUser = {
      name: token_decoded.sub,
      type: token_decoded.UserType,
    };
    setUser(user_decoded.name, user_decoded.type);
  };

  const logOut = () => {
    // remove user context
    AuthStorage.removeToken();
    setUser("", "");
  };

  return { logIn, logOut };
};
export default AuthService;
