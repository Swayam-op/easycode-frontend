
import {  errorToast } from "./ToastHandler";
import { clearTokens } from "./storage";

export function notAuthenticated(){
    clearTokens();
    errorToast("Session is expired");
    // window.location.href = '/sigin';
} 