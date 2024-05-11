import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateApi } from "../../axios";
import { STATUS } from "../../Services/StatusCode";
// import { notAuthenticated } from "../../Services/Auth";

const initialState = {
    isLoading : false,
    allQuestions : [],
    codeEditorQuestion : null,
}

const QuestionReducer = createSlice({
    name : 'question',
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{
        builder
        .addCase(getAllQuestionsThunk.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getAllQuestionsThunk.fulfilled, (state,action)=>{
            state.allQuestions = action.payload.data.data;
            state.isLoading = false;
            //console.log("question extra reducer ",action.payload.data.data);
        })
        .addCase(getAllQuestionsThunk.rejected, (state, action)=>{
            state.isLoading = false;
            //console.log("error in question extra reducer ",action.payload);
        })
        .addCase(getQuestionByIdThunk.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getQuestionByIdThunk.fulfilled, (state, action)=>{
            state.codeEditorQuestion = action.payload.data.data;
            state.isLoading = false;
        })
        .addCase(getQuestionByIdThunk.rejected, (state, action)=>{
            state.isLoading = false;
            //console.log("erro is getqsnid rejecred",action.payload);
        })
    }
});

export const selectAllQuestion = (state)=>state.questionReducer.allQuestions;
export const selectQuestion = (state)=>state.questionReducer.codeEditorQuestion;
export const selectLoadingStateOfQuestion  = (state)=>state.questionReducer.isLoading;
export default QuestionReducer.reducer;

export const getAllQuestionsThunk = createAsyncThunk('question/getAllQuestionsThunk',async(_, {dispatch, rejectWithValue})=>{
    try{
        const response = await privateApi.get('/question/get-questions');
        // //console.log("questio nthunk", response);
        return response;
    }
    catch(error){
        // //console.log("error in q -thunk ",error);
        return rejectWithValue(error.response);
    }
})

export const getQuestionByIdThunk = createAsyncThunk('question/getQuestionByIdThunk',async(data, {rejectWithValue})=>{
    try {
        const response = await privateApi.get('/question/get-question-by-id/'+data.questionId);
        return response;
    }
    catch(error){
        return rejectWithValue(error.response);
    }
})