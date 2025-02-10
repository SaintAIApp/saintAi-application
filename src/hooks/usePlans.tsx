import { useCallback } from "react";
import useAxios from "./useAxios";

const usePlanService = () => {
    const api = useAxios();

    const getPlans = useCallback(async () => {
        try {
            const res = await api.get("/plans");
            return res;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || "Something went wrong");
        }
    }, [api]);
    return { getPlans };
};

export default usePlanService;
