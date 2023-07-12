import { useMutation } from "@tanstack/react-query";
import LoginService, { User } from "../services/auth/LoginService";
interface LoginResponse {
  token: string;
  name: string;
}
const useLogin = () => {
  return useMutation<LoginResponse, Error, User>({
    mutationFn: LoginService.post,
  });
};
export default useLogin;
