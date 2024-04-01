import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {useNavigate } from "react-router";
import { Outlet } from "react-router";
import { SelectIsAuthenticated } from "../Redux/Reducers/AuthReducer";

export default function NotAuthenticated(){
    const navigate = useNavigate();
    const isAuthenticated = useSelector(SelectIsAuthenticated);
    //console.log("not authenticated.", isAuthenticated);
    useEffect(()=>{
        if(isAuthenticated === true){
            navigate('/');
            //console.log("authenticated in not-authetnicated")
            return;
        }
        //console.log("this is called")
    },[isAuthenticated, navigate])
    return <Outlet/>
}