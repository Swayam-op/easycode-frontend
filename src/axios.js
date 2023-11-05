import axios from "axios";


const publicApi = axios.create({
    baseURL : 'http://localhost:5000/v1/public_api'
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

export {publicApi};