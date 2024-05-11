import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicApi, privateApi } from "../../axios";
import { clearTokens, setAccessToken, setRefreshToken } from "../../Services/storage";
import { successToast, errorToast } from "../../Services/ToastHandler";
import { STATUS } from "../../Services/StatusCode";
// import store from "../store";
import { setGlobalLoading } from "./LoadingReducer";

const initialState = {
    isAuthenticated : null,
    data : null,
    message  : null,
    statusCode : STATUS.OK,
    isLoading : false,
    signupSuccess: false,
}


const AuthReducer = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setAthentication : (state, action) =>{
            //console.log("authenitcation : in action ", action.payload)
            state.isAuthenticated = action.payload;
        },
        setSignupSuccess : (state, action)=>{
            state.signupSuccess = action.payload;
        }
    },
    extraReducers : (builder) =>{
        builder
        //singup extra reducer
        .addCase(signupThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.data.message;
            state.statusCode = action.payload.status;
            state.signupSuccess  = true;
            successToast("Sign-up is successfull");

        })
        .addCase(signupThunk.pending, (state) => {
            state.isLoading = true;

        })
        .addCase(signupThunk.rejected, (state, action) => {
            state.isLoading = false;
            state.message =  action.payload.data.message;
            state.statusCode = action.payload.status;
            errorToast(action.payload.data.message);
            //console.log("singup rejected state : ", state, action.payload);
        })
        //login extra reducer
        .addCase(loginThunk.pending, (state) => {
            state.isLoading = true;

            //console.log("inside extra reducer : ",state.isLoading);
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            //console.log("loginthunk fulfilled : ", action.payload);
            state.message =  action.payload.data.message;
            state.statusCode = action.payload.status;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.data = action.payload.data.data;
            //console.log(state.data, "inside thunk fullfiled");
            successToast(state.message);
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.isLoading = false;

            if(!action.payload){
                state.message = "Something went wrong";
                state.statusCode = STATUS.SERVERERROR;
            }   
            else
            {
                state.message =  action.payload.data.message;
                state.statusCode = action.payload.status;
            }
            
            errorToast(state.message);
        })
        
        .addCase(isUserAuthenticatedThunk.pending, (state, action)=>{
            state.isLoading = true;

        })
        .addCase(isUserAuthenticatedThunk.fulfilled, (state, action)=>{

            state.isAuthenticated = true;
            state.isLoading = false;
            state.message = action.payload.data.message;
            state.data = action.payload.data.data;
            state.statusCode = action.payload.status;
        })
        .addCase(isUserAuthenticatedThunk.rejected, (state, action)=>{
            if(!action.payload){
                state.message = "Something went wrong";
                state.statusCode = STATUS.SERVERERROR;
                
            }   
            else
            {
                state.message =  action.payload.data.message;
                state.statusCode = action.payload.status;
            }
            state.isLoading = false;
            state.isAuthenticated = false;
        })
        .addCase(logoutThunk.pending,(state)=>{

        })
        .addCase(logoutThunk.fulfilled,(state,action)=>{
            //console.log("hello")
            state.isAuthenticated = false;
            state.data = null;
        })
        .addCase(logoutThunk.rejected,(state, action)=>{
            state.isAuthenticated = false;
            state.data = null;
        })
    }
})


export const { setAthentication, setSignupSuccess} = AuthReducer.actions;
export const SelectIsAuthenticated = (state) => state.authReducer.isAuthenticated;
export const selectShortUserDetails = (state)=>state.authReducer.data;
export const selectSignupSuccess = (state)=>state.authReducer.signupSuccess;
export default AuthReducer.reducer;

export const signupThunk = createAsyncThunk('auth/signupThunk', async (signupDetails, {dispatch, rejectWithValue }) => {
    try {
        dispatch(setGlobalLoading(true));
        const response = await publicApi.post('/signup', signupDetails);
        dispatch(setGlobalLoading(false));
        return response;
    }
    catch (error) {
        //console.log("error in thunk ", error.response);
        dispatch(setGlobalLoading(false));
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response);
    }

});

export const loginThunk = createAsyncThunk('auth/loginThunk', async (loginDetails, { dispatch, rejectWithValue }) => {
    try {
        dispatch(setGlobalLoading(true));
        const response = await publicApi.post('/login', loginDetails);
       
        //storing tokens in local storage
        setAccessToken(response.data.accesstoken); //
        setRefreshToken(response.data.refreshtoken);
        dispatch(setGlobalLoading(false));
        return response;
    }
    catch (error) {
        //console.log("error in thunk ", error.response);
        dispatch(setGlobalLoading(false));
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response);
    }
});


export const logoutThunk = createAsyncThunk('auth/logoutThunk', async(_, { rejectWithValue }) => {
    try{
        const response = await privateApi.put('auth/logout');
        clearTokens();
        //console.log("Response in logout thunk, ");
        return response;
    }
    catch(error){
        return rejectWithValue(error.response);
    }
});


export const isUserAuthenticatedThunk = createAsyncThunk('auth/isUserAuthenticated',async(_,{dispatch, rejectWithValue})=>{
    try{
        dispatch(setGlobalLoading(true));
        const response = await privateApi.get('/user/is-authenticated');
        //console.log("reponse in isAuthenticted THUNK", response);
        dispatch(setGlobalLoading(false));
        return response;
    }
    catch(error){
        //console.log("error on isatuhetinciad", error)
        dispatch(setGlobalLoading(false));
        return rejectWithValue(error.response);
    }
})