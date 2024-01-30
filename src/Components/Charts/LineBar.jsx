import React from "react";

const LineBar = ({color, percentage}) => {
  return (
    <div className="mb-4 ">
      <div className="w-full flex justify-between mb-1">
        <span className="block text-light-2 text-xs">Easy</span>{" "}
        <span className="block text-light-2 text-sm">
          <span className="text-light-1 font-semibold">35</span>/50
        </span>{" "}
        <span className="block text-xs text-light-2">
          Beats <span className="text-light-1 font-semibold tracking-wide">92.4%</span>
        </span>
      </div>
      <div className={`"w-full h-2 bg-${color}-500 bg-opacity-20 rounded-full relative "`}>
        <span className={`block w-${percentage} rounded-full h-full bg-${color}-600`}></span>
      </div>
    </div>
  );
};

export default LineBar;
