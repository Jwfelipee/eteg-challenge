import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/v1",
});

export const http = {
  get: async (url: string) => {
    try {
      const { data, status } = await axiosInstance.get(url);
      return { data, status };
    } catch (error: any) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  },
  post: async (url: string, body: any) => {
    try {
      const { data, status } = await axiosInstance.post(url, body);
      return { data, status };
    } catch (error: any) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  },
  put: async (url: string, body: any) => {
    try {
      const { data, status } = await axiosInstance.put(url, body);
      return { data, status };
    } catch (error: any) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  },
  del: async (url: string) => {
    try {
      const { data, status } = await axiosInstance.delete(url);
      return { data, status };
    } catch (error: any) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    }
  },
};
