import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicApi, privateApi } from "../../axios";
import { clearTokens, setAccessToken, setRefreshToken } from "../../Services/storage";
import { successToast, errorToast } from "../../Services/ToastHandler";
import { STATUS } from "../../Services/StatusCode";


const initialState = {
    isAuthenticated: null,
    user: null,
    error: null,     
    success: null,  
    isLoading: false,
    signUpsuccess : false
}

const UserReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        setLogout: (state, action) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.success = null;
            console.log("isAuntheticated set logout: ", state.isAuthenticated);
            
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserSuccess: (state, action) => {
            state.success = action.payload;
        },
        clearUserSuccess: (state) => {
            state.success = null;
        },
        setUserError: (state, action) => {
            state.error = action.payload;
        },
        clearUserError: (state) => {
            state.error = null;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setLoadingTrue : (state)=>{
            state.isLoading = true;
        }
    },
    extraReducers: (builder) => {
        builder
            //singup extra reducer
            .addCase(signupUserThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.data.message;
                state.signUpsuccess = true;
                successToast("You're signedup.")
                console.log("singup fulfilled state : ", state, action);
            })
            .addCase(signupUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signupUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error =  action.payload.data.message;
                console.log("singup rejected state : ", state, action.payload);
            })
            //login extra reducer
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                console.log("inside extra reducer : ",state.isLoading);
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                console.log("loginthunk fulfilled : ", action.payload);
                state.success =  action.payload.data.message;
                state.isAuthenticated = true;
                state.isLoading = false;
                successToast(state.success);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false;
                if(!action.payload)
                    state.error = "Server Crashed";
                else
                    state.error =  action.payload.data.message;
                errorToast(state.error);
            })
            .addCase(getUserProfile.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action)=>{
                console.log(action);
                state.user = action.payload.data.data;
                state.isLoading = false;
            })
            .addCase(getUserProfile.rejected,(state, action)=>{
                if(action.payload.status === STATUS.NOTFOUND){
                    state.isAuthenticated = false;
                }
                state.isLoading = false;
                state.error =  action.payload.data.message;
            })
            .addCase(isUserAuthenticatedThunk.pending,(state)=>{
                state.isLoading = true;
                console.log("pending in ex reducer")
            })
            .addCase(isUserAuthenticatedThunk.fulfilled,(state)=>{
                state.isAuthenticated = true;
                state.isLoading = false;
                console.log("fulfilled in ex reducer")

            })
            .addCase(isUserAuthenticatedThunk.rejected,(state)=>{
                state.isLoading = false;
                state.isAuthenticated = false;
                console.log("erro in extraauthuser")
            })
    }
});

export default UserReducer.reducer;
export const { setLogin, setLogout, setUserError, setUserSuccess, clearUserError, clearUserSuccess, setLoadingTrue } = UserReducer.actions;
export const getIsAuthenticated = (state) => state.userReducer.isAuthenticated;
export const getIsLoadingStateOfUser = (state) => state.userReducer.isLoading;
export const getSuccessOfUser = (state) => state.userReducer.success;
export const getErrorOfUser = (state) => state.userReducer.error;
export const selectSignUpSucess = (state) => state.userReducer.signUpsuccess;
export const selectUserInfo = (state)=>state.userReducer.user;

export const signupUserThunk = createAsyncThunk('user/signupUserThunk', async (signupDetails, { dispatch, rejectWithValue }) => {
    try {
        const response = await publicApi.post('/signup', signupDetails);
        return response;
    }
    catch (error) {
        console.log("error in thunk ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response);
    }

});

export const loginThunk = createAsyncThunk('user/loginThunk', async (loginDetails, { dispatch, rejectWithValue }) => {
    try {
        const response = await publicApi.post('/login', loginDetails);

        //storing tokens in local storage
        setAccessToken(response.data.accesstoken); //
        setRefreshToken(response.data.refreshtoken);

        return response;
    }
    catch (error) {
        console.log("error in thunk ", error.response);
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response);
    }
});

export const logoutThunk = createAsyncThunk('user/logoutThunk', async(_, { dispatch }) => {
    console.log("logout");
    clearTokens();
    dispatch(setLogout({}));
    return {};
})

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (_,{rejectWithValue}) => {
    console.log("get user progile thunk");
    try{
        const response = await privateApi.get('/user/get-user-details');
        console.log("response in thunk",response );
        return response;
    }
    catch(error){
        console.log("get user profile thunk failed", error);
        return rejectWithValue(error.response);
    }   
})

export const isUserAuthenticatedThunk = createAsyncThunk('user/isUserAuthenticated',async(_,{rejectWithValue})=>{
    try{
        const response = await privateApi.get('/user/is-authenticated');
        console.log("reponse in isAuthenticted", response);
        return response;
    }
    catch(error){
        console.log("error on isatuhetinciad", error)
        return rejectWithValue(error.response);
    }
})