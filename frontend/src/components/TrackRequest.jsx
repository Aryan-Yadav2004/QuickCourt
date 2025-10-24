import React, { useState } from 'react'

function TrackRequest() {
    const [filter,setFilter] = useState("all");
    const handleFilter = (e) => {
        setFilter(e.target.value);
    }
  return (
    <div className='w-full py-2 flex flex-col justify-start items-center'>
        <div className='w-full py-1  z-50 relative flex justify-end '>
            <select name="filter" id="filter" className='text-right text-gray-700 w-full px-4 py-2 max-w-40 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] relative' onChange={handleFilter}>
                <option  value="all">All</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
            </select>
            <img src="filter.svg" alt="filter" className='w-8 h-8 object-contain absolute right-30 top-2' />
        </div>
        
    </div>
  )
}

export default TrackRequest;