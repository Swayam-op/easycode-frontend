import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducers/UserReducer";
import CodeReducer from "./Reducers/CodeReducer";
import QuestionReducer from "./Reducers/QuestionReducer";
export default  configureStore({
    reducer : {
        userReducer: UserReducer,
        codeReducer:CodeReducer,
        questionReducer:QuestionReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
});