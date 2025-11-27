import React, { useEffect, useState } from 'react'
import { getFacilityListing } from '../services/server';
import { useNavigate } from 'react-router-dom';

function FacilityCarousel() {
    const navigate = useNavigate();
    const [facilities,setFacilities] = useState([]);
    useEffect(()=>{
        const fetchFacilities = async () => {
            const res = await getFacilityListing({startsWith: 999, rating: 0},1,8);
            const result = await res.json();
            setFacilities(result);
        }
        fetchFacilities();
    },[])
  return (
    <div className='w-full h-96 flex flex-nowrap overflow-x-scroll items-center gap-8  px-2' style={{ scrollbarWidth: 'none' }}>
        {facilities.map(facility=>(
            <div key={facility._id} className='flex flex-col items-center  h-[90%] w-[20vw] cursor-pointer rounded-2xl hover:shadow-lg'  onClick={()=>navigate(`/facility/${facility._id}`)} >
                <div className='w-full h-[75%]  rounded-2xl overflow-clip'>
                    <img src={facility.profileImg} alt="" className='w-full h-full object-cover'/>
                </div>
                <div className='w-full h-[25%] flex-col'>
                    <div className='w-full h-[%50] py-0.5 flex justify-between items-center'>
                        <p className='text-gray-800 font-semibold'>{facility.name}</p>
                        <div className='items-center py-0.5 px-1 rounded-[7px] flex bg-green-700'>
                            <img src="/star.svg" alt="star"  className='w-3 h-3 object-contain'/>
                            <div className='text-white font-semibold text-[14px]'>{facility.rating}</div>
                        </div>
                    </div>
                    <div className='w-full h-[%50] py-0.5 flex justify-between items-start'>
                        <p className='text-gray-600 text-[14px] max-w-[65%]  font-extralight'>{`${facility.street}, ${facility.city}, ${facility.state}, ${facility.country}`}</p>
                        <p className='text-gray-600 text-[14px]  font-extralight'>starts with ₹{facility.startsWith}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default FacilityCarousel;