import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdSchool } from "react-icons/md";
import { IoEarthSharp } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { ImFire } from "react-icons/im";
import { skills, algorithms, badges, recentAc } from "../Api/Profile";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import { AiOutlineSolution } from "react-icons/ai";
import { FaRocketchat } from "react-icons/fa6";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import LineBar from "../Components/Charts/LineBar";
import Badge from "../Components/Badges/Badge";
import SubmissionCalender from "../Components/Calenders/SubmissionCalender";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <main className="max-w-6xl mx-auto py-8  ">
      <div className="w-full grid grid-cols-3 gap-3 ">
        <div className="col-span-1 p-4 text-light-1  bg-dark-2 rounded-lg">
          <div className="w-full grid grid-cols-3 mb-5 ">
            <div className="col-span-1 shadow-md rounded-lg overflow-hidden flex justify-center items-start w-24 h-24">
              <img src="/profile.JPG" alt="" />
            </div>

            <div className="col-span-2 relative">
              <span className="block text-md text-light-1 font-semibold tracking-wide mb-1">
                Swayam Prakash Sahoo
              </span>
              <span className="block text-xs text-light-2">swayam_op</span>
              <span className="block absolute bottom-1 font-semibold text-light-1">
                <span className="text-light-3 font-normal">Rank :</span> 1023
              </span>
            </div>
          </div>
          <div className="w-full text-light-2 text-sm tracking-wide mb-5">
            I am a MERN Stack developer focusing on solving competitive
            questions and making a good rank. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nemo, nisi.
          </div>
          <button className="w-full py-2 mb-5 text-green-500 tracking-wide font-semibold bg-green-600 rounded-lg bg-opacity-20 ">
            Edit Profile
          </button>

          <div className="mb-4 flex items-center text-light-2 ">
            <MdOutlineLocationOn className="" />
            <span className="block ml-3 tracking-wide text-sm">India</span>
          </div>

          <div className="mb-4 flex items-center text-light-2">
            <MdSchool className="" />
            <span className="block ml-3 tracking-wide text-sm">
              Gandhi Institute For Technology
            </span>
          </div>

          <div className="mb-4 flex items-center text-light-2 hover:text-light-1 cursor-pointer">
            <IoEarthSharp className="" />
            <span className="block ml-3 tracking-wide text-sm">
              <a href="https://swayam-op.web.app/">
                https://swayam-op.web.app/
              </a>
            </span>
          </div>

          <div className="mb-4 flex items-center text-light-2 hover:text-light-1 cursor-pointer">
            <IoLogoGithub className="" />
            <span className="block ml-3 tracking-wide text-sm">
              <Link to="/swayam-op">swayam-op</Link>
            </span>
          </div>

          <div className="mb-4 flex items-center text-light-2 hover:text-light-1 cursor-pointer">
            <IoLogoLinkedin className="" />
            <span className="block ml-3 tracking-wide text-sm">
              <Link to="/">swayam prakash</Link>
            </span>
          </div>

          <div className="group mb-4 flex items-baseline text-light-2  cursor-pointer">
            <ImFire className="text-2xl group-hover:text-orange-400" />
            <div className="ml-3 tracking-wide text-sm flex flex-wrap">
              {" "}
              {skills.map((item, index) => (
                <span className="block mr-2 mb-2 rounded-xl py-1 px-2 bg-light-2 hover:text-light-1 bg-opacity-20 text-xs">
                  {item}
                </span>
              ))}{" "}
            </div>
          </div>

          <div className="mb-5 border border-transparent border-b-gray-1"></div>

          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-wide mb-4">
              Community Stats
            </h2>
            <div className="mb-4 flex items-center text-light-2 cursor-pointer">
              <IoIosEye className="text-dark-1" />
              <span className="block ml-3 tracking-wide text-sm">
                Views <span className="text-light-1">7.1k</span>
              </span>
            </div>

            <div className="mb-4 flex items-center text-light-2 h cursor-pointer">
              <AiOutlineSolution className="text-sky-1" />
              <span className="block ml-3 tracking-wide text-sm">
                Solutions <span className="text-light-1">82</span>
              </span>
            </div>

            <div className="mb-4 flex items-center text-light-2 h cursor-pointer">
              <FaRocketchat className="text-green-500" />
              <span className="block ml-3 tracking-wide text-sm">
                Discussions <span className="text-light-1">0</span>
              </span>
            </div>
          </div>

          <div className="mb-5 border border-transparent border-b-gray-1"></div>

          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-wide mb-4">
              Languages
            </h2>
            <div className="flex w-full justify-between items-center">
              <span className="block mr-2 mb-2 rounded-xl py-1 px-2 bg-light-2 hover:text-light-1 bg-opacity-20 text-xs">
                C++
              </span>{" "}
              <span className="block text-xs text-light-2">
                <span className="text-light-1 text-md font-semibold">500</span>{" "}
                Problems Solved
              </span>
            </div>
          </div>

          <div className="mb-5 border border-transparent border-b-gray-1"></div>

          <div className="mb-5">
            <h2 className="text-lg font-semibold tracking-wide mb-4">Skills</h2>
            <div className="ml-3 tracking-wide text-sm flex flex-wrap">
              {" "}
              {algorithms.map((item, index) => (
                <span className="block mr-2 mb-2 rounded-xl py-1 px-2 bg-light-2 hover:text-light-1 bg-opacity-20 text-xs">
                  {item}
                </span>
              ))}{" "}
            </div>
          </div>
        </div>
        <div className="col-span-2 ">
          {/* <DoughnutChart/> */}
          <div className="w-full grid grid-cols-2 gap-2 mb-4 ">
            <div className="grid grid-cols-5 pt-4 px-4 box-border place-items-center rounded-lg  bg-dark-2">
              <h1 className="place-self-start text-light-2 text-sm mb-2 col-span-5">
                Solved Problems
              </h1>
              <div className="col-span-2 w-full ">
                <DoughnutChart />
              </div>
              <div className="w-full col-span-3 ">
                <LineBar color={"green"} percentage={"1/3"} />
                <LineBar color={"yellow"} percentage={"2/3"} />
                <LineBar color={"red"} percentage={"1/3"} />
              </div>
            </div>

            
            <div className="snap-x flex justify-start bg-dark-2 items-center overflow-x-scroll rounded-lg relative scrollbar w-full">
            <h1 className="absolute top-2 left-4 mb-4 text-xs text-light-2">
            Badges <span className="text-xl text-light-1 font-semibold">3</span>
            </h1>
              {badges.map((item, index) => (
                <Badge value={item} />
              ))}
            </div>
            
          </div>
          <div className="w-full mb-5 px-4 rounded-lg bg-dark-2 py-4">
            <div className="w-full flex items-center mb-4">
              <div className="basis-1/2">
                <h1 className="text-light-2 text-sm">
                  <span className="text-lg font-semibold text-light-1">
                    231
                  </span>{" "}
                  submissions in the last year
                </h1>
              </div>
              <div className="basis-1/2 flex justify-evenly">
                <h1 className="text-xs text-light-2">
                  Total active days :{" "}
                  <span className="text-light-1 font-semibold text-xs">
                    {" "}
                    142
                  </span>
                </h1>
                <h1 className="text-xs text-light-2">
                  Max streaks :{" "}
                  <span className="text-light-1 font-semibold text-xs">
                    {" "}
                    24
                  </span>
                </h1>
              </div>
            </div>
            <SubmissionCalender />
          </div>
          <div className="w-full rounded-lg bg-dark-2 p-4">
            <div className="w-full gap-2 mb-5  grid grid-cols-5">
              <button className="flex text-light-1 font-semibold py-2 px-4 justify-center items-center bg-light-2 hover:text-light-1 bg-opacity-20 rounded-md">
                <ImFire className="mr-2" /> Recent AC
              </button>
              <button className="flex text-light-2 font-semibold py-2 px-4 justify-center items-center bg-light-2 hover:text-light-1 bg-opacity-20 rounded-md">
                <ImFire className="mr-2" /> Solutions
              </button>
              <button className="flex text-light-2 font-semibold py-2 px-4 justify-center items-center bg-light-2 hover:text-light-1 bg-opacity-20 rounded-md">
                <ImFire className="mr-2" /> Discuss
              </button>
            </div>
            <div className="w-full py-2 text-light-1 tracking-wide text-sm font-semibold">
            {
              recentAc && recentAc.map((item, index)=>{
                return(
                  <div className={`w-full rounded-md ${index%2?"":"bg-light-2 bg-opacity-10"}  flex justify-between items-center py-4 px-4`}>
                <h1 className="">Minimum number of pushed to type number II</h1>
                <span className="text-xs">14 hours ago</span>
              </div>
                )
              })
            }
             
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
