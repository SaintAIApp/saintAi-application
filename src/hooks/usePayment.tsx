import useAxios from "./useAxios";
const usePaymentServices = () => {
  const api = useAxios();
  const createCheckout = async (plan:string) => {
    try {
      const res = await api.post("/payment/create-checkout", { plan });
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };

  return { createCheckout };
};
export default usePaymentServices;
