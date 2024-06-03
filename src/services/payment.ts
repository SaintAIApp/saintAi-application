import api from "./api";

export const createCheckoutService = async (plan: string) => {
  try {
    const res = await api.post("/payment/create-checkout", { plan });
    return res.data;
  } catch (err: any) {
    throw {
      message: err.response?.data?.message || "Something went wrong!",
    };
  }
};