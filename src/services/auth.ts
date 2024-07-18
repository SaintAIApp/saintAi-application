import api from "./api";

export const loginService = async (email: string, password: string) => {
  try {
    const res = await api.post("/user/login", { email, password });
    return res.data;
  } catch (err: any) {
    throw {
      message: err.response?.data?.message || "Something went wrong!",
    };
  }
};

export const signupService = async (username: string, email: string, password: string) => {
    try {
        const res = await api.post("/user/signup", { username, email, password });
        return res.data;
    } catch (err: any) {
    throw {
            message: err.response?.data?.message || "Something went wrong!",
        };
    }
}

export const verifyUserService = async (otp: number) => {
    try {
        const res = await api.post("/user/verify-user", { otp });
        return res.data;
    } catch (err: any) {
        throw {
            message: err.response?.data?.message || "Something went wrong!",
        };
    }
}

export const changePasswordService = async (oldPassword: string, newPassword: string) => {
    try {
        const res = await api.post("/user/change-password", { oldPassword, newPassword });
        return res.data;
    } catch (err: any) {
        throw {
            message: err.response?.data?.message || "Something went wrong!",
        };
    }
}

export const forgotPasswordService = async (email: string) => {
    try {
        const res = await api.post("/user/forgot-password", { email });
        return res.data;
    } catch (err: any) {
        throw {
            message: err.response?.data?.message || "Something went wrong!",
        };
    }
}

export const resetPasswordService = async (otp: number, password: string) => {
    try {
        const res = await api.post("/user/reset-password", { otp, password });
        return res.data;
    } catch (err: any) {
        throw {
            message: err.response?.data?.message || "Something went wrong!",
        };
    }
}