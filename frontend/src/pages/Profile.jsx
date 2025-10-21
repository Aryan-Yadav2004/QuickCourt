import React, { useState } from 'react'
import { useSelector } from 'react-redux'
function Profile() {
  const user = useSelector((state) => state.user?.userDetail);
  const [isAllBookingsActive,setIsAllBookingsActive] = useState(true);
  const [isEditProfileActive,setIsEditProfile] = useState(false);
  const [isMyFacilityActive,setMyFacitlityActive] = useState(false);
  return (
    <div className='w-[100vw] h-[100vh] flex'>
      <div className='bg-[#f0ebfa] sm:w-[20vw] h-[100vh] flex flex-col'>
        <div className='w-full h-[35vh] flex flex-col justify-center items-center'>
          <img src={user?.avtar}  alt="profile photo" className='w-[10vh] rounded-full'/>
          <div>{user?.name}</div>
          <div>{user?.phoneNo}</div>
          <div>{user?.email}</div>
        </div>
        <div className={`w-full h-[8vh] flex justify-center items-center text-xl border-t-1 border-b-1 border-t-[#ae85ff] border-b-[#ae85ff] ${isAllBookingsActive ?  "bg-white":"bg-transparent"}`}>All Bookings</div>
        <div className={`w-full h-[8vh] flex justify-center items-center text-xl border-t-1 border-b-1 border-t-[#ae85ff] border-b-[#ae85ff] ${isEditProfileActive ?  "bg-white":"bg-transparent"}`}>Edit Profile</div>
        {user?.role === "facilityOwner" && <div>My Facility</div>}
      </div>
      <div className='sm:w-[75vw] w-full h-[100vh]'></div>
    </div>
  )
}

export default Profile;