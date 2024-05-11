import React, { useEffect, useState } from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import useDebounse from '../../CustomeHooks/useDebounse';
import { BiSolidLike } from "react-icons/bi";
const SolutionDetailsCard = ({ detail, alterLikes }) => {
  const [likesClicked, setLikesClicked] = useState(0);
  const debounceLikeClicked = useDebounse(likesClicked, 1000);
  const [hasLiked, setHasLiked] = useState(detail.userHasLiked);
  const [totalLikes, setTotalLikes] = useState(detail.likesNumber);

  useEffect(() => {
    if (debounceLikeClicked % 2 === 1) {
      setLikesClicked(0);
      alterLikes();
    }
    //console.log("likes is ", debounceLikeClicked);
  }, [debounceLikeClicked, alterLikes])

  function handleLikes() {
    if (hasLiked) {
      setTotalLikes(totalLikes - 1);
      setHasLiked(false);
    }
    else {
      setTotalLikes(totalLikes + 1);
      setHasLiked(true);
    }
    setLikesClicked(likesClicked + 1);
  }

  return (
    <div className="flex items-start w-full  mb-4">
      <div className="shadow-md mt-1 rounded-full overflow-hidden items-start w-6 h-6">
        <div
          className="w-full h-full bg-cover bg-center rounded-full"
          style={{
            backgroundImage: `url(${detail ? detail.profile_picture : "default_profile_picture.jpeg"})`,
          }}
        ></div>
      </div>
      <div className="ml-4 pb-4 w-full border border-transparent border-b-gray-4 border-opacity-30 ">
        <p className="w-full flex justify-between items-center">
          <h3 className="text-md text-light-2 text-opacity-60 mb-2">{detail.username}</h3>
          <h6 className="text-xs text-light-2 text-opacity-50 font-light">{new Date(detail.createdAt).toLocaleString()}</h6>
        </p>
        <h3 className="text-2xl text-light-1 font-medium mb-3 ">{detail.title}</h3>
        <div className="w-full flex text-xs mb-2">
          <span className="block py-1 px-3 bg-light-2 bg-opacity-20 rounded-xl mx-1">c++</span>
          <span className="block py-1 px-3 bg-light-2 bg-opacity-20 rounded-xl mx-1">Easy</span>
        </div>
        <div className="w-full py-2">
          <ul className="w-full text-gray-400 text-opacity-70 grid grid-cols-6 place-items-center gap-3">
            <li className="w-full flex items-center justify-center border border-transparent border-r-gray-2"><BiSolidLike className="" /><span className="ml-2">{totalLikes}</span></li>
            <li className="w-full flex items-center justify-center  border border-transparent border-r-gray-2"><FaRegEye className="" /><span className="ml-2">{detail.viewsNumber}</span></li>
            <li className="w-full justify-center flex items-center"><FaRegComment className="" /><span className="ml-2.5">0</span></li>
            <li></li>
            <li></li>
            <li onClick={handleLikes} className='px-5 py-2 cursor-pointer bg-black hover:bg-dark-4 bg-gradient-to-br from-bg-dark-5 to-bg-dark-4 shadow-shadow-inset-2 flex items-center text-md font-medium text-light-1'><BiSolidLike className={`${hasLiked ? "text-green-600" : "text-light-1"} text-xl hover:text-green-600 inline`} /></li>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default SolutionDetailsCard