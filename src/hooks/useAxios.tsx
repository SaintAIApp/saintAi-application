import axios from "axios";
import { useAppSelector } from "../redux/hooks";
import { useMemo } from "react";
const useAxios = () => {
  const token = useAppSelector((state) => { return state.auth.token; });

  return useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}` || "",
      },
    });
    instance.interceptors.request.use((config) => {
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    });
    return instance;
  }, [token]);
};

export default useAxios;