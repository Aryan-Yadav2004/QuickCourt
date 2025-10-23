import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import FacilityCard from './FacilityCard';
import GroupBtns from './GroupBtns';
function MyFacility() {
    const navigate = useNavigate();
    const [isKPIsActive,setIsKPIsActive] = useState(true);
    const [isNewFacilityActive,setNewFacilityActive] = useState(false);
    const [isRequestHistoryActive,setIsRequestHistoryActive] = useState(false);
    const [isBookingsOverviewActive,setIsBookingsOverviewActive] = useState(false);
    
  return (
    <div className='w-full h-full p-4  relative facilityContainer overflow-scroll'>
        <button 
            id="mainBtn"
            className={`main-btn sm:w-10 sm:h-10   rounded-full active:none outline:none text-center bg-violet-400 hover:bg-violet-500 font-serif text-white text-2xl cursor-pointer sticky top-3 left-[97%] z-50`}
            
        >+</button>
        <div className='w-full h-90 border'>KPIs area</div>
        <div className='flex flex-col  justify-start gap-6 items-center w-full py-4 '>
            <h1 className='text-center font-bold text-2xl'>My Facilities</h1>
             
        </div>
    </div>
  )
}

export default  MyFacility;