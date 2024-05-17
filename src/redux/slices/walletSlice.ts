import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wallet } from "../../types/data"

type initialStateType ={
    wallet: Wallet | null
}
const initialState :initialStateType = {
    wallet:null
}
const authSlice = createSlice({
    name:"wallet",
    initialState,
    reducers:{
        connectWallet : (state,action:PayloadAction<initialStateType>)=>{
            state.wallet =action.payload.wallet;
        },
        disconnectWallet: (state)=>{
            state.wallet = null;
        }
    }
})
export const {connectWallet,disconnectWallet}  = authSlice.actions;
export default authSlice.reducer;