import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducers/UserReducer";
import CodeReducer from "./Reducers/CodeReducer";
export default  configureStore({
    reducer : {
        userReducer: UserReducer,
        codeReducer:CodeReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
});