import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { cancelBooking, getAllBookings } from '../services/server';
import ErrorAlert from './errorAlert';
import SuccessAlert from './successAlert';
function AllBookings() {
    const user = useSelector(state => state.user?.userDetail);
    const [bookings, setBookings] = useState([]);
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
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
    },[user])
    const closeErrorMsg = () => {
      setError("");
    }
    const closeSuccessMsg = () => {
    setSuccess("");
  }
    function isTimeExceed(isoString){
      const target = new Date(isoString);
      const fiveMinutesAfter = new Date(target.getTime() + 20 * 60 * 1000);
      if(isNaN(target)) throw new Error("Invalid date string");
      return Date.now() > fiveMinutesAfter.getTime();
    }
    const handleCancel = async (e, bookingId) => {
      e.stopPropagation();
      if(loading) return;
      setLoading(true);
      const res = await cancelBooking(user?._id,bookingId);
      const data = await res.json();
      if(res.ok){
        setSuccess("successfully cancelled you ticket and amount will be refunded to you soon!");
      }
      else{
        setError(data.message);
      }
      setLoading(false);
    }
    const extractTime = (time) => {
      const curr = new Date(time);
      const transformedTime = curr.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12: true});
      const transformedDate = curr.toLocaleDateString('en-IN');
      return `${transformedTime} ${transformedDate}`;
    }
    const handleBookingClick =  (bookingId) => {
      if(loading) return;
      navigate(`/bookings/${bookingId}`);
    }
  return (
    <div className='bookingsContainer w-full h-full bg-gray-100 flex flex-col justify-start gap-4 items-center p-4 overflow-scroll relative'>
        {(bookings.length > 0)? //
          bookings.map((booking) => (
            <div key={booking._id}  className= {`w-full sm:h-32 gap-4 relative flex p-1 rounded-2xl bg-white ${loading?"cursor-not-allowed":"cursor-pointer"}`} onClick={() => handleBookingClick(booking?._id)}>
              <div className='w-[20%] h-full flex justify-center items-center bg-gray-100 rounded-2xl'>
                <img src={booking?.courtImage} alt="court image" className='w-full h-full object-contain'/>
              </div>
              <div className='w-[75%] h-full relative flex flex-col justify-start items-start px-1 flex-wrap gap-1  rounded-2xl '>
                <p className='font-semibold text-xl text-gray-700'>{booking?.facility}</p>
                <p className='text-gray-700 '>{booking?.court}</p>
                <p className='text-gray-700'><span className='text-gray-400'>Time:</span> {extractTime(booking?.time)}</p>
                <div className='p-0.5 flex gap-2'>
                  <p> <span className='text-gray-400'>Price:</span> {booking?.price}</p>
                  <p><span className='text-gray-400'>Player:</span> {booking?.seats}</p>
                </div>
              </div>
              <p className={`absolute top-1 right-4 ${booking.status === 'booked'?'text-[#5500ff]':''} ${booking.status === 'cancelled'?'text-red-500':''} ${booking.status === 'completed'?'text-green-500':''}`}>{booking.status}</p>
              {(booking?.status === "booked" && !isTimeExceed(booking?.time)) && <p className={`text-red-500 bottom-8 right-4 absolute cursor-pointer hover:underline h-0 ${loading?"cursor-not-allowed":"cursor-pointer"}`} onClick={(e)=>handleCancel(e,booking?._id)}>Cancel</p>}
            </div>
          ))
        : 
        <div className="w-full h-full flex justify-center items-center text-2xl text-center text-[#9a9a9a] font-serif">
            No bookings yet!
        </div> }
        <ErrorAlert error={error} closeMsg={closeErrorMsg} />
        <SuccessAlert success={success} closeMsg={closeSuccessMsg} />
    </div>
  )
}

export default AllBookings;