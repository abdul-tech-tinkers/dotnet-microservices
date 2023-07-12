import ApiClient from "../ApiClient";
export interface User {
  name: string;
  password: string;
}
export default new ApiClient<User>("/api/auth/login");
