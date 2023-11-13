import axios from "axios";
import { getAccessToken } from "./Services/storage";


const publicApi = axios.create({
    baseURL : 'http://localhost:5000/v1/public_api'
})

const privateApi = axios.create({
    baseURL : 'http://localhost:5000/v1/private_api'
})

publicApi.interceptors.request.use((config)=>{
    config.headers = {
        ...config.headers,
        "Content-Type" : "application/json",
    }
    console.log("public_api intereceptor request config", config);
    return config;
},(error)=>{
    return Promise.reject("Error in axios");
})

publicApi.interceptors.response.use((response)=>{
    console.log("public_api Intercepto response : ",response);
    return response;
},(error)=>{
    console.log("error in publicapi response interceptor", error);
    return Promise.reject(error);
})

privateApi.interceptors.request.use((config)=>{
    const accesstoken = getAccessToken();
    config.headers = {
        ...config.headers,
        "Content-Type" : "application/json",
        "Authorization" : accesstoken
    }
    console.log("private_api intereceptor request config", config);
    return config;
},
(error)=>{
    return Promise.reject("Error in axios");
})

privateApi.interceptors.response.use((response)=>{

},
(error)=>{
    console.log("error in privateapi response interceptor", error);
    return Promise.reject(error);
})

export {publicApi, privateApi};