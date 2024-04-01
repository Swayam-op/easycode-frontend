import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <section id='hero' className='w-full flex flex-col-reverse lg:flex-row lg:px-16 md:px-12 sm:px-8 lg:mt-20 md:mt-10 sm:mt-10 mt-4  px-1 pt-12 pb-16 border-1 border-transparent '>
    <div className='basis-7/12 px-2 sm:pr-10'>
        <h3 className='tracking-widest text-light-2 font-medium pb-2 sm:pb-0'>WELCOME TO EASYCODE</h3>
        <h1 className='py-2 md:py-5 lg:py-6 lg:text-6xl sm:text-5xl text-4xl font-bold text-white'>Write Your First <span className='lg:text-5xl sm:text-4xl text-3xl text-transparent bg-clip-text bg-gradient-to-tr from-dark-1 to-sky-1'>CODE</span> </h1>
        <h1 className='lg:text-6xl sm:text-5xl text-4xl  font-bold text-white sm:py-2'>with <span className='lg:text-5xl sm:text-4xl text-3xl text-transparent bg-clip-text bg-gradient-to-tr from-dark-1 to-sky-1'>EasyCode</span></h1>
        <p className='text-light-3 py-6 leading-loose text-lg md:pr-8 opacity-90 text-justify'>
        DSA, crucial in computer science, comprises data structures and algorithms. Consistent coding practice sharpens problem-solving skills essential for interviews and real-world applications, aiding in mastering these fundamental concepts.
        </p>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
          <Link to={'/problems'} className='w-full text-center py-2.5 rounded-md font-semibold text-sm text-light-1 hover:bg-dark-4 bg-gradient-to-br from-bg-dark-5 to-bg-dark-4 shadow-shadow-inset-2 '>Solve Problem</Link>
        </div>
    </div>
    <div className='w-full md:basis-5/12  flex justify-center  mb-10'>
        <div className='md:w-7/12 w-10/12 h-fit relative bg'>
            <div className='absolute z-10 w-full h-3/4 shadow-shadow-1 bg-gradient-to-br from-dark-4 to-dark-5 rounded-3xl bottom-0'></div>
            <img className='z-30 relative block ' src={'/images/cpp.png'} alt="" />
        </div>

    </div>
</section>
  )
}
