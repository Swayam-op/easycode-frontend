import React, { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { BsClockHistory } from "react-icons/bs";
import { FaHandsClapping } from "react-icons/fa6";
import { MdOutlineMemory } from "react-icons/md";
import { GoCopy } from "react-icons/go";
import ClipboardJS from "clipboard";
import { useSelector } from "react-redux";
import {
  selectIsLoadingOfCode,
  selectSubmitCodeResult,
} from "../Redux/Reducers/CodeReducer";
import TestResultSkeleton from "./TestResultSkeleton";

const SubmissionContainer = () => {
  const submitResult = useSelector(selectSubmitCodeResult);
  const isLoadingOfCode = useSelector(selectIsLoadingOfCode);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState({});
  const copyCodeRef = useRef(null);
  const [copyButtonColor, setCopyButtonColor] = useState("text-gray-400");
  const [resultColor, setResultColor] = useState("green-500");
  useEffect(() => {
    if (submitResult) {
      const {
        compile_output,
        error_message,
        expectedOutputToDisplay,
        hiddenTestCasesToDisplay,
        memory,
        outputToDisplay,
        runTime_message,
        source_code,
        submitedAtTime,
        time_taken,
      } = submitResult.data;
      console.log("submit result ", submitResult);
      setData({
        expectedOutputToDisplay,
        hiddenTestCasesToDisplay,
        memory,
        outputToDisplay,
        source_code,
        submitedAtTime,
        time_taken,
      });
      if(compile_output || error_message || runTime_message){
        console.log("ame st karuchiu error")
        setErrorMessage({
          compile_output,
          error_message,
          runTime_message,
        });
      }
      
      if (submitResult.message !== "Accepted") {
        setResultColor("red-500");
        console.log(submitResult.message);
      }
      else{
        setResultColor("green-500");
      }
    }
  }, [submitResult]);

  const handleCopy = () => {
    const clipboard = new ClipboardJS(".copy-btn", {
      target: () => copyCodeRef.current,
    });

    clipboard.on("success", (e) => {
      console.log("Copied to clipboard");
      e.clearSelection();
      clipboard.destroy();
      setCopyButtonColor("text-green-500");
    });

    clipboard.on("error", (e) => {
      console.error("Unable to copy to clipboard", e);
      clipboard.destroy();
      setCopyButtonColor("text-red-500");
    });

    clipboard.onClick({ currentTarget: document.querySelector(".copy-btn") });
  };

  return (
    <>
      <div className="w-full">
        {isLoadingOfCode && isLoadingOfCode === true ? (
          <div className="w-full p-4">
            <TestResultSkeleton />
          </div>
        ) : (
          <>
            {submitResult && (
              <>
                <div className="w-full flex md:flex-row flex-col mb-4 ">
                  <div className="basis-3/5">
                    <h1 className="text-xl font-medium tracking-wide">
                      <span className={`text-${resultColor}`}>
                        {submitResult.message}
                      </span>
                    </h1>
                    <div>
                      <img
                        className="w-4 h-4 mr-1 rounded-full inline"
                        src="/logo192.png"
                        alt=""
                      />
                      <h3 className="inline text-sm text-gray-4">
                        <span className=" text-light-1">
                          swayam prakash sahoo
                        </span>{" "}
                        submitted at {data.submitedAtTime}{" "}
                      </h3>
                    </div>
                  </div>
                  <div className="grow py-2">
                    <button className="px-5 py-1.5 float-right text-sm bg-green-500 rounded-md shadow-md cursor-pointer hover:bg-green-600 font-medium tracking-wide">
                      <CiEdit className="inline mr-3 text-lg font-medium text-light-1" />
                      Solution
                    </button>
                  </div>
                </div>

                <div className="border rounded-md border-dark-2 p-3 mb-3">
                  {errorMessage? (
                    <>
                    dfdf
                      {errorMessage.compile_output && (
                        <div className="mb-2 bg-rose-500 bg-opacity-10 w-full p-4 text-red-600 rounded-md">
                          {errorMessage.compile_output}
                        </div>
                      )}

                      {errorMessage.runTime_message && (
                        <div className="mb-2 bg-rose-500 bg-opacity-10 w-full p-4 text-red-600 rounded-md">
                          {errorMessage.runTime_message}
                        </div>
                      )}
                      {errorMessage.error_message && (
                        <div className="mb-2 bg-rose-500 bg-opacity-10 w-full p-4 text-red-600 rounded-md">
                          {errorMessage.error_message}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="w-full p-3 mb-4 bg-dark-2 rounded-md">
                        <div className="flex items-center">
                          <BsClockHistory className="text-light-3 inline" />{" "}
                          <span className="text-light-3 ml-2 tracking-wider ">
                            Runtime
                          </span>
                        </div>

                        <h1 className={`${resultColor === "red-500" ? "text-red-500" : "text-light-1"} text-lg font-medium mt-2`}>
                          {data.time_taken}{" "}
                          <span className="text-sm text-gray-4 font-normal">
                            ms
                          </span>{" "}
                        </h1>
                        <div>
                          <FaHandsClapping className="text-green-500 text-sm inline mr-2" />
                          <h3 className="text-xs text-gray-4 inline">
                            <span className="text-light-3">Beats</span>{" "}
                            <span className="text-xs text-green-500">
                              61.51%
                            </span>{" "}
                            of users with C++
                          </h3>
                        </div>
                      </div>

                      <div className="w-full p-3  rounded-md">
                        <div className="flex items-center">
                          <MdOutlineMemory className="text-light-3 inline" />{" "}
                          <span className="text-light-3 ml-2 tracking-wider ">
                            Memory
                          </span>
                        </div>

                        <h1 className={`${resultColor === "red-500" ? "text-red-500" : "text-light-1"} text-lg font-medium mt-2`}>
                          {data.memory}{" "}
                          <span className="text-sm text-gray-4 font-normal">
                            MB
                          </span>{" "}
                        </h1>
                        <div>
                          <FaHandsClapping className="text-green-500 text-sm inline mr-2" />
                          <h3 className="text-xs text-gray-4 inline">
                            <span className="text-light-3">Beats</span>{" "}
                            <span className="text-xs text-green-500">
                              61.51%
                            </span>{" "}
                            of users with C++
                          </h3>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="w-full border rounded-md border-dark-2 p-3">
                  <div className="flex justify-between mb-1">
                    <h1>C++</h1>
                    <button
                      onClick={handleCopy}
                      className={`copy-btn ${copyButtonColor}  hover:text-light-1`}
                    >
                      <GoCopy />
                    </button>
                  </div>
                  <div
                    className="w-full whitespace-pre-wrap  bg-dark-2 p-2 rounded-md"
                    ref={copyCodeRef}
                  >
                    {data.source_code}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SubmissionContainer;
