import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicApi } from "../../axios";


const initialState = {
    isAuthenticated: false,
    user: null,
    error: "",
    isLoading: false,
}

const UserReducer = createSlice({
    name : 'user',
    initialState,
    reducers:{
        setLogin : (state, action)=>{
            state = {
                isAuthenticated : true,
                user: action.payload,
                error: "",
                isLoading: false
            }
        },
        setLogout : (state, action)=>{
            state = {
                isAuthenticated : false,
                user: null,
                error: "",
                isLoading: false
            }
        }
    },
    extraReducers : (builder)=>{
        builder
        .addCase(signupUserThunk.fulfilled,(state, action)=>{
            state.pending = false;
            console.log("singup fulfilled state : ", state, action);
        })
        .addCase(signupUserThunk.pending,(state)=>{
            state.pending = true;
            console.log("singup pending state : ",state);
        })
        .addCase(signupUserThunk.rejected,(state,action)=>{
            state.pending = false;
            console.log("singup rejected state : ",state, action.payload);
        })
    }
});

export default UserReducer.reducer;
export const {setLogin, setLogout} = UserReducer.actions;


export const signupUserThunk = createAsyncThunk('user/signupUserThunk',async(signupDetails, { dispatch, rejectWithValue })=>{
    return await publicApi.post('/signup',signupDetails);
})