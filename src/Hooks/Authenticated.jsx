import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
import { SelectIsAuthenticated } from "../Redux/Reducers/AuthReducer";


export default function Authenticated() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(SelectIsAuthenticated);

  useEffect(() => {
   
    // If isAuthenticated is false, navigate to the signin page
    if (isAuthenticated === false) {
      navigate("/signin");
    }
    else if(isAuthenticated !== true){ //When it's values is null
      return;
    }
  
    //console.log("inside Authenticated auth", isAuthenticated);
  }, [navigate, isAuthenticated]);

 
  // If isAuthenticated is true, render the child components
  return <Outlet/>
}
