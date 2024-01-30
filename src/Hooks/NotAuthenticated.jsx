import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { getIsAuthenticated } from "../Redux/Reducers/UserReducer";

export default function NotAuthenticated(){
    const navigate = useNavigate();
    const isAuthenticated = useSelector(getIsAuthenticated);
    console.log("not authenticated.", isAuthenticated);
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/');
            console.log("Error")
        }
        
    },[isAuthenticated, navigate])
    return(
        <>
        {isAuthenticated === false ?  <Outlet/> : navigate('/') }
        </>
    )
    
}