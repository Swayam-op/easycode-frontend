import React, { useEffect, useState } from "react";
import {
  selectIsLoadingOfCode,
  selectRunCodeResult,
} from "../Redux/Reducers/CodeReducer";
import { useSelector } from "react-redux";
import CodeEditorLoading from "./CodeEditorLoading";
import TestResultSkeleton from "./TestResultSkeleton";

const TestResultContainer = () => {
  const testResult = useSelector(selectRunCodeResult);
  const isLoadingOfCode = useSelector(selectIsLoadingOfCode);
  const [testCases, setTestCases] = useState([]);
  const [outputResults, setOutputResults] = useState([]);
  const [expectedOutputResults, setExpectedOutputResult] = useState([]);
  const [timeTaken, setTimeTaken] = useState(0);
  const [errorMessage, setErrorMessage] = useState({});
  const [index, setIndex] = useState(0);
  const [resultColor, setResultColor] = useState("green-500");

  useEffect(() => {
    if (testResult) {
      setTestCases(testResult.data.testCasesToDisplay);
      setOutputResults(testResult.data.outputToDisplay);
      setExpectedOutputResult(testResult.data.expectedOutputToDisplay);
      setTimeTaken(testResult.data.time_taken || 0);
      setErrorMessage({
        compile_output: testResult.data.compile_output,
        error_message: testResult.data.error_message,
        runTime_message: testResult.data.runTime_message,
      });
      if(testResult.message !== "Accepted"){
        setResultColor("red-500")
      }
      console.log("Test Result is ", testResult);
    }
  }, [testResult]);

  function alterTestCase(ind) {
    if (testCases && ind < testCases.length) setIndex(ind);
  }

  return (
    <div className="w-full ">
      {isLoadingOfCode && isLoadingOfCode === true ? (
        <div className="w-full p-4">
          <TestResultSkeleton />
        </div>
      ) : (
        <>
          <div className="flex mb-2 w-full items-center">
            <h1 className="text-xl font-medium tracking-wide">
              {testResult && (
                <span
                  className={`text-${resultColor}`}
                >
                  {testResult.message}
                </span>
              )}
            </h1>
            <h3 className="text-gray-400 text-sm tracking-wide ml-4">
              Runtime {timeTaken} ms
            </h3>
          </div>

          <div className="w-full">
            <div className="w-full flex py-3">
              {testCases &&
                testCases.map((testCase, ind) => {
                  return (
                    <button
                      key={ind}
                      onClick={() => alterTestCase(ind)}
                      className={`${
                        index === ind
                          ? "bg-light-3 text-dark-2"
                          : "bg-dark-2 text-light-3"
                      } border border-black rounded-lg px-4 py-1.5 mx-2 tracking-wider hover:text-black hover:bg-light-3`}
                    >
                      {" "}
                      <span
                        className={`text-${resultColor} rounded-full mr-1 -translate-y-1/2 w-1 h-1 inline-block`}
                      ></span>{" "}
                      Case-{ind + 1}
                    </button>
                  );
                })}
            </div>
            {errorMessage && (
              <>
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
            )}

            <div className="mb-2">
              <h1 className="text-light-3 tracking-wide mb-2">Input: </h1>
              <div className="w-full bg-dark-2 py-4 px-3 rounded-md ">
                {testCases[index]}
              </div>
            </div>
            <div className="mb-2">
              <h1 className="text-light-3 tracking-wide mb-2">Output: </h1>
              <div className="w-full bg-dark-2 py-4 px-3 rounded-md ">
                {outputResults[index] || "null"}{" "}
              </div>
            </div>
            <div>
              <h1 className="text-light-3 tracking-wide mb-2">Expected: </h1>
              <div className="w-full bg-dark-2 py-4 px-3 rounded-md ">
                {expectedOutputResults[index]}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TestResultContainer;
