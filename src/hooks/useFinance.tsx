import { useCallback } from "react";
import useAxios from "./useAxios";

const useFinanceService = () => {
  const api = useAxios();

  const getStocksData = useCallback(async () => {
    try {
      const res = await api.get("/finance/stocks");
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  const getCryptoData = useCallback(async () => {
    try {
      const res = await api.get("/finance/crypto");
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  const getNewsData = useCallback(async () => {
    try {
      const res = await api.get("/finance/news");
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  return { getStocksData, getCryptoData, getNewsData };
};

export default useFinanceService;
