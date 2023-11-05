import React, { useCallback, useRef, useState } from 'react'
import {FaCodeMerge} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../Redux/Reducers/UserReducer';

const Signin = () => {
  const dispatch = useDispatch();
  let timer = useRef(null);
  const [signinDetails, setSigninDetails] = useState({
    userCred : "",
    password : ""
  });

  function handlesigninDetails (event){
    setSigninDetails(()=>{return {...signinDetails, [event.target.name] : event.target.value }});
  }
  
  const handleSignin = useCallback(()=>{
    if(timer.current){
      clearInterval(timer.current);
    }
    timer.current = setTimeout(()=>{
      dispatch(loginThunk(signinDetails));
    },2000);
  },[dispatch, signinDetails])

  return (
    <div className='relative w-full min-h-screen h-auto py-6 bg-gradient-to-br from-black to-dark-2 flex justify-center items-center'>
    <div className='lg:w-98 md:w-96 px-8 py-10 w-full  rounded-sm bg-light-1 shadow-shadow-1 '>
    <div className='grid place-content-center mb-7'>
    <center className='mb-5'><FaCodeMerge className="text-3xl text-dark-2 " /></center>
    <h1 className='text-2xl -tracking-tight font-bold'><span className=' text-dark-1'>EASY</span><span className='uppercase text-2xl text-black'>Code</span></h1>
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <input onChange={(e)=>handlesigninDetails(e)} type="text" name="userCred" id="usernameOrEmail" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-light-2 appearance-none  focus:outline-none focus:ring-0 focus:border-dark-2 peer" placeholder=" " required />
      <label for="usernameOrEmail" className="peer-focus:font-medium absolute text-sm text-dark-1  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-dark-2 peer-focus:dark:text-dark-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Username or Email</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input onChange={(e)=>handlesigninDetails(e)} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-light-2 appearance-none  focus:outline-none focus:ring-0 focus:border-dark-2 peer" placeholder=" " required />
      <label for="password" className="peer-focus:font-medium absolute text-sm text-dark-1  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-dark-2 peer-focus:dark:text-dark-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Password</label>
  </div>

  
  
  <button onClick={handleSignin} type="submit" className="text-white mb-7 bg-dark-2 hover:bg-black focus:ring-4 focus:outline-none focus:ring-light-2 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center">Sign In</button>
  <div className='flex justify-between text-dark-1 -tracking-tight text-sm mb-8'> <button className='block hover:text-black'>Forgot Password?</button> <Link to="/signup" className="block font-medium text-dark-2">Sign Up</Link></div>
  <div className='text-dark-1 text-center font-normal -tracking-tight text-sm'>This site is protected by reCAPTCHA and the Google <u>Privacy Policy</u> and <u>Terms of Service apply</u>.</div>
    
    </div>
    </div>
  )
}

export default Signin