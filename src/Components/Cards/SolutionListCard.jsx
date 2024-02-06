import React from "react";
import { SlLike } from "react-icons/sl";
import { FaRegEye } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";

const SolutionListCard = ({detail}) => {
  return (
    <div className="flex items-start w-full cursor-pointer mb-4">
      <div className="shadow-md mt-1 rounded-full overflow-hidden flex justify-center items-start w-6 h-6">
              <img src={detail.profile_picture || "/default_profile_picture.jpeg"}  alt="" />
      </div>
      <div className="ml-4 pb-4 w-full border border-transparent border-b-gray-4 border-opacity-30 ">
      <p className="w-full flex justify-between items-center">
      <h3 className="text-md text-light-2 text-opacity-60 mb-2">{detail.username}</h3> 
      <h6 className="text-xs text-light-2 text-opacity-50 font-light">{new Date(detail.createdAt).toLocaleString()}</h6>
      </p>
        <h3 className="text-sm text-light-1 font-medium mb-3">{detail.title}</h3>
        <div className="w-full flex text-xs mb-2">
            <span className="block py-1 px-3 bg-light-2 bg-opacity-20 rounded-xl mx-1">c++</span>
            <span className="block py-1 px-3 bg-light-2 bg-opacity-20 rounded-xl mx-1">Easy</span>
        </div>
        <div className="w-full py-2">
        <ul className="w-full text-gray-400 text-opacity-70 grid grid-cols-6 place-items-center gap-3">
        <li className="w-full flex items-center justify-center border border-transparent border-r-gray-2"><SlLike className=""/><span className="ml-2">{detail.likesNumber}</span></li>
            <li className="w-full flex items-center justify-center  border border-transparent border-r-gray-2"><FaRegEye  className=""/><span className="ml-2">{detail.viewsNumber}</span></li>
            <li className="w-full justify-center flex items-center"><FaRegComment className=""/><span className="ml-2.5">0</span></li>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default SolutionListCard;
