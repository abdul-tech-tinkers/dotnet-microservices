import secureLocalStorage from "react-secure-storage";

const authTokenKey = "authToken";

const storeToken = (token: string) => {
  secureLocalStorage.setItem(authTokenKey, token);
};

const getToken = () => {
  return secureLocalStorage.getItem(authTokenKey);
};

const removeToken = () => {
  secureLocalStorage.removeItem(authTokenKey);
};

export default { storeToken, getToken, removeToken };
