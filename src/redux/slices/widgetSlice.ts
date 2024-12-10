import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  curCategory: string,
  genericType: string,
  isChatCommunity?: boolean
  totalUnreadMessage?: number
}
const initialState: initialStateType = {
  curCategory: "stocks",
  genericType: "generic1",
  isChatCommunity:false,
  totalUnreadMessage:0
};
const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    updateCurCategory: (state, action: PayloadAction<initialStateType>) => {
      state.curCategory = action.payload.curCategory;
    },
    updateGenericType: (state, action) => {
      state.genericType = action.payload.genericType;
    },
    updateIsChatCommunity:(state,action) => {
      state.isChatCommunity = action.payload.isChatCommunity;
    },
    updateTotalUnreadMessage:(state,action) => {
      state.totalUnreadMessage = action.payload.totalUnreadMessage;
    }
  }
});
export const { updateCurCategory, updateGenericType,updateIsChatCommunity,updateTotalUnreadMessage } = widgetSlice.actions;
export default widgetSlice.reducer;