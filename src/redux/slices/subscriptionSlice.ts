import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Subscription } from "../../types/data";

const initialState :Subscription = {
   plan:"",
   validUntil: new Date(),
   customerId:"",
   userId:""
}
const authSlice = createSlice({
    name:"wallet",
    initialState,
    reducers:{
        updatePlan : (state,action:PayloadAction<Subscription>)=>{
            state.plan =action.payload.plan;
            state.validUntil = action.payload.validUntil;
            state.userId = action.payload.userId;
            state.customerId = action.payload.customerId;
        },   
    }
})
export const {updatePlan}  = authSlice.actions;
export default authSlice.reducer;