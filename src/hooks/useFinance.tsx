import useAxios from "./useAxios";
const useFinanceService = () => {
  const api = useAxios();
  const getStocksData = async () => {
    try {
      const res = await api.get("/finance/stocks");
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };
  const getCryptoData = async () => {
    try {
      const res = await api.get("/finance/crypto");
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };
  const getNewsData = async () => {
    try {
      const res = await api.get("/finance/news");
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };

  return { getStocksData,getCryptoData,getNewsData};
};
export default useFinanceService;
