import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Reducers/UserReducer";
import CodeReducer from "./Reducers/CodeReducer";
import QuestionReducer from "./Reducers/QuestionReducer";
import SolutionReducer from "./Reducers/SolutionReducer";
import AuthReducer from "./Reducers/AuthReducer";
import LoadingReducer from "./Reducers/LoadingReducer";
import authMiddleware from "./Middleware/AuthMiddleware";
import DiscussionReducer from './Reducers/DiscussionReducer';
export default  configureStore({
    reducer : {
        loadingReducer : LoadingReducer,
        authReducer : AuthReducer,
        userReducer: UserReducer,
        codeReducer:CodeReducer,
        questionReducer:QuestionReducer,
        solutionReducer : SolutionReducer,
        discussionReducer : DiscussionReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }).concat(authMiddleware),
});

