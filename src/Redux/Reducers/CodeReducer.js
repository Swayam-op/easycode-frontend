import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateApi } from "../../axios";

const initialState = {
    runCode : null,
    submitCode : null,
    isLoading : false,
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
            return updateWithDefaultValue({isLoading : true});
        })
        .addCase(runCodeThunk.fulfilled, (state, action)=>{
            return updateWithDefaultValue({runCode:action.payload.data, success : { message: action.payload.data.message, statuscode: action.payload.status }})
        })
        .addCase(runCodeThunk.rejected,(state, action)=>{
            let error = "";
            if(!action.payload)
                error = "Server Error";
            else
                error = { message: action.payload.data.message, statuscode: action.payload.status }
            
            return updateWithDefaultValue({error})
        })
        .addCase(submitCodeThunk.pending, (state)=>{
            return updateWithDefaultValue({isLoading : true});
        })
        .addCase(submitCodeThunk.fulfilled, (state, action)=>{
            return updateWithDefaultValue({submitCode:action.payload.data, success : { message: action.payload.data.message, statuscode: action.payload.status }})
        })
        .addCase(submitCodeThunk.rejected,(state, action)=>{
            let error = "";
            if(!action.payload)
                error = "Server Error";
            else
                error = { message: action.payload.data.message, statuscode: action.payload.status }
            
            return updateWithDefaultValue({error})
        })
    }
});

export default codeReducer.reducer;

export const runCodeThunk = createAsyncThunk('code/runCodeThunk',async(data,{rejectWithValue})=>{
    try{
        const response = await privateApi.post('code/run-code', data);
        console.log('Reponse in runcode thunk : ', response);
        return response;
    }
    catch(error){
        if(!error.response){
            throw error;
        }
        return rejectWithValue(error.response);
    }
});

export const submitCodeThunk = createAsyncThunk('code/submitCodeThunk',async(data,{rejectWithValue})=>{
    try{
        const response = await privateApi.post('code/submit-code',data);
        console.log('Response in submitcode thunk : ', response);
        return response;
    }
    catch(error){
        if(!error.response){
            throw error;
        }
        return rejectWithValue(error.response);
    }
})

export const updateWithDefaultValue = (newValue)=>{
    const defaultValue = {
        runCode : null,
        submitCode : null,
        isLoading : false,
        error : null,
        success  :null
    }
    return {...defaultValue, ...newValue};
}