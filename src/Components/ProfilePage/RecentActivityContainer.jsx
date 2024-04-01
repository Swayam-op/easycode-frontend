import React from 'react'

const RecentActivityContainer = ({lists}) => {
    return (
        <div className="w-full py-2 text-light-1 tracking-wide text-sm font-semibold">
            {lists &&
                lists.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={`w-full rounded-md ${index % 2 ? "" : "bg-light-2 bg-opacity-10"
                                }  grid grid-cols-4 py-4 px-4 cursor-pointer`}
                        >
                            <h1 className="col-span-2">
                                {item.questionName}
                            </h1>
                            <h4 className='text-center'>
                                {item.status}
                            </h4>
                            <h4 className="text-xs text-right">{new Date(item.createdAt).toLocaleString()}</h4>
                        </div>
                    );
                })}
        </div>
    )
}

export default RecentActivityContainer