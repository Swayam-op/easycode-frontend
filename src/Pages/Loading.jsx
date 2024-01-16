import { PiAirplaneInFlightFill } from "react-icons/pi";
import { useSelector } from 'react-redux';
import { getIsLoadingStateOfUser } from "../Redux/Reducers/UserReducer";
import { useEffect } from "react";
const Loading = ()=>{
    const loading = useSelector(getIsLoadingStateOfUser);
    useEffect(()=>{
        console.log("loading ", loading);
    },[loading])
    return(
        <>
        <div className={`${loading? "flex" : "hidden" } fixed inset-0 z-50 bg-dark-2 bg-opacity-50 justify-center items-center`}>
            < PiAirplaneInFlightFill className="text-3xl block text-light-2 animate-forward-slow "/>
        </div>
        </>
    )
}

export default Loading;