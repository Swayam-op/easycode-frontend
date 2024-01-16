import { useNavigate } from "react-router";
import { successToast, errorToast } from "../Components/ToastHandler";
import { clearTokens } from "./storage";

export function notAuthenticated(){
    clearTokens();
    errorToast("Session is expired");
    // window.location.href = '/sigin';
} 