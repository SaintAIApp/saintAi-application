// import { notify } from "../utils/notify";
// import { useAppDispatch } from "../redux/hooks";

import useAxios from "./useAxios";
const useAuthService = () => {
  const api = useAxios();
  const loginUser = async (email:string,password:string) => {
      try {
        const res = await api.post("/user/login",{email,password});
        console.log(res);
        return res;
      } catch (error: any) {
        throw new Error(error.response?.data?.message||"Something went wrong");
      }
   
  };
  const signup = async (username:string,email:string,password:string) => {
    try {
      const res = await api.post("/user/signup",{username,email,password});
      return res;
    } catch (error: any) {
      throw new Error(error.response?.data?.message||"Something went wrong");
    }
 
};
const verifyOTP = async (otp:number) => {
    try {
      const res = await api.post("/user/verify-user",{otp});
      return res;
    } catch (error: any) {
        throw new Error(error.response?.data?.message||"Something went wrong");
    }
 
};

const deleteAccount = async (userId:string) => {
  try {
    const res = await api.post(`/user/delete-account/${userId}`);
    return res;
  } catch (error: any) {
      throw new Error(error.response?.data?.message||"Something went wrong");
  }
};

const forgotOTP = async (email:string) => {
  try {
    const res = await api.post(`/user/forgot-password/`,{email});
    return res;
  } catch (error: any) {
      throw new Error(error.response?.data?.message||"Something went wrong");
  }
};

const resetPassword  = async (otp:number,password:string) => {
  try {
    const res = await api.post(`/user/reset-password/`,{otp,password});
    return res;
  } catch (error: any) {
      throw new Error(error.response?.data?.message||"Something went wrong");
  }
};
  
  return { loginUser,signup,verifyOTP,deleteAccount,forgotOTP,resetPassword};
};
export default useAuthService;
