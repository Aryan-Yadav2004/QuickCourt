import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createReview, deleteCourt, deleteReview, getCourt } from '../services/server';
import { Star, User, X } from 'lucide-react';
import BasicRating from './BasicRating';
import ErrorAlert from './errorAlert';
import { useSelector } from 'react-redux';
import { Trash2, Edit } from 'lucide-react';
function CourtDetail() {
    const {facilityId,courtId} = useParams(); 
    const [court, setCourt] = useState(null); 
    const [rating, setRating] = useState(1);
    const [error,setError] = useState("");
    const isLoged = useSelector(state => state.user.isLoged);
    const user = useSelector(state => state.user.userDetail);
    const [slotWindow,setSlotWindow] = useState([]);
    const [currDate,setCurrentDate] = useState(null);
    const [timings,setTimings] = useState([]);
    const [slotDetails,setSlotDetails] = useState(null);
    const [seats,setSeats] = useState(1);
    const navigate = useNavigate();
    const setValue = (value) => {
        setRating(value);
    }
    useEffect(()=>{
        const fetchCourt = async ()=>{
            const res = await getCourt(facilityId,courtId);
            const data = await res.json();
            if(res.ok){
                setCourt(data);
                setTimings(data.timeSlots.today);
                console.log(data)
            }
            else{
                setError(data.message);
            }
        }   
        fetchCourt(); 
        const now = new Date(Date.now());
        let slot = Array(3);
        setCurrentDate(now.getDate());
        for(let i = 0; i < 3; i++){
            const currTime = new Date(now.getTime() + i * 24 * 60 * 60* 1000);
            const day = currTime.toLocaleDateString('en-US',{weekday: 'long'}).toLocaleLowerCase();
            const date = currTime.getDate();
            const month = currTime.toLocaleDateString('en-US',{month: 'long'}).toLocaleLowerCase();
            slot[i] = {day: day, date: date, month: month};
        }
        setSlotWindow(slot);
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(slotDetails) return;
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        const {review} = data;
        const res = await createReview(facilityId,courtId,{reviewDescription: review, rating: rating, date: Date.now()});
        const result  =  await res.json();
        if(!res.ok){
            setError(result.message);
        }
        else{
            window.location.reload();
        }
    }
    
    const closeErrorMsg = () => {
        setError("");
    }
    const transformDate = (date) => {
        const newDate = new Date(date);
        const formatted = newDate.toLocaleDateString("en-GB",{
            day: "numeric",
            month: "short",
            year: "numeric"
        });
        return formatted;
    }
    const handleDeleteReview = async(reviewId) => {
        const res = await deleteReview(facilityId,courtId,reviewId);
        const result = await res.json();
        if(!res.ok){
            setError(result.message);
        }
        else{
            window.location.reload();
        }
    }
    const handleDelete = async () => {
        const res = await deleteCourt(facilityId,courtId);
        const result = await res.json();
        if(res.ok){
            navigate(`/facility/${facilityId}`);
        }
        else{
            setError(result.message);
        }
    }
    const handleChangeDate = (date) => {
        setCurrentDate(date);
        const now = new Date(Date.now());
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        if(date === now.getDate()){
            setTimings(court?.timeSlots.today);
        }
        else if(date === tomorrow.getDate()){
            setTimings(court?.timeSlots.tomorrow);
        }
        else{
            setTimings(court?.timeSlots.dayAfter);
        }
    }
    const extractTime = (time) => {
        const curr = new Date(time);
        const transformedTime = curr.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12: true});
        return transformedTime;
    }
    const color = (total, booked) => {
        if (total === booked) return {
            border: "border-gray-500",
            text: "text-gray-500",
            hoverBg: "hover:bg-gray-500"
        };

        const percentage = (booked / total) * 100;

        if (percentage <= 33) return {
            border: "border-[#5500ff]",
            text: "text-[#5500ff]",
            hoverBg: "hover:bg-[#5500ff]"
        };

        if (percentage <= 66) return {
            border: "border-yellow-500",
            text: "text-yellow-500",
            hoverBg: "hover:bg-yellow-500"
        };

        return {
            border: "border-red-500",
            text: "text-red-500",
            hoverBg: "hover:bg-red-500"
        };
    };
    const handleSlotDetail = (slot) => {
        if(court?.seats === slot?.bookings.length) return;
        setSlotDetails(slot);
    }   
    const closeSlotBookingView = () => {
        setSlotDetails(null);
        setSeats(1);
    }
    const handleRange = (e,maxValue) => {
        const val = Number(e.target.value);
        setSeats(val);

        // calculate percentage
        const percent = (val / maxValue) * 100;

        // set CSS var for gradient
        e.target.style.setProperty("--value-percent", percent + "%");
    };
    const handleBooking = () => {
        navigate(`/payment?slot_id=${slotDetails._id}&court_id=${courtId}&seats=${seats}`);
    }
  return (
    <div className={`w-full min-h-screen flex flex-col justify-start items-center relative bg-gray-50 `} >
        <div className='w-full h-[45vh] flex justify-between bg-white '>
            <div className='w-[30%] h-full flex justify-center items-center'>
                <img src={court?.photoLink} alt="" className='w-[80%] h-[80%] rounded-2xl'/>
            </div>
            <div className='w-[70%] h-full flex  justify-center items-center  '>
                <div className='w-full h-[80%] flex flex-col justify-around items-start relative'>
                    <div className={`w-[80%] p-1 flex ${user?._id === court?.owner_id?'justify-between':'justify-start'}`}>
                        <h1 className='font-semibold text-gray-700 text-3xl'>{court?.name}</h1>
                        {(user?._id === court?.owner_id) && 
                        <div className='flex p-1 gap-2'>
                            <Edit size={25} className='text-[#5500ff] hover:text-[#935cff] cursor-pointer' onClick={()=>navigate(`/facility/${court?.facility_id}/court/${court?._id}/edit`)}/>
                            <Trash2 size={25} className='text-red-500 hover:text-red-700 cursor-pointer' onClick={handleDelete}/>
                        </div>
                        }
                    </div>
                    <p className='text-gray-700'><span className='font-semibold'>Location: </span><i>{court?.location}</i></p>
                    <p className='text-gray-700'><span className='font-semibold'>Sport: </span><i>{court?.sport}</i></p>
                    <p className='text-gray-700 max-w-52 p-1]'><span className='font-semibold'>about: </span><i>{court?.about}</i></p>
                    <p className='text-gray-700'><span className='font-semibold'>Price: </span><i>&#8377; {court?.price}</i></p>
                </div>
            </div>
        </div>
        <div className='w-full h-[15vh] flex justify-start items-center bg-white pl-16  gap-4 relative'>
            {slotWindow.map((slot, index)=>(
                <div key={index} className={`w-[5%]  h-[80%] flex flex-col justify-around items-center cursor-pointer  rounded-2xl   ${currDate === slot.date?"bg-[#5500ff] text-white":"text-gray-700"}`} onClick={()=>{if(slotDetails)return; handleChangeDate(slot.date)}}>
                    <div className={` `}>{slot.day.substring(0,3).toUpperCase()}</div>
                    <div className={`font-bold text-2xl`}>{slot.date}</div>
                    <div className={`font-semibold`}>{slot.month.substring(0,3).toUpperCase()}</div>
                </div>
            ))}
            <ul className='w-[15%] list-disc list-inside  h-full border-l-1 border-l-[#5500ff]  flex flex-col px-2 items-start justify-between absolute right-1'>
                <li className='text-[#5500ff]'>Avaiable</li>
                <li className='text-yellow-500'>Filling Fast</li>
                <li className='text-red-500'>Almost Full</li>
                <li className='text-gray-500'>Sold out</li>  
            </ul>
        </div>
        <div className='w-full min-h-[40vh] flex justify-items-start px-16 py-2'>
            <div className='w-[50%] p-1 flex flex-wrap justify-start items-start gap-2'>
                {timings?.map((slot)=>{
                    const c = color(court?.seats,slot?.totalSeatsBooked)
                    return (<div key={slot._id} className={`px-2 py-1 border rounded-lg ${c.border} ${c.text} cursor-pointer bg-white ${c.hoverBg} hover:text-white`} onClick={()=>{if(slotDetails) return; handleSlotDetail(slot)}}>{extractTime(slot?.time)}</div>)
                })}
            </div>
        </div>
        <div className='w-full p-1 flex flex-col justify-start items-center bg-white'>
            <div className='w-full min-h-[50vh] p-5 flex flex-col justify-start items-start gap-4'>
                <h1 className='text-gray-700 text-3xl font-semibold'>Reviews & Ratings</h1>
                <p className='text-gray-700 text-2xl'>{`${court?.rating} (${court?.totalReviews})`} </p>
                <hr  className='text-gray-300 w-full ' />
                {isLoged && 
                <> 
                    <form className='w-full p-1 flex flex-col justify-start items-start gap-4' onSubmit={handleSubmit}>
                        <p className='text-gray-700 font-semibold text-2xl'>Write a Review</p>
                        <p className='text-gray-700 font-semibold'>Your rating</p>
                        <BasicRating setValue={setValue} rating={rating} />
                        <p className='text-gray-700 font-semibold'>Your review</p>
                        <textarea name='review' placeholder="Share your experience with this court..."  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0ebfa] focus:border-transparent outline-none resize-none" rows="4"  required/>
                        <button type='submit' className='px-2 py-1 bg-[#5500ff] rounded-lg text-white cursor-pointer'>Submit review</button>
                    </form>
                    <hr className='text-gray-300 w-full'/>
                </>
                }


                <div className="bg-white rounded-lg  p-6 w-full flex flex-col justify-start  gap-5">
                    {court?.reviews.map((review)=>(
                        <div key={review._id} className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <img src={review.user_id.avtar} alt="profile image" className='rounded-full' />
                            </div>
                            <div className="flex-1 relative">
                                <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h4 className={`font-semibold text-gray-800 ${user?.role === "admin"? "hover:underline cursor-pointer":""}`} onClick={()=> {if(user.role !== "admin") return; navigate(`/user/${review.user_id.username}`)}}>{review.user_id.username}</h4>
                                    <p className="text-sm text-gray-500">{transformDate(review?.date)}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
                                    ★ {review.rating}
                                    </span>
                                </div>
                                {user?.username === review?.user_id.username  && <button className='p-1 absolute bottom-0 right-0 flex items-center cursor-pointer text-red-500 hover:text-red-700' onClick={()=>handleDeleteReview(review?._id)}> <Trash2 size={15} /> <span >Delete</span> </button>}
                                </div>
                                <p className="text-gray-700 mt-3 leading-relaxed">{review.review}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <ErrorAlert error={error} closeMsg={closeErrorMsg} />
        {slotDetails && <div className='w-[25%] h-[50vh] rounded-lg bg-white mx-auto mt-[15%] shadow z-50 absolute '>
            <div className='w-full h-full relative flex flex-col justify-around items-start p-2' style={{backgroundImage: 'url(/ticket.png)',backgroundRepeat: 'no-repeat',backgroundPosition: 'center',backgroundSize: '100%'}}>
                
                <div className='flex w-full p-1 justify-between'> 
                    <h1>Arrival time: </h1>
                    <h1>{extractTime(slotDetails?.time)}</h1>
                </div>
                
                <div className='flex w-full p-1 justify-between'> 
                    <p>Seats Available:</p>
                    <p>{court?.seats - slotDetails?.totalSeatsBooked}</p>
                </div>
                <label className='w-full'>
                    <div className='flex w-full p-1 justify-between'> 
                        <p>Select seats:</p>
                        <p>{seats}</p>
                    </div>
                    
                    <input type="range"  value={seats} onChange={(e)=>handleRange(e,court?.seats - slotDetails?.bookings.length)} min={1} max={court?.seats - slotDetails?.bookings.length} step={1} className="range-line"/>
                </label>
                <div className='flex w-full p-1 justify-between'> 
                    <p>Total price: </p>
                    <p> &#8377; {court?.price * seats}</p>
                </div>
                
                <button className='py-2 px-1 rounded-lg text-white bg-[#5500ff] mx-auto cursor-pointer' onClick={handleBooking}>Book</button>
                <X size={15}  className='absolute text-gray-500 top-1 right-1 cursor-pointer' onClick={closeSlotBookingView}/>
            </div>
        </div>}
    </div>
  )
}

export default CourtDetail;