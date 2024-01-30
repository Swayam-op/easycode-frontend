import React,{useEffect, useState} from "react";
import MDEditor from '@uiw/react-md-editor';
import { useDispatch, useSelector } from "react-redux";
import { selectSolutionCode, uploadSolutionThunk } from "../Redux/Reducers/SolutionReducer";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { getDefaultSolutionContent } from "../Api/ProblemsApi";

const WriteSolution = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const solutionCode = useSelector(selectSolutionCode);
    const [text, setText] = useState('');
    const [title, setTitle] = useState("");
    const {id} = useParams();

  
  function uploadSolutionEvent(){
    dispatch(uploadSolutionThunk({
      title,
      questionId : id,
      content : text
    }));
  }
  
  useEffect(()=>{
    setText(getDefaultSolutionContent(solutionCode));
  },[solutionCode])
  return (
    <div className="max-w-6xl mx-auto bg-dark-3 bg-opacity-30 rounded-md mt-2">
      <div className="w-full py-5 px-4 grid gap-2 grid-cols-2">
        <input
        value={title}
          type="text"
          className="bg-transparent block h-10 border-none focus:ring-0 text-light-1 text-xl outline-none"
          placeholder="Write your title"
          onChange = {(event)=>setTitle(event.target.value)}
        />
        <div className="place-self-end text-light-1">
          <button onClick={()=>navigate(-1)} className="px-5 py-2 tracking-wide font-medium shadow-sm hover:bg-opacity-40 transition-colors duration-200 ease-in bg-light-2 bg-opacity-20  rounded-md">
            Cancel
          </button>
          <button onClick={uploadSolutionEvent} className="px-8 ml-5 tracking-wide py-2 font-medium shadow-sm bg-green-500 hover:bg-green-600 transition-colors duration-200 ease-in rounded-md">
            Submit
          </button>
        </div>
      </div>
      <div className="w-full pt-5 ">
      <div className="container">
      <MDEditor
        value={text}
        onChange={setText}
        fullscreen = {false}
        height = {"100vh"}
      />
      <style>
        {`
        .w-md-editor-fullscreen .w-md-editor-content{
            background-color:black;
        }
        .w-md-editor-fullscreen .w-md-editor-toolbar{
            background-color:black;
        }
          .w-md-editor-toolbar{
            background-color: rgb(32, 28, 28,0.2);
          }
          .w-md-editor-toolbar-child{
            background-color: rgb(32, 28, 28,0.2);
          }
          .w-md-editor-preview .wmde-markdown{
            background-color: rgb(32, 28, 28,0.2);
          }
          .w-md-editor-preview .wmde-markdown pre{
            background-color: rgb(108, 117, 125,0.2);
          }
          .w-md-editor{
            background-color: rgb(32, 28, 28,0.2);
            border:none;
          }
          .w-md-editor-show-preview  .w-md-editor-input{
            background-color: rgb(32, 28, 28,0.2);
          }
          .w-md-editor-toolbar-divider{
            background-color:white;
          }
          .w-md-editor-text-pre{
            background-color:white;
          }
          
          .w-md-editor-toolbar li > button:hover,
.w-md-editor-toolbar li > button:focus{
color : #ccc5b9;
}
.w-md-editor-toolbar li > button{
    margin : 0px 3px;
    padding : 10px;
    height : 35px;
}
.w-md-editor-toolbar li{
 
}
        `}
      </style>
      {/* <MDEditor.Markdown source={text} style={{ whiteSpace: 'pre-wrap' }} /> */}
    </div>

        {/* //editor code */}
       
      </div>
    </div>
  );
};

export default WriteSolution;
