import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateApi } from "../../axios";

const initialState = {
    runCodeResult : null,
    submitCodeResult : null,
    isLoading : false,
    runCodeLoading: false,
    submitCodeLoading : false,
    error : null,
    success  :null
}

const codeReducer = createSlice({
    name : 'code',
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{
        builder
        .addCase(runCodeThunk.pending, (state)=>{
            //console.log("runcodethunk pending");
            state.isLoading = true;
            state.runCodeLoading = true;
        })
        .addCase(runCodeThunk.fulfilled, (state, action)=>{
            state.runCodeResult = action.payload.data;
            state.success = action.payload.data.message;
            state.isLoading = false;
            state.runCodeLoading = false;
            //console.log("runcodethunk fulfilled");
        })
        .addCase(runCodeThunk.rejected,(state, action)=>{
            let error = "";
            if(!action.payload)
                error = "Server Error";
            else
                error =  action.payload.data.message;
            
            state.error = error;
            state.isLoading = false;
            state.runCodeLoading = false;
        })
        .addCase(submitCodeThunk.pending, (state)=>{
            state.isLoading = true;
            state.submitCodeLoading = true;
        })
        .addCase(submitCodeThunk.fulfilled, (state, action)=>{
            state.submitCodeResult = action.payload.data;
            state.success = action.payload.data.message;
            state.isLoading = false;
            state.submitCodeLoading = false;
        })
        .addCase(submitCodeThunk.rejected,(state, action)=>{
            let error = "";
            if(!action.payload)
                error = "Server Error";
            else
                error =  action.payload.data.message;
            
            state.isLoading = false;
            state.submitCodeLoading = false;
            state.error = error;
        })
    }
});

export const selectRunCodeResult = (state)=>state.codeReducer.runCodeResult;
export const selectSubmitCodeResult = (state)=>state.codeReducer.submitCodeResult;
export const selectIsLoadingOfCode = (state)=>state.codeReducer.isLoading;
export const selectSubmitCodeLoading = (state)=>state.codeReducer.submitCodeLoading;
export const selectRunCodeLoading = (state)=>state.codeReducer.runCodeLoading;
export default codeReducer.reducer;

export const runCodeThunk = createAsyncThunk('/code/runCodeThunk',async(data,{rejectWithValue})=>{
    try{
        const response = await privateApi.post('/code/run-code', data);
        //console.log('Reponse in runcode thunk : ', response);
        return response;
    }
    catch(error){
        if(!error.response){
            throw error;
        }
        //console.log("error in run code thunk",error.response);
        return rejectWithValue(error.response);
    }
});

export const submitCodeThunk = createAsyncThunk('/code/submitCodeThunk',async(data,{rejectWithValue})=>{
    try{
        const response = await privateApi.post('/code/submit-code',data);
        //console.log('Response in submitcode thunk : ', response);
        return response;
    }
    catch(error){
        if(!error.response){
            throw error;
        }
        return rejectWithValue(error.response);
    }
})

