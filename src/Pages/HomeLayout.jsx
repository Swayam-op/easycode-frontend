import React, { useEffect } from 'react'
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import SideBar from '../Components/SideBar';

const HomeLayout = () => {
  useEffect(()=>{
    
  },[])
  return (
    <section className='bg-black min-h-screen overflow-hidden'>
     <Navbar />
     <SideBar/>
     <Outlet/>
     <Footer/>
    </section>
  )
}

export default HomeLayout