import React from 'react'
import { useNavigate } from 'react-router-dom';

function CourtCard({court}) {
  const navigate = useNavigate();
  return (
    <div className='w-60 h-80 flex flex-col items-center justify-around rounded-2xl overflow-clip cursor-pointer' onClick={() => navigate(`/facility`)}>
        <div className='w-full h-[50%] '>
            <img src={court?.photoLink} alt="profile photo" className='w-full h-full object-cover object-center ' />
        </div>
        <div className='w-full h-[50%] bg-white relative flex flex-col justify-around items-start p-2'>
            <p><span className='font-medium text-gray-700'>Sport:</span> <i>{court?.sport}</i> </p>
            <p><span className='font-medium text-gray-700'>Price:</span><i> &#8377;{court?.price}</i></p>
            <p className='p-1 max-w-40'><span className='font-medium text-gray-700'>About:</span><i> {court?.about} </i></p>
            <div className='absolute top-2 right-2 items-center py-0.5 px-1 rounded-[7px] flex bg-green-700'>
                <img src="/star.svg" alt="star"  className='w-4 h-4 object-contain'/>
                <div className='text-white font-semibold text-[16px]'>{court?.rating}</div>
            </div>
        </div>
    </div>
  )
}

export default CourtCard;