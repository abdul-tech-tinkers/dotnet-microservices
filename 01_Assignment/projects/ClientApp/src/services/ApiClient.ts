import axiosInstance from "./AxoisInstance";
import AuthStorage from "./auth/AuthStorage";

class ApiClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = async (id: string) => {
    const url = this.endpoint + `/${id}`;
    console.log(url);
    const res = await axiosInstance.get<T>(url);
    return res;
  };

  getAll = async () => {
    const authToken = AuthStorage.getToken();
    console.log(`get all from ApiClientClass ${this.endpoint}`);
    const res = await axiosInstance.get<T[]>(this.endpoint, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    return res.data;
  };

  post = async (data: T) => {
    console.log(`posting data ${this.endpoint}`);
    const authToken = AuthStorage.getToken();
    const res = await axiosInstance.post<T>(this.endpoint, data, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    return res.data;
  };

  put = async (data: T) => {
    console.log(`put data ${this.endpoint}`);
    const authToken = AuthStorage.getToken();
    const res = await axiosInstance.put<T>(this.endpoint, data, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    return res.data;
  };

  delete = async (id: string) => {
    const url = this.endpoint + `/${id}`;
    const authToken = AuthStorage.getToken();
    console.log(`delete by id id from ApiClientClass ${url}`);
    const res = await axiosInstance.delete<T>(url, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    return res.data;
  };

  deleteAll = async () => {
    const authToken = AuthStorage.getToken();
    console.log(`delete by id id from ApiClientClass ${this.endpoint}`);
    const res = await axiosInstance.delete<T>(this.endpoint, {
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
    return res.data;
  };
}

export default ApiClient;
