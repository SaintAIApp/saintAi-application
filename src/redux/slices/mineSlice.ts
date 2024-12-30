import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MineData } from "../../types/data";

type initialStateType = {
  
  mine: MineData | null;
  isJackpot: boolean;
}

const initialState: initialStateType = {
  mine:null,
  isJackpot:false,
};

const authSlice = createSlice({
  name: "mine",
  initialState,
  reducers: {
    detailMine: (state, action: PayloadAction<MineData>) => {
      state.mine = action.payload;
    },
    setIsJackpot: (state, action: PayloadAction<boolean>) => {
      state.isJackpot = action.payload;
    },
  }
});

export const { detailMine,setIsJackpot } = authSlice.actions;
export default authSlice.reducer;
