import { useCallback } from "react";
import useAxios from "./useAxios";

const useMineService = () => {
  const api = useAxios();

  const getMineDetail = useCallback(async (userId: string) => {
    try {
      const res = await api.get("/user/mine/details/" + userId);
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);
  const getTotalDuration = useCallback(async () => {
    try {
      const res = await api.get("/user/mine/total-duration");
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  return { getMineDetail, getTotalDuration };
};

export default useMineService;
