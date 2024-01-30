import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateApi } from "../../axios";
import { pendingToast, errorToast, successToast } from "../../Services/ToastHandler";

const initialState = {
    singleSolutionInfo : null,
    solutionList : [],
    message : "",
    isLoading : false,
    solutionCode : ""
}

const solutionReducer = createSlice({
    name : 'solution',
    initialState,
    reducers : {
        setSolutionCode : (state, action)=>{
            state.solutionCode = action.payload.code;
        },
        setSingleSolutionInfo : (state, action)=>{
            state.singleSolutionInfo = action.payload;
        },
        clearSolutionList : (state, action)=>{
            console.log("it's empty now")
            state.solutionList = [];
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(uploadSolutionThunk.pending,(state)=>{
            state.isLoading = true;
            pendingToast("Submission is pending! 🦉");
        })
        .addCase(uploadSolutionThunk.fulfilled, (state, action)=>{
            state.message = action.payload.data.message;
            state.isLoading = false;
            successToast(action.payload.data.message + "🦄");
        })
        .addCase(uploadSolutionThunk.rejected, (state, action)=>{
            state.message = action.payload.data.message;
            state.isLoading = false;
            errorToast(action.payload.data.message + "💀");
        })
        .addCase(getSolutionsThunk.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getSolutionsThunk.fulfilled, (state, action)=>{
            state.solutionList = [...state.solutionList, ...action.payload.data.data];
            state.isLoading = false;
        })
        .addCase(getSolutionsThunk.rejected, (state, action)=>{
            state.message = action.payload.data.message;
            state.isLoading = false;
        })
        .addCase(getDetailsOfSolutionThunk.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDetailsOfSolutionThunk.fulfilled, (state,action)=>{
            state.singleSolutionInfo = action.payload.data.data;
            state.isLoading = false;
        })
        .addCase(getDetailsOfSolutionThunk.rejected, (state, action)=>{
            state.message = action.payload.data.message;
            state.isLoading = false;
        })
    }
})

export default solutionReducer.reducer;
export const selectSulutionList = (state)=> state.solutionReducer.solutionList;
export const selectSolutionCode = (state)=> state.solutionReducer.solutionCode;
export const selectSingleSolutionInfo = (state) => state.solutionReducer.singleSolutionInfo;
export const {setSolutionCode, setSingleSolutionInfo, clearSolutionList} = solutionReducer.actions;


export const uploadSolutionThunk = createAsyncThunk('solution/uploadSolution',async(solution, {dispatch, rejectWithValue})=>{
    try{
        const response = await privateApi.post('/solution/upload-solution', solution);
        return response;
    }
    catch(error){
        return rejectWithValue(error.response);
    }
})

export const getSolutionsThunk = createAsyncThunk('solution/getSolution',async(info, {rejectWithValue})=>{
    try{
        console.log("started")
        const response = await privateApi.get(`/solution/get-solutions?questionId=${info.questionId}&skip=${info.skip}&count=10`);
        console.log("enend")
        return response;
    }
    catch(error){
        return rejectWithValue(error.response);
    }
})

export const addViewsToSolutionThunk = createAsyncThunk('/solution/addViewsToSolution',async(solutionId,{rejectWithValue})=>{
    try{
        console.log("views added ", solutionId)
        const response = await privateApi.put('/solution/add-views-to-solution/?solutionId='+solutionId);
        return response;
    }
    catch(error){
        return rejectWithValue(error.response);
    }
})

export const addLikesToSolutionThunk = createAsyncThunk('/solution/addLikesToSolution',async(solutionId,{rejectWithValue})=>{
    try{
        const response = await privateApi.put('/solution/alter-likes-to-solution/?solutionId='+solutionId);
        return response;
    }
    catch(error){
        return rejectWithValue(error.response);
    }
})

export const getDetailsOfSolutionThunk = createAsyncThunk("/solution/getDetailsOfSolution",async(solutionId, {rejectWithValue})=>{
    try{
        const response = await privateApi.get('/solution/get-details-of-solution/?solutionId='+solutionId);
        
        return response;
    }
    catch(error){
        return rejectWithValue(error.response);
    }
})