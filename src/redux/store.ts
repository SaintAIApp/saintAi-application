import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mineReduce from "./slices/mineSlice";
import walletReducer from "./slices/walletSlice";
import widgetSlice from "./slices/widgetSlice";
import subscriptionSlice from "./slices/subscriptionSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";

const persistConfig = {
  storage: storage,
  key: "root",
  version: 1,
};

const reducer = combineReducers({ auth: authReducer,mine:mineReduce, wallet: walletReducer, subscription: subscriptionSlice, widget: widgetSlice, authModal: modalReducer });
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
