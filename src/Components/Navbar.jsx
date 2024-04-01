import React, { useEffect, useState } from 'react'
import {FaCodeMerge} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { SelectIsAuthenticated, logoutThunk, selectShortUserDetails} from '../Redux/Reducers/AuthReducer';

const Navbar = () => {
  const dispatch = useDispatch();
  const [displayProfile, setDisplayProfile] = useState('hidden');
  const isAuthenticated = useSelector(SelectIsAuthenticated);
  const userShortDetails = useSelector(selectShortUserDetails);
  const location = useLocation();
  const displayProfileHandle = ()=>{
    if(displayProfile === "hidden"){
      setDisplayProfile("block");
    }
    else{
      setDisplayProfile("hidden");
    }
  }
  
  function logoutHandle(){
    //console.log("logout handle");
    dispatch(logoutThunk({}));
    setDisplayProfile("hidden");
  }


  useEffect(()=>{
    //console.log("isAuthenticated in side navbar : ",isAuthenticated);
  },[isAuthenticated]);
  return (
    <div className='hidden sm:flex w-full lg:px-12 md:px-8 px-2 text-light-1 bg-dark-3'>
    <div className='flex items-center basis-1/2 justify-between'>
    <div className='flex basis-1/3 items-center font-bold uppercase'><FaCodeMerge className="text-light-2 text-xl font-bold inline mr-2"/> <span className='text-lg text-light-2 -tracking-tight'>EASy</span><span className='text-lg text-light-1'>CODE</span></div>
    <div className='flex basis-2/3 w-full  pr-10 justify-between'>
    <Link className={`relative px-2 text-sm py-5 block text-md font-medium -tracking-tight  hover:text-light-2 transition-colors duration-200   hover:after:visible after:content-[''] after:h-1 after:rounded-md after:w-full after:left-0 after:bg-light-2 after:absolute after:bottom-0 after:-translate-x-4 hover:after:translate-x-0 after:transition-transform after:duration-200 ${location.pathname === "/explore"?"after:visible after:translate-x-0 font-semibold text-light-2 " : "after:invisible text-light-1 "}`} to={'/explore'}>Explore</Link>
    <Link className={`relative px-2 text-sm py-5 block text-md font-medium -tracking-tight  hover:text-light-2 transition-colors duration-200   hover:after:visible after:content-[''] after:h-1 after:rounded-md after:w-full after:left-0 after:bg-light-2 after:absolute after:bottom-0 after:-translate-x-4 hover:after:translate-x-0 after:transition-transform after:duration-200 ${location.pathname === "/problems"?"after:visible after:translate-x-0 font-semibold text-light-2 " : "after:invisible text-light-1 "}`} to={'/problems'}>Problems</Link>
    <Link className={`relative px-2 text-sm py-5 block text-md font-medium -tracking-tight  hover:text-light-2 transition-colors duration-200   hover:after:visible after:content-[''] after:h-1 after:rounded-md after:w-full after:left-0 after:bg-light-2 after:absolute after:bottom-0 after:-translate-x-4 hover:after:translate-x-0 after:transition-transform after:duration-200 ${location.pathname === "/discuss"?"after:visible after:translate-x-0 font-semibold text-light-2" : "after:invisible text-light-1 "}`} to={'/discuss'}>Discuss</Link>
    <Link className={`relative px-2 text-sm py-5 block text-md font-medium -tracking-tight  hover:text-light-2 transition-colors duration-200   hover:after:visible after:content-[''] after:h-1 after:rounded-md after:w-full after:left-0 after:bg-light-2 after:absolute after:bottom-0 after:-translate-x-4 hover:after:translate-x-0 after:transition-transform after:duration-200 ${location.pathname === "/interview"?"after:visible after:translate-x-0 font-semibold text-light-2" : "after:invisible text-light-1 "}`} to={'/interview'}>Interview</Link>
    </div>
    </div>
    <div className='flex grow items-center justify-end' >
      {
        isAuthenticated === false? 
        (<div className='basis-1/2 flex justify-evenly'>
        <Link to={'/signup'} className='py-2.5 px-8 text-center rounded-md font-semibold text-sm text-light-1 bg-black hover:bg-dark-4  shadow-shadow-inset-2'>Sign up</Link>
        <Link to={'/signin'} className='py-2.5 px-8 text-center rounded-md font-semibold text-sm text-light-1 bg-black hover:bg-dark-4  shadow-shadow-inset-2'>Sign in</Link>
        </div>)

        :

        (<div>
          <div className='relative'>
            <button onClick={displayProfileHandle} className='w-9 h-9 border border-dark-5 hover:border-2 shadow-shadow-1 rounded-full group bg-dark-2'> 
            <div
                                className="w-full h-full bg-cover bg-center rounded-full"
                                style={{
                                    backgroundImage: `url(${userShortDetails ? userShortDetails.profilePicture : "default_profile_picture.jpeg"})`,
                                }}
                            ></div>
            </button>
            <div className={`${displayProfile} z-20 absolute right-0 top-10 rounded-sm shadow-md border border-gray-4 w-fit bg-dark-2 text-light-1`}>
              <Link to='/profile' className='px-5 py-2 block border border-transparent border-b-gray-4'>Profile</Link>
              <button onClick={()=>logoutHandle()}  className='px-5 py-2 block'>Logout</button>
            </div>
          </div>
        </div>)
      }
    </div>
    </div>
  )
}

export default Navbar