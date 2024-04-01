import React, { useEffect} from 'react'
import { GrTechnology } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDiscussionRooms, selectDiscussionRooms } from '../Redux/Reducers/DiscussionReducer';
const Discussion = () => {
  const dispatch = useDispatch();
  const discussionRooms = useSelector(selectDiscussionRooms);
  useEffect(() => {
    if (!discussionRooms) {
      dispatch(getDiscussionRooms());
    }
  }, [dispatch, discussionRooms])
  return (
    <div className='w-full max-w-screen-xl mx-auto min-h-screen py-12'>
      <div className='flex flex-col sm:flex-row justify-center items-center w-full'>
        <div className='w-full '>
          <h1 className='text-light-1 font-semibold text-6xl tracking-wide mb-10 '>
            <span className='text-sky-1'>Discussion</span> Makes Ideas <span className='bg-gradient-to-br to-dark-2 from-light-1 text-transparent bg-clip-text'>Better.</span>
          </h1>
          <p className='text-light-1 pr-10 text-justify text-opacity-50 text-sm tracking-wider leading-loose'>
            Positive discussions foster understanding, empathy, and collaboration. They cultivate an environment where diverse perspectives are valued, leading to innovative solutions. Through respectful dialogue, individuals feel heard and empowered, paving the way for mutual growth and shared success in all endeavors.
          </p>
        </div>
        <div className='w-full box-border p-10' >
          <img src="/Images/discussion.svg" alt="" />
        </div>
      </div>

      {
        discussionRooms &&
        <div className='py-10 w-full'>
          <h3 className='text-lg tracking-wider text-light-1 font-semibold mb-5'>Join Rooms to Share Your Solutions</h3>
          <div className='w-full grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6'>
            {
              discussionRooms.map((room, index) => {
                return (
                  <div key={index} className='w-full border bg-black rounded-lg p-5 transition-all duration-300 ease-out hover:scale-105 hover:shadow-sm hover:shadow-light-1'>
                    <GrTechnology className='text-5xl text-light-1 mx-auto mb-4' />
                    <h4 className='font-semibold text-light-1 uppercase text-center mb-4'>{room.title}</h4>
                    <div className='mb-2'>
                      <p className='grow text-xs text-light-3 text-opacity-50'>{room.description}</p>
                    </div>
                    <Link to={`/discuss/chat/${room._id}`} className='float-end text-light-1 border-light-1 text-xs rounded-md border px-5 py-2 cursor-pointer transition-all duration-300 ease-out hover:font-semibold  hover:bg-gray-50 hover:text-dark-3'>Join now</Link>
                  </div>
                )
              })
            }

          </div>
        </div>
      }

    </div>
  )
}

export default Discussion