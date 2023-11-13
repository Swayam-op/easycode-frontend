import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicApi } from "../../axios";
import { clearTokens, setAccessToken, setRefreshToken } from "../../Services/storage";

const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,     // {message  :" ", statuscode : 400}
    success : null,  // {message : " ", statuscode : 200}
    isLoading: false,
}

const UserReducer = createSlice({
    name : 'user',
    initialState,
    reducers:{
        setLogin : (state, action)=>{
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        setLogout : (state, action)=>{
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.success = null;
        },
        setUser : (state,action)=>{
            state.user = action.payload;
        },
        setUserSuccess : (state, action)=>{
            state.success = action.payload;
        },
        clearUserSuccess : (state)=>{
            state.success = null;
        },
        setUserError : (state, action)=>{
            state.error = action.payload;
        },
        clearUserError : (state)=>{
            state.error = null;
        },
        setIsAuthenticated : (state, action)=>{
            state.isAuthenticated = action.payload;
        }
    },
    extraReducers : (builder)=>{
        builder
        //singup extra reducer
        .addCase(signupUserThunk.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.success = {message: action.payload.data.message, statuscode: action.payload.status};
            console.log("singup fulfilled state : ", state, action);
        })
        .addCase(signupUserThunk.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(signupUserThunk.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = {message : action.payload.data.message, statuscode : action.payload.status};
            console.log("singup rejected state : ",state, action.payload);
        })
        //login extra reducer
        .addCase(loginThunk.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(loginThunk.fulfilled,(state,action)=>{
            console.log("loginthunk fulfilled : ", action.payload);
            state.success = {message : action.payload.data.message, statuscode: action.payload.status};
            state.isAuthenticated = true;
            state.isLoading = false;
        })
        .addCase(loginThunk.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = {message : action.payload.data.message, statuscode : action.payload.status};
        })
    }
});

export default UserReducer.reducer;
export const {setLogin, setLogout, setUserError, setUserSuccess, clearUserError, clearUserSuccess} = UserReducer.actions;
export const getIsAuthenticated = (state)=> state.userReducer.isAuthenticated;

export const signupUserThunk = createAsyncThunk('user/signupUserThunk',async(signupDetails, { dispatch, rejectWithValue })=>{
    try{
        const response =  await publicApi.post('/signup',signupDetails);
        return response;
    }
    catch(error){
        console.log("error in thunk ", error.response);
        if(!error.response){
            throw error;
        }
        return rejectWithValue(error.response);
    }
    
});

export const loginThunk = createAsyncThunk('user/loginThunk', async(loginDetails,{dispatch, rejectWithValue})=>{
    try{
        const response = await publicApi.post('/login',loginDetails);

        //storing tokens in local storage
        setAccessToken(response.data.accesstoken); //
        setRefreshToken(response.data.refreshtoken);

        return response;
    }
    catch(error){
        console.log("error in thunk ", error.response);
        if(!error.response){
            throw error;
        }
        return rejectWithValue(error.response);
    }
});

export const logoutThunk = createAsyncThunk('user/logoutThunk',async(data, {dispatch})=>{
    console.log("logout");
    clearTokens();
    dispatch(setLogout());
})