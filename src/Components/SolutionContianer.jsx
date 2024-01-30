import React, { useEffect, useCallback } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import SolutionListCard from "./Cards/SolutionListCard";
import { useDispatch, useSelector } from "react-redux";
import {
    clearSolutionList,
  getSolutionsThunk,
  selectSulutionList,
} from "../Redux/Reducers/SolutionReducer";

const SolutionContianer = ({alterSolutionVisibility}) => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const solutionsList = useSelector(selectSulutionList) || [];
  const navigate = useNavigate();
//   function seeMore() {}
  
  function showSolution (solutionId){
    if(SolutionListCard){
        navigate(`${location.pathname}/solution/${solutionId}`);
    }
  }
   const  dispatchAll = useCallback(
    async()=>{
        // console.log("when solution lIST IS LOADED, ", solutionsList)
          const info = {
            questionId: id,
            skip: 0,
            count: 10,
          };
          const promises = [
            dispatch(clearSolutionList()),
            dispatch(getSolutionsThunk(info))
          ]
          await Promise.all(promises);
      },
    [id, dispatch],
  )
  
  useEffect(() => {
    if (id ) {
        dispatchAll();
    }
    console.log("hello solution contianer")
  }, [id, dispatchAll]);

  return (
    <section className="w-full">
      <div className="p-2 mb-4 bg-gray-4 bg-opacity-30 rounded-md flex justify-between items-center">
        <div className="flex items-center">
          <CiCirclePlus className="text-xl rounded-full text-light-1 bg-light-2 bg-opacity-20" />
          <h4 className="ml-3 tracking-wide text-xs text-light-1">
            Want to upload your own solution. What are you waiting for!
          </h4>
        </div>

        <Link
          to={`${location.pathname}/write-solution`}
          className={`px-3 py-1.5 float-right text-xs flex items-center bg-green-600 rounded-md shadow-md cursor-pointer hover:bg-green-700 font-medium tracking-wide`}
        >
          <CiEdit className="inline mr-3 text-lg font-medium text-light-1" />
          Share my solution
        </Link>
      </div>
      <div className="">
      {
        solutionsList && solutionsList.map((item, index)=>(
            <div key={index} onClick={()=>showSolution(item._id)}>
            <SolutionListCard detail = {item} />
            </div> 
        ))
      }
      </div>
    </section>
  );
};

export default SolutionContianer;
