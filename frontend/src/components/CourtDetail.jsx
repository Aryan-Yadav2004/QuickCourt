import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCourt } from '../services/server';
import { Star, User } from 'lucide-react';
function CourtDetail() {
    const {facilityId,courtId} = useParams(); 
    const [court, setCourt] = useState(null); 
    useEffect(()=>{
        const fetchCourt = async ()=>{
            const res = await getCourt(facilityId,courtId);
            const data = await res.json();
            if(res.ok){
                setCourt(data);
                console.log(data)
            }
            else{
                console.log(data.message);
            }
        }   
        fetchCourt(); 
    },[]);
  return (
    <div className='w-full min-h-screen flex flex-col justify-start items-center relative bg-gray-50 '>
        <div className='w-full h-[45vh] flex justify-between bg-white border border-t-0 border-r-0 border-l-0 border-b-[#d9c7ff]'>
            <div className='w-[30%] h-full flex justify-center items-center'>
                <img src={court?._doc.photoLink} alt="" className='w-[80%] h-[80%] rounded-2xl' />
            </div>
            <div className='w-[70%] h-full flex  justify-center items-center  '>
                <div className='w-full h-[80%] flex flex-col justify-around items-start relative'>
                    <h1 className='font-semibold text-gray-700 text-3xl'>{court?.name}</h1>
                    <p className='text-gray-700'><span className='font-semibold'>Location: </span><i>{court?.location}</i></p>
                    <p className='text-gray-700'><span className='font-semibold'>Sport: </span><i>{court?._doc.sport}</i></p>
                    <p className='text-gray-700 max-w-52 p-1]'><span className='font-semibold'>about: </span><i>{court?._doc.about}</i></p>
                    <p className='text-gray-700'><span className='font-semibold'>Price: </span><i>&#8377; {court?._doc.price}</i></p>
                    <div className='absolute top-2 right-5 items-center py-0.5 px-1 rounded-[7px] flex bg-green-700'>
                        <img src="/star.svg" alt="star"  className='w-4 h-4 object-contain'/>
                        <div className='text-white font-semibold text-[16px]'>4.5</div>
                    </div>
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
                <p className='text-gray-700 text-2xl'> 4.5 (3K)</p>
                <hr  className='text-gray-300 w-full '/>
                <form className='w-full p-1 flex flex-col justify-start items-start gap-4' >
                    <p className='text-gray-700 font-semibold text-2xl'>Write a Review</p>
                    <p className='text-gray-700 font-semibold'>Your rating</p>
                    <p className='text-gray-700 font-semibold'>Your review</p>
                    <textarea placeholder="Share your experience with this court..."  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f0ebfa] focus:border-transparent outline-none resize-none" rows="4" />
                    <button className='px-2 py-1 bg-[#5500ff] rounded-lg text-white cursor-pointer'>Submit review</button>
                </form>
                <hr  className='text-gray-300 w-full '/>


                <div  className="bg-white rounded-lg shadow-sm p-6 w-full">
                    <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User size={24} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                        <div>
                            <h4 className="font-semibold text-gray-800">Aryan</h4>
                            <p className="text-sm text-gray-500">15 nov 2025</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
                            ★ 5
                            </span>
                        </div>
                        </div>
                        <p className="text-gray-700 mt-3 leading-relaxed">Excellent court facilities! Well maintained and the staff is very professional. Highly recommend for badminton enthusiasts.</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourtDetail;