import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicApi, privateApi } from "../../axios";
import { clearTokens, setAccessToken, setRefreshToken } from "../../Services/storage";


const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,     // {message  :" ", statuscode : 400}
    success: null,  // {message : " ", statuscode : 200}
    isLoading: false,
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
                state.success = { message: action.payload.data.message, statuscode: action.payload.status };
                console.log("singup fulfilled state : ", state, action);
            })
            .addCase(signupUserThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signupUserThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = { message: action.payload.data.message, statuscode: action.payload.status };
                console.log("singup rejected state : ", state, action.payload);
            })
            //login extra reducer
            .addCase(loginThunk.pending, (state) => {
                state.isLoading = true;
                console.log("inside extra reducer : ",state.isLoading);
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                console.log("loginthunk fulfilled : ", action.payload);
                state.success = { message: action.payload.data.message, statuscode: action.payload.status };
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = { message: action.payload.data.message, statuscode: action.payload.status };
            })
            .addCase(getUserProfile.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action)=>{
                console.log(action);
                state.user = action.payload.data;
                state.isLoading = false;
            })
            .addCase(getUserProfile.rejected,(state, action)=>{
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = { message: action.payload.data.message, statuscode: action.payload.status };
            })
    }
});

export default UserReducer.reducer;
export const { setLogin, setLogout, setUserError, setUserSuccess, clearUserError, clearUserSuccess, setLoadingTrue } = UserReducer.actions;
export const getIsAuthenticated = (state) => state.userReducer.isAuthenticated;
export const getIsLoadingStateOdUser = (state) => state.userReducer.isLoading;
export const getSuccessOfUser = (state) => state.userReducer.success;
export const getErrorOfUser = (state) => state.userReducer.error;

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

export const logoutThunk = createAsyncThunk('user/logoutThunk', async({}, { dispatch }) => {
    console.log("logout");
    clearTokens();
    dispatch(setLogout());
})

export const getUserProfile = createAsyncThunk('user/getUserProfile', async ({},{rejectWithValue}) => {
    console.log("get user progile thunk");
    try{
        const response = await privateApi.get('/user/get-user-details');
        console.log("response in thunk",response );
        return response;
    }
    catch(error){
        console.log("get user profile thunk failed", error);
        rejectWithValue(error.response);
    }   
})