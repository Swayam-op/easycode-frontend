import React, { useEffect, useCallback } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useDispatch, useSelector } from "react-redux";
import { addLikesToSolutionThunk, getDetailsOfSolutionThunk, selectSingleSolutionInfo } from "../../Redux/Reducers/SolutionReducer";
import SolutionDetailsCard from "../Cards/SolutionDetailsCard";
import { IoMdClose } from "react-icons/io"
import { useNavigate, useParams } from "react-router";
// background-color: rgb(32, 28, 28,0.2);

const ShowSolution = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {solutionId} = useParams();
  const solutionInfo = useSelector(selectSingleSolutionInfo);

  function alterLikes (){
    dispatch(addLikesToSolutionThunk(solutionId)).then(()=>{
        dispatch(getDetailsOfSolutionThunk(solutionId));
    });
  }

  const  dispatchAll = useCallback(
    async() => {
        const promises = [
        dispatch(getDetailsOfSolutionThunk(solutionId))
        ]
        await Promise.all(promises);
      },
    [dispatch, solutionId],
  )
  

  useEffect(() => {
    if(solutionId){
        dispatchAll();
    }

  }, [solutionId, dispatchAll]);
  return (
    <section className={`w-full p-5 h-screen overflow-y-scroll scrollbar bg-black absolute z-50`}>
      <button
        onClick={()=>navigate(-1)}
        className="group fixed right-5 px-3 py-3 bg-gray-4 bg-opacity-30  rounded-md hover:bg-opacity-50 transition-colors duration-150"
      >
        <IoMdClose className="text-light-1 text-lg group-hover:text-red-600 transition-colors duration-150"/>
      </button>

      {solutionInfo && (
        
        <div className="max-w-5xl  mx-auto bg-black border border-dark-2 p-5 rounded-md ">
        <SolutionDetailsCard detail={solutionInfo} alterLikes={alterLikes}/>
          <MDEditor.Markdown
            source={(solutionInfo && solutionInfo.content) || ""}
            style={{ whiteSpace: "pre-wrap" }}
          />
          <style>{
            `
            .wmde-markdown{
            background-color:#252422;
          }
          .wmde-markdown pre{
            background-color: rgb(108, 117, 125,0.2);
          }
            `
          }
          
          </style>
        </div>
      )}
    </section>
  );
};

export default ShowSolution;
