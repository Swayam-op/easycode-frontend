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