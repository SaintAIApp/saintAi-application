import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  currentModal: "login" | "signup" | "verifyOtp" | "lock" | null;
};

const initialState: ModalState = {
  currentModal: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setCurrentModal: (state, action: PayloadAction<ModalState["currentModal"]>) => {
      state.currentModal = action.payload;
    },
  },
});

export const { setCurrentModal } = modalSlice.actions;
export default modalSlice.reducer;
