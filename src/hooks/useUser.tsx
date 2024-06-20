

import useAxios from "./useAxios";
const useUserService = () => {
  const api = useAxios();
  const getUserDetails = async (userId:string) => {
      try {
        const res = await api.get("/user/details/"+userId);
        return res;
      } catch (error: any) {
        throw new Error(error.response?.data?.message||"Something went wrong")
      }
   
  };

  
  return { getUserDetails};
};
export default useUserService;
