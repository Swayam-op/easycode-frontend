import React, { useEffect, useState } from "react";

const LineBar = ({color,level, total, solved}) => {
  const [successRate, setSuccessRate] = useState("w-1/12");
  useEffect(()=>{
    //console.log(total, solved, )
    // setSuccessRate("w-" + parseInt(12/total * solved) + "/12")
  },[total])
  return (
    <div className="mb-4 ">
      <div className="w-full flex justify-between mb-1">
        <span className="block text-light-2 text-xs">{level}</span>{" "}
        <span className="block text-light-2 text-sm">
          <span className="text-light-1 font-semibold">{solved}</span>/{total}
        </span>{" "}
        <span className="block text-xs text-light-2">
          Beats <span className="text-light-1 font-semibold tracking-wide">{(solved/total * 100).toFixed(2)}%</span>
        </span>
      </div>
      <div className={`"w-full h-2 bg-${color}-500 bg-opacity-20 rounded-full relative "`}>
        <span style={{width : parseInt(solved/total*100) +"%" }} className={`block rounded-full h-full bg-${color}-600`}></span>
      </div>
    </div>
  );
};

export default LineBar;
