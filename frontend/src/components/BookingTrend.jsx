import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getSlotBookingDetails } from '../services/server';

function BookingTrend() {
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);
    const user = useSelector(state => state.user.userDetail);
    const [slots, setSlots] = useState([]);
    useEffect(()=>{
        const fetchDetails = async ()=>{
            const res= await getSlotBookingDetails(user?._id,date);
            const data = await res.json();
            setSlots(data);
        }
        fetchDetails();

    },[date, user]);
    const extractTime = (time) => {
        const curr = new Date(time);
        const transformedTime = curr.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12: true});
        return transformedTime;
    }
  return (
    <div className='w-full h-full flex flex-col px-2 justify-start  gap-2'>
        <div className='w-full py-1 flex justify-between'>
            <h1 className='text-2xl text-gray-700 font-semibold'>Booking Details</h1>
            <div className='w-fit relative'> 
                <input type="date" max={today}  className=" w-48 px-4 py-2  rounded-xl  border border-gray-300   text-gray-700 focus:ring-2 focus:ring-[#5500ff] focus:border-[#5500ff] outline-none transition bg-white cursor-pointer" onChange={(e) => {setDate(e.target.value)}}/>

        
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-[#5500ff]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    >
                    <rect x="3" y="4" width="18" height="18" rx="3" />
                    <path d="M16 2v4" />
                    <path d="M8 2v4" />
                    <path d="M3 10h18" />
                    </svg>
                </div>
            </div>
        </div>


        <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
                <th className="py-3 px-4 text-left">Facility</th>
                <th className="py-3 px-4 text-left">Court</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Seats</th>
                <th className="py-3 px-4 text-left">Amount</th>
            </tr>
            </thead>

            {slots.map(slot => { if(slot.amount !== 0) return(
                <tbody key={slot.time} className="text-sm">
                    <tr className=" hover:bg-gray-50 transition">
                        <td className="py-3 px-4">{slot.facility}</td>
                        <td className="py-3 px-4">
                            <span className="px-3 py-1 bg-[#5500ff] text-white rounded-xl font-medium">{slot.court}</span>
                        </td>
                        <td className="py-3 text-gray-700 px-4">{extractTime(slot.time)}</td>
                        <td className="py-3 text-gray-700 px-4">{slot.seats}</td>
                        <td className="py-3 text-gray-700 px-4">
                            <span className="text-green-600 font-semibold">₹{slot.amount}</span>
                        </td>
                    </tr>
                </tbody>
            )
            else return null;
            })}
        </table>
    </div>
  )
}

export default BookingTrend