import axios from "axios";
import {  getAccessToken, getAccessTokenUsingRefreshToken, getRefreshToken } from "./Services/storage";
import { STATUS } from './Services/StatusCode';
// import { sessionExpired } from "./Services/Auth";
// import store from "./Redux/store";

const publicApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_PUBLIC_URL || 'http://localhost:5000/v1/public_api'
})

const privateApi = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_PRIVATE_URL || 'http://localhost:5000/v1/private_api'
})

publicApi.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
    }
    //console.log("public_api intereceptor request config", config);
    return config;
}, (error) => {
    return Promise.reject("Error in axios");
})

publicApi.interceptors.response.use((response) => {
    //console.log("public_api Intercepto response : ", response);
    return response;
}, (error) => {
    //console.log("error in publicapi response interceptor", error);
    return Promise.reject(error);
})

privateApi.interceptors.request.use((config) => {
    const accesstoken = getAccessToken();
    if (config.headers['Content-Type']) {
        //console.log("config header, ", config.headers["Content-Type"])

        config.headers['Content-Type'] = 'multipart/form-data';
    }
    else{
        config.headers['Content-Type'] = 'application/json';
    }
    config.headers = {
        ...config.headers,
        "Authorization": 'Bearer ' + accesstoken
    }
    //console.log("private_api intereceptor request config", config);
    return config;
},
    (error) => {
        //console.log(error);
        return Promise.reject("Error in axios");
    })

let count = 0;
privateApi.interceptors.response.use((response) => {
    //console.log("response in interecept ", response);
    return response;
},
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = getRefreshToken();
        //console.log("refresh_token-step-1");
        //if the error is due to an "unauthorized" response
        if (error.response.status === STATUS.UNAUTHORIZED && !originalRequest._retry && refreshToken) {
            originalRequest._retry = true;

            try {
                //Attempt to refresh the access token
                //console.log("refresh_token-step-2");
                //console.log(count); count++;
                const newAccessToken = await getAccessTokenUsingRefreshToken();
                originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
                //console.log("refresh toekne", newAccessToken);
                return privateApi(originalRequest);
            }
            catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        // if(error.response.status === STATUS.UNAUTHORIZED){
        //     // sessionExpired();
        // }
        //console.log("error in privateapi response interceptor", error);
        return Promise.reject(error);
    })

export { publicApi, privateApi };