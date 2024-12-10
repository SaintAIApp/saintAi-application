import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  curCategory: string,
  genericType: string,
  isChatCommunity: boolean
}
const initialState: initialStateType = {
  curCategory: "stocks",
  genericType: "generic1",
  isChatCommunity:false,
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
    }
  }
});
export const { updateCurCategory, updateGenericType,updateIsChatCommunity } = widgetSlice.actions;
export default widgetSlice.reducer;