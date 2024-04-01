import React from 'react'

const SolutionListContainer = ({lists}) => {
  return (
    
      <div className="w-full py-2 text-light-1 tracking-wide text-sm font-semibold">
                {lists &&
                  lists.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`w-full rounded-md ${
                          index % 2 ? "" : "bg-light-2 bg-opacity-10"
                        }  grid grid-cols-4 py-4 px-4 cursor-pointer transition-colors duration-200 ease-in hover:bg-dark-3/20`}
                      >
                        <h4 className="col-span-2">
                          {item.questionName}
                        </h4>
                        <h4 className='text-center'>
                          {item.title}
                        </h4>
                        <span className="text-xs text-right">{new Date(item.createdAt).toLocaleString()}</span>
                      </div>
                    );
                  })}
              </div>
 
  )
}

export default SolutionListContainer