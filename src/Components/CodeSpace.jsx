import React, { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import Editor from "@monaco-editor/react";
import { HiOutlineCodeBracket } from "react-icons/hi2"; // code icon
import { MdOutlineScience } from "react-icons/md"; // solutions icon
import { BsFillMoonStarsFill } from "react-icons/bs";
import { defineTheme, monacoThemes } from "../Api/CodeEditorTheme";
import { LanguageAPI } from "../Api/LanguagesAPI";
import { VscDebugRerun } from "react-icons/vsc";
import { LiaCloudUploadAltSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestion } from "../Redux/Reducers/QuestionReducer";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  runCodeThunk,
  selectIsLoadingOfCode,
  selectRunCodeLoading,
  selectSubmitCodeLoading,
  submitCodeThunk,
} from "../Redux/Reducers/CodeReducer";
// import LoadingEditor from "./LoadingEditor";
import { selectSolutionCode } from "../Redux/Reducers/SolutionReducer";

const CodeSpace = ({ switchContainer }) => {
  const dispatch = useDispatch();
  const solutionCode = useSelector(selectSolutionCode);
  const isLoadingOfCode = useSelector(selectIsLoadingOfCode);
  const runCodeLoading = useSelector(selectRunCodeLoading);
  const submitCodeLoading = useSelector(selectSubmitCodeLoading);
  const [sourceCode, setSourceCode] = useState("");
  const question = useSelector(selectQuestion);
  const [programmingLanguage, setProgrammingLanguage] = useState(
    LanguageAPI[0]
  );
  const [theme, setTheme] = useState({ value: "spacecadet", label: "SpaceCadet" });




  const changeProgrammingLanguage = (value) => {
    setProgrammingLanguage(() => value);

  };

  const handleEditorChange = (value, language) => {
    setSourceCode(value);
    // onChange("code", value);
  };

  function handleThemeChange(th) {
    const theme = th;
    //console.log("theme...", theme);


    defineTheme(theme.value).then((_) => { setTheme(theme); });

  }

  const handleRunCode = () => {
    if (programmingLanguage && question) {
      const data = {
        language_id: programmingLanguage.id,
        question_id: question._id,
        source_code: sourceCode,
      };
      //console.log("Data to be run ", data);
      dispatch(runCodeThunk(data));
    }
  };

  const handleSubmitCode = () => {
    if (programmingLanguage && question) {
      const data = {
        language_id: programmingLanguage.id,
        question_id: question._id,
        source_code: sourceCode,
      };
      //console.log("Data to be submited ", data);
      dispatch(submitCodeThunk(data));
    }
  };


  useEffect(() => {
    if (theme) {
      defineTheme(theme.value).then((_) => { });
    }
    else {
      defineTheme("spacecadet").then((_) =>
        setTheme({ value: "spacecadet", label: "SpaceCadet" }));
    }




    if (solutionCode && sourceCode === question.recommendedCode) {
      setSourceCode(solutionCode);
    }
    else if (question && !sourceCode) {
      setSourceCode(question.recommendedCode);
    }
  }, [question, solutionCode, theme, sourceCode]);

  return (
    <div className="w-full h-full  flex flex-col ">
      <div className="bg-dark-2 text-sm w-full overflow-x-auto px-3 py-1 flex flex-wrap mb-1 sm:mb-0 justify-start  items-center">
        <div
          className={`text-gray-400 md:pr-4 pr-2 border border-transparent border-r-gray-600 font-medium text-sm md:text-md`}
        >
          <HiOutlineCodeBracket className="inline text-lg text-green-600 mx-1" />{" "}
          Code
        </div>
        <div
          className={`text-gray-400' md:px-4 px-2  border border-transparent border-r-gray-600`}
        >
          <MdOutlineScience className="inline text-blue-800 mx-1 text-lg" />
          <Dropdown
            label="Dropdown button"
            className="bg-white py-2 dark:bg-black"
            dismissOnClick={true}
            renderTrigger={() => (
              <button className="md:px-2 px-1 py-1 text-xs  shadow-lg rounded-md text-light-1 font-medium">
                {programmingLanguage.name}
              </button>
            )}
          >
            {LanguageAPI.map(({ id, name, value }) => {
              return (
                <Dropdown.Item
                  key={id}
                  className="bg-black text-light-1 hover:bg-light-1 dark:focus:bg-light-1 group"
                  onClick={() => changeProgrammingLanguage({ id, name, value })}
                >
                  <span className="group-hover:text-black">{name}</span>
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </div>
        <div
          className={`text-gray-400 px-4 border border-transparent border-r-gray-600 justify-self-end`}
        >
          <BsFillMoonStarsFill className="inline text-yellow-500 mx-1 text-md " />
          <Dropdown
            label="Dropdown button"
            className="bg-black dark:bg-black border-none "
            dismissOnClick={true}
            renderTrigger={() => (
              <button className="px-2 py-1 text-xs  shadow-lg rounded-md text-light-1 font-medium">
                {theme && theme.label}
              </button>
            )}
          >
            {Object.entries(monacoThemes).map(([themeId, themeName]) => {
              return (
                <Dropdown.Item
                  onClick={() =>
                    handleThemeChange({ value: themeId, label: themeName })
                  }
                  key={themeId}
                  value={themeId}
                  className=" text-light-1  hover:bg-light-1 dark:focus:bg-light-1 group"
                >
                  <span className="group-hover:text-black">{themeName}</span>
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        </div>
        <div className="grow flex flex-row items-center mt-2 sm:mt-0 sm:justify-end">
          <button
            onClick={() => {
              handleRunCode();
              switchContainer("testresult");
            }}
            disabled={isLoadingOfCode}
            className="flex items-center py-2 px-6 text-center rounded-md font-semibold text-sm text-light-1 bg-black hover:bg-dark-4 bg-gradient-to-br from-bg-dark-5 to-bg-dark-4 shadow-shadow-inset-2 disabled:cursor-not-allowed"
          >
          {
            runCodeLoading ? <AiOutlineLoading3Quarters className="text-lg text-light-2  animate-spin"/>
            :
            <VscDebugRerun className="text-light-2 text-lg" />
          }
            <span className="block text-sm ml-2"> Run</span>
          </button>
          <button
            onClick={() => {
              handleSubmitCode();
              switchContainer("submissions");
            }}
            disabled={isLoadingOfCode}
            className="flex items-center py-2 px-6 ml-4 text-center rounded-md font-semibold text-sm text-light-1 bg-black hover:bg-dark-4 bg-gradient-to-br from-bg-dark-5 to-bg-dark-4 shadow-shadow-inset-2 disabled:cursor-not-allowed"
          >
            {
              submitCodeLoading? <AiOutlineLoading3Quarters className="text-lg text-green-500  animate-spin"/>
             : <LiaCloudUploadAltSolid className="text-lg text-green-500 " />
             }
            <span className="block text-sm ml-2 text-green-500"> Submit</span>
          </button>
        </div>
      </div>
      <div className="overlay rounded-md grow relative w-full shadow-4xl">
        {/* <div
          className={`${isLoadingOfCode === false ? "hidden" : "block"
            } absolute inset-0 z-40 `}
        >
          <LoadingEditor />
        </div> */}
        <div className="sm:hidden block">
        <Editor
          width={`100%`}
          height={'70vh'}
          language={programmingLanguage.value}
          value={sourceCode}
          theme={theme && theme.value}
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />
        </div>
        
        <div className="hidden sm:block h-full">
        <Editor
          width={`100%`}
          language={programmingLanguage.value}
          value={sourceCode}
          theme={theme && theme.value}
          defaultValue="// some comment"
          onChange={handleEditorChange}
        />
        </div>
      </div>
    </div>
  );
}
export default CodeSpace;
