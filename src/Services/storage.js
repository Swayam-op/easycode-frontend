import { publicApi } from "../axios";

export function getAccessToken(){
    return localStorage.getItem('accesstoken');
}
export function getRefreshToken(){
    return localStorage.getItem('refreshtoken');
}

export function setAccessToken(token){
    localStorage.setItem('accesstoken',token);
}
export function setRefreshToken(token){
    localStorage.setItem('refreshtoken',token);
}

export function clearTokens(){
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('refreshtoken');
}

export async function getAccessTokenUsingRefreshToken(){
    const refreshtoken = getRefreshToken();
    try{
        const reponse = await publicApi.post('/login-by-refreshtoken',{refreshtoken});
        const new_accesstoken = reponse.data.accesstoken;
        const new_refreshtoken = reponse.data.new_refreshtoken;
        setAccessToken(new_accesstoken);
        setRefreshToken(new_refreshtoken);
        return new_accesstoken;
    }
    catch(error){
        return error;
    }
}