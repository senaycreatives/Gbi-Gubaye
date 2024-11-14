import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import axios from "axios";

const useAuthApi = () => {
  const token = useAuthHeader();

  const api = axios.create({
    baseURL: "http://localhost:3000",
  });

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};

export default useAuthApi;
