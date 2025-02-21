import { useCallback } from "react";
import useAxios from "./useAxios";

const useLeaderboard = () => {
  const api = useAxios();

  const getLeaderboards = useCallback(async () => {
    try {
      const res = await api.get("/user/leaderboard");
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  }, [api]);

  return { getLeaderboards };
};

export default useLeaderboard;
