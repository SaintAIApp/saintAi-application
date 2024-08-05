import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/data";

type initialStateType = {
  token: string | null;
  user: IUser | null;
  isLoggedIn: boolean;
}

const initialState: initialStateType = {
  token: null,
  user: null,
  isLoggedIn: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<initialStateType, "isLoggedIn">>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  }
});

export const { login, logout, setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
