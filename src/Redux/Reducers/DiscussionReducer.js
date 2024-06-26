import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { privateApi } from "../../axios";

const initialState = {
    discussionRooms : null,
    user_room_previousMessages : {
        userDetails : null, roomDetails : null, previousMessages : []
    },// {userDetails, roomDetails, previousMessages} //  It actually stores response of user, dicussion room, last messages when page is refreshed
    userDetails : null,
    roomDetails : null,
    previousMessages : [],
    messageLimitReached : false,
    isLoading : false
}

const discussionSlice = createSlice({
    name : "discussion",
    initialState,
    reducers : {
        setPreviousMessages : (state, action)=>{
            state.previousMessages = [...state.previousMessages, action.payload];
        },
        clearDiscussionDetails : (state, action)=>{
            state.userDetails = null;
            state.roomDetails = null;
            state.previousMessages = [];
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getDiscussionRooms.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getDiscussionRooms.fulfilled,(state, action)=>{
            if(action.payload.data){
                state.discussionRooms = action.payload.data.data;
            }
            state.isLoading = false;
        })
        .addCase(getDiscussionRooms.rejected,(state)=>{
            state.isLoading = false;
        })
        .addCase(get_User_Room_PreviousMessages.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(get_User_Room_PreviousMessages.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.userDetails = action.payload.data.data.userDetails;
            state.previousMessages = action.payload.data.data.previousMessages;
            state.roomDetails = action.payload.data.data.roomDetails;
            state.user_room_previousMessages = action.payload.data.data;
        })
        .addCase(get_User_Room_PreviousMessages.rejected, (state)=>{
            state.isLoading = false;
        })
        .addCase(getMorePreviousMessagesThunk.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(getMorePreviousMessagesThunk.fulfilled, (state, action)=>{
            if(action.payload && action.payload.data && action.payload.data.data){
                if(action.payload.data.data.length === 0){
                    state.messageLimitReached = true;
                }
                else{
                    state.previousMessages = [ ...action.payload.data.data, ...state.previousMessages,];
                }
            }
            state.isLoading = false;
        })
        .addCase(getMorePreviousMessagesThunk.rejected, (state)=>{
            state.isLoading = false;
        })
    }
})

export const selectDiscussionRooms = (state)=>state.discussionReducer.discussionRooms;
export const selectUserChatDetails = (state)=>state.discussionReducer.userDetails;
export const selectRoomDetails = (state)=>state.discussionReducer.roomDetails;
export const selectPreviousMessages = (state)=>state.discussionReducer.previousMessages;
export const selectUser_Room_PreviousMessages = (state)=>state.discussionReducer.user_room_previousMessages;
export const {setPreviousMessages, clearDiscussionDetails} = discussionSlice.actions;
export default discussionSlice.reducer;

export const getDiscussionRooms = createAsyncThunk('/discussion/getDiscussionRoom', async(_, {rejectWithValue})=>{
    try{
        const response = await privateApi.get('/discussion/get-discussion-rooms');
        //console.log("response in discussion-room thunk : ", response);
        return response;
    }
    catch(error){
        return rejectWithValue(error)
    }
})

//To prevent multiple axios call, use fetch all details in a single thunk and api
export const get_User_Room_PreviousMessages = createAsyncThunk('/discussion/get_User_Room_PreviousMessages', async({roomId}, {rejectWithValue})=>{
    try{
        //console.log("roomId in thunk", roomId);
        const response = await privateApi.get('/discussion/get-user-room-messages/' + roomId)
        //console.log("response in discussion_user_previousMessages thunk : ", response.data);
        return response;
    }
    catch(error){
        return rejectWithValue(error)
    }
})


export const getMorePreviousMessagesThunk = createAsyncThunk('/dicussion/getMorePreviousMessages', async(roomId, {rejectWithValue, getState})=>{
    try{
        // console.log("thunk is called");
        const currentState = getState().discussionReducer;
        // console.log("currentState is :",currentState)
        if(currentState.messageLimitReached){
            return [];
        }
        const messageId = currentState.previousMessages.length > 0 ? currentState.previousMessages[0]._id : '';
        const response = await privateApi.get('/discussion/get-previous-messages/' + roomId + '/' + messageId)
        // console.log("response in more chats : ", response.data);
        return response;
    }
    catch(error){
        // console.log(error)
        return rejectWithValue(error)
    }
})