import React from 'react'
import {FaCodeMerge} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Navbar = () => {
    const location = useLocation();
    console.log(location.pathname);
  return (
    <div className='w-full border lg:px-24 md:px-16 px-2  bg-light-1 text-black flex'>
    <div className='flex items-center basis-1/2 justify-between'>
    <div className='flex basis-1/3 items-center font-bold uppercase'><FaCodeMerge className="text-dark-2 text-xl font-bold inline mr-2"/> <span className='text-lg text-dark-1 -tracking-tight'>EASy</span><span className='text-lg text-black'>CODE</span></div>
    <div className='flex basis-2/3 w-full  pr-10 justify-between'>
    <Link className={`relative px-2 text-sm py-5 block text-md font-medium -tracking-tight  hover:text-black transition-colors duration-200   hover:after:visible after:content-[''] after:h-1 after:rounded-md after:w-full after:left-0 after:bg-black after:absolute after:bottom-0 after:-translate-x-4 hover:after:translate-x-0 after:transition-transform after:duration-200 ${location.pathname === "/explore"?"after:visible after:translate-x-0 font-semibold text-black " : "after:invisible text-dark-1 "}`} to={'/explore'}>Explore</Link>
    <Link className={`relative px-2 text-sm py-5 block text-md font-medium -tracking-tight  hover:text-black transition-colors duration-200   hover:after:visible after:content-[''] after:h-1 after:rounded-md after:w-full after:left-0 after:bg-black after:absolute after:bottom-0 after:-translate-x-4 hover:after:translate-x-0 after:transition-transform after:duration-200 ${location.pathname === "/problems"?"after:visible after:translate-x-0 font-semibold text-black " : "after:invisible text-dark-1 "}`} to={'/problems'}>Problems</Link>
    <Link className={`relative px-2 text-sm py-5 block text-md font-medium -tracking-tight  hover:text-black transition-colors duration-200   hover:after:visible after:content-[''] after:h-1 after:rounded-md after:w-full after:left-0 after:bg-black after:absolute after:bottom-0 after:-translate-x-4 hover:after:translate-x-0 after:transition-transform after:duration-200 ${location.pathname === "/discuss"?"after:visible after:translate-x-0 font-semibold text-black" : "after:invisible text-dark-1 "}`} to={'/discuss'}>Discuss</Link>
    <Link className={`relative px-2 text-sm py-5 block text-md font-medium -tracking-tight  hover:text-black transition-colors duration-200   hover:after:visible after:content-[''] after:h-1 after:rounded-md after:w-full after:left-0 after:bg-black after:absolute after:bottom-0 after:-translate-x-4 hover:after:translate-x-0 after:transition-transform after:duration-200 ${location.pathname === "/interview"?"after:visible after:translate-x-0 font-semibold text-black" : "after:invisible text-dark-1 "}`} to={'/interview'}>Interview</Link>
    </div>
    </div>
    <div className='flex grow items-center justify-end' >
    <div className='basis-1/2 flex justify-evenly'>
    <Link to={'/signup'} className='py-2.5 px-8 bg-light-2 shadow-md text-sm font-semibold text-dark-2 transition-colors duration-200 hover:text-white rounded-lg hover:bg-dark-2'>Sign up</Link>
    <Link to={'/signin'} className='py-2.5 px-8 bg-light-1 shadow-md text-sm font-semibold text-dark-2 transition-colors duration-200 hover:text-white rounded-lg hover:bg-dark-2'>Sign in</Link>
    </div>
    </div>
    </div>
  )
}

export default Navbar