import React, { useEffect, useState} from 'react'
import {FaCodeMerge} from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupThunk } from '../Redux/Reducers/AuthReducer';
import { selectSignupSuccess, setSignupSuccess } from '../Redux/Reducers/AuthReducer';

const SIgnup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signupSuccess = useSelector(selectSignupSuccess);
  const [signupDetails, setSignupDetails] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    email: ""
  });

  const handleSignupInputs = (event)=>{
    setSignupDetails(()=>{return {...signupDetails,[event.target.name] : event.target.value}});
  }
  
  const uploadSignupDetails = ()=>{
    //console.log(signupDetails);
    dispatch(signupThunk(signupDetails));
  }

  useEffect(()=>{
    if(signupSuccess){
      navigate('/signin');
      setSignupSuccess(false);
    }
  },[signupSuccess, navigate])
  return (
    <div className='relative w-full py-6 bg-gradient-to-br from-black to-dark-2 flex justify-center items-center'>
    <div className='lg:w-98 md:w-96 px-8 py-10 w-full  rounded-md bg-light-1 shadow-shadow-1 '>
    <div className='grid place-content-center mb-7'>
    <center className='mb-5'><FaCodeMerge className="text-3xl text-dark-2 " /></center>
    <h1 className='text-2xl -tracking-tight font-bold'><span className=' text-light-2'>EASY</span><span className='uppercase text-2xl text-black'>Code</span></h1>
    </div>
    <div className="relative z-0 w-full mb-6 group">
      <input onChange={(event)=>handleSignupInputs(event)} type="text" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-light-2 appearance-none  focus:outline-none focus:ring-0 focus:border-dark-2 peer" placeholder=" " required />
      <label  for="username" className="peer-focus:font-medium absolute text-sm text-light-2  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-dark-2 peer-focus:dark:text-light-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Username</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input onChange={(event)=>handleSignupInputs(event)} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-light-2 appearance-none  focus:outline-none focus:ring-0 focus:border-dark-2 peer" placeholder=" " required />
      <label for="password" className="peer-focus:font-medium absolute text-sm text-light-2  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-dark-2 peer-focus:dark:text-light-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Password</label>
  </div>
  <div className="relative z-0 w-full mb-6 group">
      <input onChange={(event)=>handleSignupInputs(event)} type="password" name="confirmpassword" id="confirmpassword" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-light-2 appearance-none  focus:outline-none focus:ring-0 focus:border-dark-2 peer" placeholder=" " required />
      <label for="confirmpassword" className="peer-focus:font-medium absolute text-sm text-light-2  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-dark-2 peer-focus:dark:text-light-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Confirm password</label>
  </div>
  <div className="relative z-0 w-full mb-8 group">
      <input onChange={(event)=>handleSignupInputs(event)} type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-light-2 appearance-none  focus:outline-none focus:ring-0 focus:border-dark-2 peer" placeholder=" " required />
      <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-light-2  duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-dark-2 peer-focus:dark:text-light-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">E-mail address</label>
  </div>
  
  <button onClick={uploadSignupDetails} type="submit" className="text-white mb-7 bg-dark-2 hover:bg-black focus:ring-4 focus:outline-none focus:ring-light-2 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center">Sign Up</button>
  <h1><center className='text-light-2 -tracking-tight text-sm mb-5'>Have an account? &nbsp; <Link to="/signin" className="font-medium text-dark-2">Sign in</Link></center></h1>
  <h1><center className='text-light-2 font-normal -tracking-tight text-sm'>This site is protected by reCAPTCHA and the Google <u>Privacy Policy</u> and <u>Terms of Service apply</u>.</center></h1>
    </div>
    </div>
  )
}

export default SIgnup