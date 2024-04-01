import React, { useEffect, useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";
import { FaCodeMerge } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';
import { logoutThunk, selectShortUserDetails } from '../Redux/Reducers/AuthReducer';
import { useDispatch, useSelector } from 'react-redux';
import { LuView } from "react-icons/lu";

const SideBar = () => {
    const [sideBarState, setSideBarState] = useState('closed');
    const dispatch = useDispatch();
    // const isAuthenticated = useSelector(selectUserShort);
    const userShortDetails = useSelector(selectShortUserDetails);
    // const [userShortDetails, setUserShortDetails] = useState(null);
    const location = useLocation();

    function handleSideBar(option) {
        if (option === 'close')
            setSideBarState("closed");
        else
            setSideBarState("opened");
    }

    function logoutHandle(){
        dispatch(logoutThunk());
    }

    useEffect(()=>{
        //console.log("userShortDetails inside sidebar", userShortDetails);
    },[userShortDetails])
    return (
        <div className='block z-50 fixed sm:hidden w-full bg-dark-4 '>
            <div className='flex w-full justify-between items-center py-2 px-4'>
                <div className='flex basis-1/3 items-center font-bold uppercase'><FaCodeMerge className="text-light-2 text-xl font-bold inline mr-2" /> <span className='text-lg text-light-2 -tracking-tight'>EASY</span><span className='text-lg text-light-1'>CODE</span></div>
                <button onClick={() => handleSideBar("open")} className='text-3xl text-light-1'><IoIosMenu /></button>
            </div>
            <div className={`${sideBarState === 'closed' ? "invisble opacity-0 -translate-x-full" : "visible opacity-100 translate-x-0"} bg-dark-3/50 flex w-full h-screen overflow-y-auto absolute inset-0 z-50 transition-all duration-200 ease-in-out`}>
                <div className='basis-4/5 relative bg-gradient-to-br min-h-full p-5 from-dark-4 to-dark-3 w-full '>
                    <div className='flex w-full justify-between items-center mb-4'>
                        <div className='flex basis-1/3 items-center font-bold uppercase'><FaCodeMerge className="text-light-2 text-xl font-bold inline mr-2" /> <span className='text-lg text-light-2 -tracking-tight'>EASY</span><span className='text-lg text-light-1'>CODE</span></div>
                        <button onClick={() => handleSideBar("close")} className='text-3xl text-red-600'><IoCloseOutline /></button>
                    </div>
                    <p className='leading-6 text-sm font-light tracking-wide text-light-3 py-6 text-justify'>
                        Welcome to EasyCode🎉🎉🎉. Learn, Practice and Repeat will make your problem solving to top-notch.🏆
                    </p>

                    <hr className='bg-dark-5 border-dark-5 mb-4' />

                    {
                        userShortDetails &&
                        <>
                        <div className='flex w-full justify-between items-center mb-4'>
                            <div
                                className="w-10 h-10 bg-cover bg-center rounded-full"
                                style={{
                                    backgroundImage: `url(${userShortDetails ? userShortDetails.profilePicture : "/Profile.JPG"})`,
                                }}
                            ></div>
                            <Link to='/profile' className={`relative flex items-center font-medium ml-2 px-2 text-gray-4 text-md text-md hover:font-medium -tracking-tight  hover:text-light-2 transition-colors duration-200  ${location.pathname === "/profile" ? "font-semibold text-light-2 " : ""} `}> <span className='text-sm mr-2'>Profile</span>  <LuView className="text-md text-gray-4" /></Link>
                        </div>
                        <hr className='bg-dark-5 border-dark-5 mb-4' />
                        </>
                    }



                    

                    <ul onClick={() => handleSideBar("close")} className=' text-gray-4'>
                        <li className='my-4'><Link to='/' className={`relative px-2 text-md block text-md hover:font-medium -tracking-tight  hover:text-light-2 transition-colors duration-200  ${location.pathname === "/explore" || location.pathname === '/' ? "font-semibold text-light-2 " : ""} `}>Explore</Link></li>
                        <li className='my-4'><Link to='/problems' className={`relative px-2 text-md block text-md hover:font-medium -tracking-tight  hover:text-light-2 transition-colors duration-200 ${location.pathname === "/problems" ? "font-semibold text-light-2 " : ""}  `}>Problems</Link></li>
                        <li className='my-4'><Link to='/discuss' className={`relative px-2 text-md block text-md hover:font-medium -tracking-tight  hover:text-light-2 transition-colors duration-200 ${location.pathname === "/discuss" ? "font-semibold text-light-2 " : ""} `}>Discuss</Link></li>
                        <li className='my-4'><Link to='/interview' className={`relative px-2 text-md block text-md hover:font-medium -tracking-tight  hover:text-light-2 transition-colors duration-200  ${location.pathname === "/interview" ? "font-semibold text-light-2 " : ""} `}>Interview</Link></li>
                    </ul>



                    <div className='absolute w-full px-5 bottom-10 left-0'>
                        {
                            userShortDetails === null ?
                                <Link to={'/signin'} className='py-2.5 px-6 text-center rounded-md font-semibold text-xs text-light-1 bg-black hover:bg-dark-4 bg-gradient-to-br from-bg-dark-5 to-bg-dark-4 shadow-shadow-inset-2'>Sign in</Link>
                                :
                                <button onClick={logoutHandle} className='py-2.5 px-6 text-center rounded-md font-semibold text-xs text-light-1 bg-black hover:bg-dark-4 bg-gradient-to-br from-bg-dark-5 to-bg-dark-4 shadow-shadow-inset-2'>Logout</button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SideBar