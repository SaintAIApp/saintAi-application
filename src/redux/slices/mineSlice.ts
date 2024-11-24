import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MineData } from "../../types/data";

type initialStateType = {
  
  mine: MineData | null;
}

const initialState: initialStateType = {
  mine:null
};

const authSlice = createSlice({
  name: "mine",
  initialState,
  reducers: {
    detailMine: (state, action: PayloadAction<Omit<initialStateType, "isLoggedIn">>) => {
      state.mine = action.payload.mine;      
    },
  }
});

export const { detailMine } = authSlice.actions;
export default authSlice.reducer;
