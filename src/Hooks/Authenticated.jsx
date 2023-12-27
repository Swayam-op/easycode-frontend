import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { getIsAuthenticated } from "../Redux/Reducers/UserReducer";

export default function Authenticated(){
    const navigate = useNavigate();
    const isAuthenticated = useSelector(getIsAuthenticated);

    {isAuthenticated === true ?  <Outlet/> : navigate(-1) }
    return (
        <>
        </>
    )
}