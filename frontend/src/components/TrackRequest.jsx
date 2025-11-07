import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
function TrackRequest() {
    const requests = useSelector((state) => state.facility.myFacilities);
    const [filteredRequest,setFilteredRequest] = useState(requests);
    const handleFilter = (e) => {
        const filter = e.target.value;
        if(filter === "all"){
            setFilteredRequest(requests);
            return
        }
        setFilteredRequest(requests.filter((req)=>req?.status === filter));
    }
  return (
    <div className='w-full py-2 flex flex-col justify-start items-center bg-gray-100 min-h-screen px-2 rounded-2xl'>
        <div className='w-full py-1  z-50 relative flex justify-end '>
            <select name="filter" id="filter" className='text-right text-gray-700 w-full px-4 py-2 max-w-40 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] relative' onChange={handleFilter}>
                <option  value="all">All</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
            </select>
            <img src="filter.svg" alt="filter" className='w-8 h-8 object-contain absolute right-30 top-2' />
        </div>
        {(!requests)? 
        <>
            <h1 className='text-gray-700 font-medium text-3xl'>No request yet!</h1>
        </>
        :
        <>
            {filteredRequest.map(request => (
                <div key={request?._id} className="flex flex-col sm:flex-row w-full px-1 py-2 bg-white rounded-2xl mb-6">
                    <div className="w-full sm:w-48 md:w-48 flex-shrink-0">
                        <img src={request?.profileImg} alt="Profile" className="w-full h-48 sm:h-full object-cover rounded-lg" />
                    </div>
                    <div className="p-6 flex-1  relative">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{request?.name}</h2>
                        <p>{`${request?.street}, ${request?.city}`}</p>
                        <p>{`${request?.state}, ${request?.country}`}</p>
                        <p>Created At: ${request?.createdAt}</p>
                        {request?.status === "accepted" && <div className={`absolute top-2 right-2 items-center py-1 px-2 rounded-[10px] flex text-green-500`}>Accepted</div>}
                        {request?.status === "pending" && <div className={`absolute top-2 right-2 items-center py-1 px-2 rounded-[10px] flex text-yellow-500`}>Pending</div>}
                        {request?.status === "rejected" && <div className={`absolute top-2 right-2 items-center py-1 px-2 rounded-[10px] flex text-red-500`}>Rejected</div>}
                    </div>
                </div>
            ))}
        </>}
    </div>
  )
}

export default TrackRequest;