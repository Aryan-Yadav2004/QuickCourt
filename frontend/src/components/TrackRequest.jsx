import React, { useEffect, useState } from 'react'
import { readAllFacilities } from '../services/server';

function TrackRequest() {
    const [requests,setRequests] = useState([]);
    const [filteredRequest,setFilteredRequest] = useState(requests);
    
    const handleFilter = (e) => {
        const filter = e.target.value;
        setFilteredRequest(requests.filter((req)=>req.status === filter));
    }
    useEffect(()=> {
        const fetchRequest = async () => {
            const facilities = await readAllFacilities();
            console.log(facilities);
        }
        fetchRequest();
    },[])
  return (
    <div className='w-full py-2 flex flex-col justify-start items-center bg-gray-100'>
        <div className='w-full py-1  z-50 relative flex justify-end '>
            <select name="filter" id="filter" className='text-right text-gray-700 w-full px-4 py-2 max-w-40 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] relative' onChange={handleFilter}>
                <option  value="all">All</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
            </select>
            <img src="filter.svg" alt="filter" className='w-8 h-8 object-contain absolute right-30 top-2' />
        </div>
        {(requests.length !== 0)? 
        <>
            <h1 className='text-gray-700 font-medium text-3xl'>No request yet!</h1>
        </>
        :
        <>
            <div className="flex flex-col sm:flex-row w-full mb-6">
                <div className="w-full sm:w-48 md:w-48 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop" alt="Profile" className="w-full h-48 sm:h-full object-cover rounded-lg" />
                </div>
                <div className="p-6 flex-1  relative">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Media Object Title</h2>
                    <p>Devri khurd, Bilaspur</p>
                    <p>Chhattisgarh, India</p>
                    <p>Created At: 12/12/2012</p>
                    {"facility.status" === "accepted" && <div className={`absolute top-2 right-2 items-center py-1 px-2 rounded-[10px] flex text-green-500`}>Accepted</div>}
                    {"pending" === "pending" && <div className={`absolute top-2 right-2 items-center py-1 px-2 rounded-[10px] flex text-yellow-500`}>Pending</div>}
                    {"facility.status" === "rejected" && <div className={`absolute top-2 right-2 items-center py-1 px-2 rounded-[10px] flex text-red-500`}>Rejected</div>}
                </div>
            </div>
        </>}
    </div>
  )
}

export default TrackRequest;