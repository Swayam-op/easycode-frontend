import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducers/UserReducer";

export default  configureStore({
    reducer : {
        userReducer: UserReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
});