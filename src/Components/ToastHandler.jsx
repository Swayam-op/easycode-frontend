import React, { useCallback, useEffect, useMemo } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { clearUserSuccess, getSuccessOfUser } from '../Redux/Reducers/UserReducer';
import { toast } from 'react-toastify';

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