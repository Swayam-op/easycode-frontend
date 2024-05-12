import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdSchool } from "react-icons/md";
import { IoEarthSharp } from "react-icons/io5";
import { IoLogoGithub } from "react-icons/io";
import { ImFire } from "react-icons/im";
import { algorithms, badges} from "../Api/Profile";
import { IoLogoLinkedin } from "react-icons/io5";
import { IoIosEye } from "react-icons/io";
import { AiOutlineSolution } from "react-icons/ai";
import { FaRocketchat } from "react-icons/fa6";
import DoughnutChart from "../Components/Charts/DoughnutChart";
import LineBar from "../Components/Charts/LineBar";
import Badge from "../Components/Badges/Badge";
import SubmissionCalender from "../Components/Calenders/SubmissionCalender";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserDetails, getUserProfile, selectUserInfo } from "../Redux/Reducers/UserReducer";
import SolutionListContainer from "../Components/ProfilePage/SolutionListContainer";
import RecentActivityContainer from "../Components/ProfilePage/RecentActivityContainer";
import EditProfile from "../Components/ProfilePage/EditProfile";
import { FaCirclePlus } from "react-icons/fa6";
import UploadProfilePicture from "../Components/ProfilePage/UploadProfilePicture";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const [containerList, setContianerList] = useState('recentActivity');
  const [closeProfileEditTab, setcloseProfileEditTab] = useState(true);
  const [closeUploadPictureTab, setcloseUploadPictureTab] = useState(true);
  const userInformation = useMemo(() => {
    //console.log("User details in profile page", userInfo);
    return userInfo;
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUserProfile());
    }
    return ()=>{
      if(userInfo){
        dispatch(clearUserDetails())
      }
    }
  }, [dispatch, userInfo]);

  function handleContianerList(id) {
    if (id === 1) {
      setContianerList('recentActivity');
    }
    else if (id === 2) {
      setContianerList('solutions');
    }
  }

  function closeEditProfile(option) {
    if (option === 'close') {
      setcloseProfileEditTab(true);
    }
    else if (option === 'disclose') {
      setcloseProfileEditTab(false);
    }
  }
  function closeUploadPicture(option) {
    if (option === 'close') {
      setcloseUploadPictureTab(true);
    }
    else if (option === 'disclose') {
      setcloseUploadPictureTab(false);
    }
  }
  return (
    <main className="max-w-6xl w-full min-h-screen py-10 mx-auto sm:py-8">
      {userInformation && userInformation.userDetails && (
        <>
          <EditProfile closeEditProfile={closeEditProfile} closeProfileEditTab={closeProfileEditTab} userInformation={userInformation} />
          <UploadProfilePicture closeUploadPicture={closeUploadPicture} closeUploadPictureTab={closeUploadPictureTab} currentImage={userInformation.userDetails.profilepicture}  />
          <div className="w-full grid sm:grid-cols-3 grid-cols-1 gap-3 ">
            <div className="col-span-1 p-4 text-light-1 bg-dark-2 rounded-lg">
              <div className="w-full grid grid-cols-3 mb-5 ">
                <div className="col-span-1 shadow-md  flex justify-center items-start w-24 h-24">
                  {/* <img src="https://wallpapers.com/images/high/naruto-pictures-qmc3mjl3e42475o4.webp" alt="" /> */}
                  <div
                    className="w-full h-full  rounded-lg bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url(${userInformation.userDetails.profilepicture})`,
                    }}
                  >
                  <FaCirclePlus onClick={()=>closeUploadPicture('disclose')} className="absolute -bottom-2 -right-2 text-lg cursor-pointer text-yellow-500 hover:text-green-600" />
                  </div>
                </div>

                <div className="col-span-2 relative">
                  <span className="block text-md text-light-1 font-semibold tracking-wide mb-1">
                    {userInformation.userDetails.fullname}
                  </span>
                  <span className="block text-xs text-light-2">
                    {userInformation.userDetails.username}
                  </span>
                  <span className="block absolute bottom-1 font-semibold text-light-1">
                    <span className="text-light-3 font-normal">Rank :</span> 1
                  </span>
                </div>
              </div>

              {userInformation.userDetails.bio && (
                <div className="w-full text-light-2 text-sm tracking-wide mb-5">
                  {userInformation.userDetails.bio}
                </div>
              )}

              <button onClick={() => closeEditProfile('disclose')} className="w-full py-2 mb-5 text-green-500 tracking-wide font-semibold bg-green-600 rounded-lg bg-opacity-20 ">
                Edit Profile
              </button>

              {userInformation.userDetails.location && (
                <div className="mb-4 flex items-center text-light-2 ">
                  <MdOutlineLocationOn className="" />
                  <span className="block ml-3 tracking-wide text-sm">
                    {userInformation.userDetails.location}
                  </span>
                </div>
              )}

              {userInformation.userDetails.college && (
                <div className="mb-4 flex items-center text-light-2">
                  <MdSchool className="" />
                  <span className="block ml-3 tracking-wide text-sm">
                    {userInformation.userDetails.college}
                  </span>
                </div>
              )}

              {userInformation.userDetails.portfolio && (
                <div className="mb-4 flex items-center text-light-2 hover:text-light-1 cursor-pointer">
                  <IoEarthSharp className="" />
                  <span className="block ml-3 tracking-wide text-sm">
                    <a href={`${userInformation.userDetails.portfolio}`}>
                      {userInformation.userDetails.portfolio}
                    </a>
                  </span>
                </div>
              )}

              {userInformation.userDetails.github && (
                <div className="mb-4 flex items-center text-light-2 hover:text-light-1 cursor-pointer">
                  <IoLogoGithub className="" />
                  <span className="block ml-3 tracking-wide text-sm">
                    <Link to={`${userInformation.userDetails.github}`}>
                      {userInformation.userDetails.github}
                    </Link>
                  </span>
                </div>
              )}

              {userInformation.userDetails.linkdin && (
                <div className="mb-4 flex items-center text-light-2 hover:text-light-1 cursor-pointer">
                  <IoLogoLinkedin className="" />
                  <span className="block ml-3 tracking-wide text-sm">
                    <Link to={`${userInformation.userDetails.linkdin}`}>
                      {userInformation.userDetails.linkdin}
                    </Link>
                  </span>
                </div>
              )}

              {userInformation.userDetails.proficientin && userInformation.userDetails.proficientin.length > 0 && (
                <div className="group mb-4 flex items-baseline text-light-2  cursor-pointer">
                  <ImFire className="text-2xl group-hover:text-orange-400" />
                  <div className="ml-3 tracking-wide text-sm flex flex-wrap">
                    {" "}
                    {userInformation.userDetails.proficientin.map(
                      (item, index) => (
                        <span
                          key={index}
                          className="block mr-2 mb-2 rounded-xl py-1 px-2 bg-light-2 hover:text-light-1 bg-opacity-20 text-xs"
                        >
                          {item}
                        </span>
                      )
                    )}{" "}
                  </div>
                </div>
              )}

              <div className="mb-5 border border-transparent border-b-gray-1"></div>
              {userInformation.solutionsDetails && (
                <div className="mb-5">
                  <h2 className="text-lg font-semibold tracking-wide mb-4">
                    Community Stats
                  </h2>
                  <div className="mb-4 flex items-center text-light-2 cursor-pointer">
                    <IoIosEye className="text-dark-1" />
                    <span className="block ml-3 tracking-wide text-sm">
                      Views{" "}
                      <span className="text-light-1">
                        {userInformation.solutionsDetails.totalViewsOfSolution || 0}
                      </span>
                    </span>
                  </div>

                  <div className="mb-4 flex items-center text-light-2 h cursor-pointer">
                    <AiOutlineSolution className="text-sky-1" />
                    <span className="block ml-3 tracking-wide text-sm">
                      Solutions{" "}
                      <span className="text-light-1">
                        {userInformation.solutionsDetails.totalNumberOfsolution || 0}
                      </span>
                    </span>
                  </div>

                  <div className="mb-4 flex items-center text-light-2 h cursor-pointer">
                    <FaRocketchat className="text-green-500" />
                    <span className="block ml-3 tracking-wide text-sm">
                      Discussions <span className="text-light-1">0</span>
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-5 border border-transparent border-b-gray-1"></div>

              {userInformation.questionsSolvedDetails && (
                <div className="mb-5">
                  <h2 className="text-lg font-semibold tracking-wide mb-4">
                    Languages
                  </h2>
                  <div className="flex w-full justify-between items-center">
                    <span className="block mr-2 mb-2 rounded-xl py-1 px-2 bg-light-2 hover:text-light-1 bg-opacity-20 text-xs">
                      C++
                    </span>{" "}
                    <span className="block text-xs text-light-2">
                      <span className="text-light-1 text-md font-semibold">
                        {
                          userInformation.questionsSolvedDetails.totalSolvedQuestions

                        }
                      </span>{" "}
                      Problems Solved
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-5 border border-transparent border-b-gray-1"></div>

              <div className="mb-5">
                <h2 className="text-lg font-semibold tracking-wide mb-4">
                  Skills
                </h2>
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
            <div className="sm:col-span-2 ">
              {/* <DoughnutChart/> */}
              <div className="w-full grid sm:grid-cols-2 gap-2 mb-4 ">
                {userInformation.questionsSolvedDetails && (
                  <div className="grid grid-cols-5 pt-4 px-4 box-border place-items-center rounded-lg  bg-dark-2">
                    <h1 className="place-self-start text-light-2 text-sm mb-2 col-span-5">
                      Solved Problems
                    </h1>
                    <div className="col-span-2 w-full ">
                      <DoughnutChart
                        numberOfQuestionsSolved={
                          userInformation.questionsSolvedDetails.totalSolvedQuestions
                        }
                        totalNumberOfQuestions={
                          userInformation.questionsSolvedDetails.totalQuestions
                        }
                      />
                    </div>
                    <div className="w-full col-span-3 ">
                      {/* easy */}
                      <LineBar color={"green"} level='Easy' total={userInformation.questionsSolvedDetails.totalEasy}
                       solved={userInformation.questionsSolvedDetails.solvedEasy} />
                      {/* medium */}
                      <LineBar color={"yellow"} level='Medium' total={userInformation.questionsSolvedDetails.totalMedium} 
                      solved={userInformation.questionsSolvedDetails.solvedMedium} />
                      {/* Hard */}
                      <LineBar color={"red"} level='Hard' total={userInformation.questionsSolvedDetails.totalHard} 
                      solved={userInformation.questionsSolvedDetails.solvedHard} />
                    </div>
                  </div>
                )}

                <div className="snap-x flex justify-start bg-dark-2 items-center py-2 overflow-x-auto rounded-lg relative scrollbar w-full">
                  <h1 className="absolute top-2 left-4 text-xs text-light-2">
                    Badges{" "}
                    <span className="text-xl text-light-1 font-semibold">3</span>
                  </h1>
             
                  {badges.map((item, index) => (
                    <Badge value={item} />
                  ))}
 
                  
                </div>
              </div>
              <div className="w-full mb-5 px-4 rounded-lg bg-dark-2 pt-4 overflow-y-auto scrollbar">
                <div className="w-full flex sm:flex-row flex-col items-center mb-4">
                  <div className="basis-1/2">
                    <h1 className="text-light-2 text-sm">
                      <span className="text-lg font-semibold text-light-1">
                        {userInformation.countSubmission}
                      </span>{" "}
                      submissions in the last year
                    </h1>
                  </div>
                  <div className="basis-1/2 flex justify-evenly">
                    <h1 className="text-xs text-light-2">
                      Total active days :{" "}
                      <span className="text-light-1 font-semibold text-xs">
                        {" "}
                        {userInformation.submissionDates.length}
                      </span>
                    </h1>
                    <h1 className="text-xs ml-3 sm:ml-0 text-light-2">
                      Max streaks :{" "}
                      <span className="text-gray-600  font-semibold text-xs">
                        {" "}
                        NULL
                      </span>
                    </h1>
                  </div>
                </div>
                <SubmissionCalender submissionsDate={userInformation.submissionDates} />
              </div>
              <div className="w-full rounded-lg bg-dark-2 p-4">
                <div className="w-full gap-2 mb-5  grid grid-cols-2 sm:grid-cols-5">
                  <button onClick={() => handleContianerList(1)} className={`flex ${containerList === 'recentActivity' ? "text-light-1" : "text-light-2"} font-semibold py-2 px-4 justify-center items-center bg-light-2 hover:text-light-1 bg-opacity-20 rounded-md`}>
                    <ImFire className="mr-2" /> Recent AC
                  </button>
                  <button onClick={() => handleContianerList(2)} className={`flex ${containerList === 'recentActivity' ? "text-light-2" : "text-light-1"} font-semibold py-2 px-4 justify-center items-center bg-light-2 hover:text-light-1 bg-opacity-20 rounded-md`}>
                    <ImFire className="mr-2" /> Solutions
                  </button>

                </div>
                <div className="w-full py-2 text-light-1 tracking-wide text-sm font-semibold">

                  {
                    containerList && containerList === 'recentActivity' ?
                      <RecentActivityContainer lists={userInformation.submissionDetails} /> :
                      <SolutionListContainer lists={userInformation.solutionsDetails.solutionList} />
                  }


                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Profile;
