import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  curCategory: string,
  genericType: string,
  search?: string,
  isChatCommunity?: boolean
  isTetrisModal?: boolean
  totalUnreadMessage?: number
}
const initialState: initialStateType = {
  curCategory: "stocks",
  search: "",
  genericType: "generic1",
  isChatCommunity:false,
  isTetrisModal:false,
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
    },
    setIsTestrisModal:(state,action) => {
      state.isTetrisModal = action.payload.isTetrisModal;
    },
    searchTitle:(state,action) => {
      state.search = action.payload.search;
    }
  }
});
export const { searchTitle,updateCurCategory, updateGenericType,updateIsChatCommunity,updateTotalUnreadMessage,setIsTestrisModal } = widgetSlice.actions;
export default widgetSlice.reducer;