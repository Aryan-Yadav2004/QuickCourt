import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createReview, deleteCourt, deleteReview, getCourt } from '../services/server';
import { Star, User } from 'lucide-react';
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
            }
            else{
                setError(data.message);
            }
        }   
        fetchCourt(); 
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
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
  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center relative bg-gray-50 '>
        <div className='w-full h-[45vh] flex justify-between bg-white border border-t-0 border-r-0 border-l-0 border-b-[#d9c7ff]'>
            <div className='w-[30%] h-full flex justify-center items-center'>
                <img src={court?._doc.photoLink} alt="" className='w-[80%] h-[80%] rounded-2xl' />
            </div>
            <div className='w-[70%] h-full flex  justify-center items-center  '>
                <div className='w-full h-[80%] flex flex-col justify-around items-start relative'>
                    <div className={`w-[80%] p-1 flex ${user?._id === court?.owner_id?'justify-between':'justify-start'}`}>
                        <h1 className='font-semibold text-gray-700 text-3xl'>{court?.name}</h1>
                        {(user?._id === court?.owner_id) && 
                        <div className='flex p-1 gap-2'>
                            <Edit size={25} className='text-[#5500ff] hover:text-[#935cff] cursor-pointer' onClick={()=>navigate(`/facility/${court?._doc.facility_id}/court/${court?._doc._id}/edit`)}/>
                            <Trash2 size={25} className='text-red-500 hover:text-red-700 cursor-pointer' onClick={handleDelete}/>
                        </div>
                        }
                    </div>
                    <p className='text-gray-700'><span className='font-semibold'>Location: </span><i>{court?.location}</i></p>
                    <p className='text-gray-700'><span className='font-semibold'>Sport: </span><i>{court?._doc.sport}</i></p>
                    <p className='text-gray-700 max-w-52 p-1]'><span className='font-semibold'>about: </span><i>{court?._doc.about}</i></p>
                    <p className='text-gray-700'><span className='font-semibold'>Price: </span><i>&#8377; {court?._doc.price}</i></p>
                </div>
            </div>
        </div>
        <div className='w-full h-[15vh] flex justify-start items-center bg-white pl-16 shadow-2xs shadow-[#5500ff]'>
            <div className={`w-[5%]  h-[80%] flex flex-col justify-around items-center bg-[#5500ff] rounded-2xl cursor-pointer  `}>
                <div className={`text-white `}>SAT</div>
                <div className={`text-white font-bold text-2xl`}>13</div>
                <div className={`text-white font-semibold`}>NOV</div>
            </div>
            <div className={`w-[5%]  h-[80%] flex flex-col justify-around items-center `}>
                <div className={``}>SAT</div>
                <div className={`font-bold text-2xl`}>13</div>
                <div className={`font-semibold`}>NOV</div>
            </div>
            <div className={`w-[5%]  h-[80%] flex flex-col justify-around items-center `}>
                <div className={``}>SAT</div>
                <div className={`font-bold text-2xl`}>13</div>
                <div className={`font-semibold`}>NOV</div>
            </div>
            <div className={`w-[5%]  h-[80%] flex flex-col justify-around items-center `}>
                <div className={``}>SAT</div>
                <div className={`font-bold text-2xl`}>13</div>
                <div className={`font-semibold`}>NOV</div>
            </div>
        </div>
        <div className='w-full min-h-[40vh] flex justify-items-start px-16 py-2'>
            <div className='w-[50%] p-1 flex flex-wrap justify-start items-start gap-2'>
                <div className='px-2 py-1 rounded-lg border border-[#5500ff] text-[#5500ff] cursor-pointer hover:bg-[#5500ff] hover:text-white hover:border-[#5500ff]'>04:45 PM</div>
                <div className='px-2 py-1 rounded-lg border border-yellow-500 text-yellow-500 cursor-pointer hover:bg-[#5500ff] hover:text-white hover:border-[#5500ff]'>04:45 PM</div>
                <div className='px-2 py-1 rounded-lg border border-red-500 text-red-500 cursor-pointer hover:bg-[#5500ff] hover:text-white hover:border-[#5500ff]'>04:45 PM</div>
            </div>
        </div>
        <div className='w-full p-1 flex flex-col justify-start items-center bg-white'>
            <div className='w-full min-h-[50vh] p-5 flex flex-col justify-start items-start gap-4'>
                <h1 className='text-gray-700 text-3xl font-semibold'>Reviews & Ratings</h1>
                <p className='text-gray-700 text-2xl'>{`${court?._doc.rating} (${court?._doc.totalReviews})`} </p>
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
                    <hr  className='text-gray-300 w-full '/>
                </>
                }


                <div  className="bg-white rounded-lg  p-6 w-full flex flex-col justify-start  gap-5">
                    {court?._doc.reviews.map((review)=>(
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
    </div>
  )
}

export default CourtDetail;