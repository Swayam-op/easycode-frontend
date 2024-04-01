
import {  errorToast } from "./ToastHandler";
import { clearTokens } from "./storage";

export function notAuthenticated(){
    clearTokens();
    errorToast("Not Authenticated");
    // window.location.href = '/sigin';
} 

