import React, { useCallback, useEffect, useMemo } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { clearUserSuccess, getSuccessOfUser } from '../Redux/Reducers/UserReducer';
import { toast } from 'react-toastify';

export function successToast(message){
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
}

export function errorToast(message){
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
}

const ToastHandler = () => {
    const dispatch = useDispatch();
  const success_of_user_reducer = useSelector(getSuccessOfUser);

  const success = useMemo(()=>{
    return success_of_user_reducer || {};
  },[success_of_user_reducer]);
  
  const clearSuccessStates = useCallback(()=>{
    dispatch(clearUserSuccess());
  },[]);

  useEffect(()=>{
    if(success && success != {}){
        toast.success(success.message);
    }
    clearSuccessStates();
  },[success, clearSuccessStates])
  return (
    <></>
  )
}

export default ToastHandler