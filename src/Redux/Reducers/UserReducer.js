import { createAsyncThunk,  createSlice } from "@reduxjs/toolkit";
import {  privateApi } from "../../axios";

import { STATUS } from "../../Services/StatusCode";
import { errorToast, pendingToast, successToast } from "../../Services/ToastHandler";
import { setGlobalLoading } from "./LoadingReducer";



const initialState = {
    isAuthenticated: null,
    user: null,
    userShortDetails : null, // NO longer used
    uploadedProfilePicture : null, // it is used for image that is uploaded in profile page
    message: null,     
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
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        clearUserDetails : (state)=>{
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action)=>{
                //console.log(action);
                state.user = action.payload.data.data;
                state.isLoading = false;
            })
            .addCase(getUserProfile.rejected,(state, action)=>{
                if(action.payload.status === STATUS.NOTFOUND){
                    state.isAuthenticated = false;
                }
                state.isLoading = false;
                state.message =  action.payload.data.message;
            })
            .addCase(getUserShortDetails.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(getUserShortDetails.fulfilled,(state, action)=>{
                state.isLoading = false;
                state.userShortDetails = action.payload.data.data;
            })
            .addCase(getUserShortDetails.rejected,(state, action)=>{
                state.isLoading = false;
                state.message =  action.payload.data.message;
            })
            .addCase(updateUserDetails.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(updateUserDetails.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.message = action.payload.data.message;
                successToast(state.message);
            })
            .addCase(updateUserDetails.rejected,(state, action)=>{
                state.isLoading = false;
                state.message = action.payload.data.message;
            })
            .addCase(uplaodProfilePictureThunk.pending, (state)=>{
                pendingToast("Image is uploading. 😟")
            })
            .addCase(uplaodProfilePictureThunk.fulfilled,(state, action)=>{
                state.uploadedProfilePicture = action.payload.data.data;
                successToast(action.payload.data.message);
            })
            .addCase(uplaodProfilePictureThunk.rejected,(state, action)=>{
                errorToast(action.payload.data.message);
            })
            
    }
});

export default UserReducer.reducer;
export const { setLogin, setLogout, setUserError, setUserSuccess, clearUserError, clearUserSuccess, clearUserDetails } = UserReducer.actions;
// export const getIsAuthenticated = (state) => state.userReducer.isAuthenticated;
export const getIsLoadingStateOfUser = (state) => state.userReducer.isLoading;
export const getErrorOfUser = (state) => state.userReducer.error;
// export const selectSignUpSucess = (state) => state.userReducer.signUpsuccess;
export const selectUserInfo = (state)=>state.userReducer.user;
export const selectUplaodedProfilePicture = (state)=>state.userReducer.uploadedProfilePicture;


export const getUserProfile = createAsyncThunk('user/getUserProfile', async (_,{dispatch,rejectWithValue}) => {
    //console.log("get user progile thunk");
    try{
        dispatch(setGlobalLoading(true));
        const response = await privateApi.get('/user/get-user-details');
        //console.log("response in thunk",response );
        dispatch(setGlobalLoading(false));
        return response;
    }
    catch(error){
        //console.log("get user profile thunk failed", error);
        dispatch(setGlobalLoading(false));
        return rejectWithValue(error.response);
    }   
})


//this is not used anymore, it's subtitute is uesd in DiscussionReducer
export const getUserShortDetails = createAsyncThunk('user/getUserShortDetailsThunk',async(_, {rejectWithValue})=>{
    //console.log("get user short details thunk");
    try{
        const response = await privateApi.get('/user/get-user-short-details');
        //console.log("reponse in getusershortDetails thunk", response);
        return response;
    }
    catch(error){
        //console.log("get userShort details thunk failed", error);
        return rejectWithValue(error.response);
    }
})

export const updateUserDetails = createAsyncThunk('user/updateUserDetails', async(data, {rejectWithValue})=>{
    try{
        const reponse = await privateApi.post('/user/update-user-details', data);
        return reponse;
    }
    catch(error){
        //console.log("error in update user thunk : ",error);
        return rejectWithValue(error.response);
    }
})

export const uplaodProfilePictureThunk = createAsyncThunk('user/uploadPorfilePicture',async(file, {rejectWithValue})=>{
    try{
        //console.log("file uploading")
        const response = await privateApi.post('/user/upload-profile-picture', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    }
    catch(error){
        //console.log("error in uploadPorfilePicture user thunk : ",error);
        return rejectWithValue(error.response);
    }
})