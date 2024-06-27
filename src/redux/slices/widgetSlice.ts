import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType ={
    curCategory:string,
    genericType:string
}
const initialState :initialStateType = {
    curCategory:"stocks",
    genericType:"generic1"
}
const widgetSlice = createSlice({
    name:"widget",
    initialState,
    reducers:{
        updateCurCategory : (state,action:PayloadAction<initialStateType>)=>{
            state.curCategory =action.payload.curCategory;
        },
        updateGenericType: (state,action)=>{
            state.genericType = action.payload.genericType;
        }
    }
})
export const {updateCurCategory,updateGenericType}  = widgetSlice.actions;
export default widgetSlice.reducer;