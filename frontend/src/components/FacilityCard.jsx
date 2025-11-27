import React from 'react'
import { useNavigate } from 'react-router-dom'

function FacilityCard({facility}) {
    const navigate = useNavigate();
  return (
    <div className='w-[75%] h-38 flex relative hover:shadow-lg cursor-pointer rounded-2xl' onClick={()=>navigate(`/facility/${facility._id}`)}>
        <div className='w-[25%] h-full bg-gray-100 overflow-clip rounded-2xl'>
            <img src={facility.profileImg} alt="" className='w-full h-full border-0 object-cover'/>
        </div>
        <div className='w-[75%] h-full px-4 flex flex-col justify-start gap-2'>
            <div className='text-gray-700 font-semibold text-2xl'>{facility.name}</div>
            <div className='w-full py-1 flex'>
                <div className='w-6 h-6'>
                    <img src='location.svg' alt="map pin" className='h-full w-full object-contain'/>
                </div>
                <div className='text-gray-700'>{`${facility.street}, ${facility.city} , ${facility.state}, ${facility.country}`}</div>
            </div>
            <div className='p-1 max-w-76 gap-1 flex flex-wrap'>
                {facility.sports.map((sport)=>(
                    <div  className='px-1.5 py-0.5 rounded-l-full rounded-r-full text-[12px] bg-[#5500ff] text-white'>{sport}</div>
                ))}
            </div>
            <div className='text-gray-700'>starts with: ₹ {facility.startsWith} </div>
            <div className='absolute top-2 right-2 items-center py-0.5 px-1 rounded-[7px] flex bg-green-700'>
                <img src="/star.svg" alt="star"  className='w-4 h-4 object-contain'/>
                <div className='text-white font-semibold text-[16px]'>{facility.rating}</div>
            </div>
        </div>
    </div>
  )
}

export default FacilityCard