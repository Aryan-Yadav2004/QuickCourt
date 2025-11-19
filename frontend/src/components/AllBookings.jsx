import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "../App.css"
import { getAllBookings } from '../services/server';
import ErrorAlert from './errorAlert';
function AllBookings() {
    const user = useSelector(state => state.user?.userDetail);
    const [bookings, setBookings] = useState([]);
    const [error,setError] = useState("");
    useEffect(()=>{
      const fetchBookings = async () => {
        if(!user) return;
        const res = await getAllBookings(user?._id);
        const result = await res.json();
        if(res.ok) setBookings(result);
        else{
          setError(result.message);
        }
      }
      fetchBookings();
    },[])
    const closeErrorMsg = () => {
      setError("");
    }
    function isTimeExceed(isoString){
      const target = new Date(isoString);
      const fiveMinutesAfter = new Date(target.getTime() + 5 * 60 * 1000);
      if(isNaN(target)) throw new Error("Invalid date string");
      return Date.now() > fiveMinutesAfter.getTime();
    }
    const handleCancel = () => {

    }
    const extractTime = (time) => {
      const curr = new Date(time);
      const transformedTime = curr.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12: true});
      const transformedDate = curr.toLocaleDateString('en-IN');
      return `${transformedTime} ${transformedDate}`;
    }
  return (
    <div className='bookingsContainer w-full h-full bg-gray-100 flex flex-col justify-start gap-4 items-center p-4 overflow-scroll relative'>
        {(bookings.length > 0)? //
          bookings.map((booking) => (
            <div className='w-full sm:h-42 relative flex p-1 rounded-2xl bg-white'>
              <img   src={booking?.courtImage} className='w-[25%] h-full' alt="court image" />
              <div className='w-[75%] h-full relative flex flex-col justify-start items-start px-1 flex-wrap gap-1 font-serif rounded-2xl '>
                <p className='font-semibold text-xl'>{booking?.facility}</p>
                <p>{booking?.court}</p>
                <p>{`${booking?.street}, ${booking?.city}`}</p>
                <p>{`${booking?.state}, ${booking?.city}`}</p>
                <p>time: {extractTime(booking?.time)}</p>
                <p>{booking?.price}</p>
                <p>Player : {booking?.seats}</p>
                <p>{booking?.status}</p>
              </div>
              <p className='text-red-500 top-0 right-0 cursor-pointer hover:underline h-0' onClick={handleCancel}>Cancel</p>
            </div>
          ))
        : 
        <div className="w-full h-full flex justify-center items-center text-2xl text-center text-[#9a9a9a] font-serif">
            No bookings yet!
        </div> }
        <ErrorAlert error={error} closeMsg={closeErrorMsg} />
    </div>
  )
}

export default AllBookings;