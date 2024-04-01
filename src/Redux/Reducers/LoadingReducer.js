import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false
}

const LoadingReducer = createSlice({
    name : 'loading',
    initialState,
    reducers : {
        setGlobalLoading : (state, action)=>{
            state.isLoading = action.payload;
        },

        
    }
});


export default LoadingReducer.reducer;
export const {setGlobalLoading} = LoadingReducer.actions;
export const selectLoadingState = (state) => state.loadingReducer.isLoading;


