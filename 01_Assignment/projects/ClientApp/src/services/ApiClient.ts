import axiosInstance from "./AxoisInstance";

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
    console.log(`get all from ApiClientClass ${this.endpoint}`);
    const res = await axiosInstance.get<T[]>(this.endpoint);
    return res.data;
  };

  post = async (data: T) => {
    try {
      console.log(`posting data ${this.endpoint}`);
      const res = await axiosInstance.post<T>(this.endpoint, data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  put = async (data: T) => {
    console.log(`put data ${this.endpoint}`);
    const res = await axiosInstance.put<T>(this.endpoint, data);
    return res.data;
  };

  delete = async (id: string) => {
    const url = this.endpoint + `/${id}`;
    console.log(`delete by id id from ApiClientClass ${url}`);
    const res = await axiosInstance.delete<T>(url);
    return res.data;
  };
}

export default ApiClient;
