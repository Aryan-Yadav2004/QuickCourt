import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import FacilityCard from './FacilityCard';
import CreateFacility from './CreateFacility';
import TrackRequest from './TrackRequest';
import { setMyFacilities } from '../features/facility/facilitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { readAllFacilities } from '../services/server';
function MyFacility() {
    const [facilities,setFacilities] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
      const fetchFacilities = async () => {
        const res = await readAllFacilities();
        if(!res.ok) return;
        const newfacilities = await res.json();
        dispatch(setMyFacilities(newfacilities));
        setFacilities(newfacilities.filter((f)=> f?.status === "accepted"));
      }
      fetchFacilities();
    },[]);
    
    const [isKPIsActive,setIsKPIsActive] = useState(true);
    const [isCreateNewFacilityActive,setCreateNewFacilityActive] = useState(false);
    const [isRequestHistoryActive,setIsRequestHistoryActive] = useState(false);
    const [isBookingsOverviewActive,setIsBookingsOverviewActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const handleGroupBtn = () => {
      setIsOpen(!isOpen);
    }
    const handleCreateNewFacility = () => {
      setCreateNewFacilityActive(true);
      setIsRequestHistoryActive(false);
      setIsBookingsOverviewActive(false);
      setIsKPIsActive(false);
    }
    const handleRequestHistory = () => {
      setCreateNewFacilityActive(false);
      setIsRequestHistoryActive(true);
      setIsBookingsOverviewActive(false);
      setIsKPIsActive(false);
    }
    const handleBookingOverview = () => {
      setCreateNewFacilityActive(false);
      setIsRequestHistoryActive(false);
      setIsBookingsOverviewActive(true);
      setIsKPIsActive(false);
    }
    const handleKPIsPage = ( ) => {
      setCreateNewFacilityActive(false);
      setIsRequestHistoryActive(false);
      setIsBookingsOverviewActive(false);
      setIsKPIsActive(true);
    }
  return (
      <div className='w-full h-full p-4 relative facilityContainer overflow-scroll bg-gray-50'>
        {/* Floating Button Group */}
        <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2'>

          {/* Buttons with Transition */}
          <div className={`flex flex-col items-end gap-2 transition-all duration-500 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
            <button className='bg-violet-400 py-2 px-3 rounded-2xl cursor-pointer hover:bg-violet-500 text-white font-bold shadow-md' onClick={handleCreateNewFacility}>Create</button>
            <button className='bg-violet-400 py-2 px-3 rounded-2xl cursor-pointer hover:bg-violet-500 text-white font-bold shadow-md' onClick={handleRequestHistory}>Track Request</button>
            <button className='bg-violet-400 py-2 px-3 rounded-2xl cursor-pointer hover:bg-violet-500 text-white font-bold shadow-md' onClick={handleBookingOverview}>Bookings</button>
            <button className='bg-violet-400 py-2 px-3 rounded-2xl cursor-pointer hover:bg-violet-500 text-white font-bold shadow-md' onClick={handleKPIsPage}>Dashboard</button>
          </div>

          {/* Main + Button */}
          <button
            onClick={handleGroupBtn}
            className={`sm:w-12 sm:h-12 flex justify-center items-center rounded-full outline-none text-center bg-violet-400 hover:bg-violet-500 font-serif text-white text-3xl cursor-pointer transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
          >
            +
          </button>

        </div>

        {/* Page Content */}
        {isKPIsActive && 
          <>
            <div className='w-full h-90 border bg-white'>KPIs area</div>
            <div className='flex flex-col justify-start gap-6 min-h-[50vh] items-center w-full py-4 '>
              <h1 className='text-center font-bold text-2xl'>My Facilities</h1>
              {(facilities.length === 0 ? <div className='w-full h-full flex justify-center items-center text-2xl text-gray-600'>No facility yet!</div>:
              facilities.map((facility)=> (
                <FacilityCard key={facility?._id} facility={facility}/>
              )))}
            </div>
          </>
        }
        {isCreateNewFacilityActive && <CreateFacility/>}
        {isRequestHistoryActive && <TrackRequest/>}
      </div>
  )
}

export default  MyFacility;