import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AllBookings from '../components/AllBookings';
import EditProfile from '../components/EditProfile';
function Profile() {
  const user = useSelector((state) => state.user?.userDetail);
  const [isAllBookingsActive,setIsAllBookingsActive] = useState(true);
  const [isEditProfileActive,setIsEditProfileActive] = useState(false);
  const [isMyFacilityActive,setMyFacitlityActive] = useState(false);

  const handleAllBookings = () => {
    setIsAllBookingsActive(true);
    setIsEditProfileActive(false);
    setMyFacitlityActive(false);
  }
  const handleEditProfile = () => {
    setIsAllBookingsActive(false);
    setIsEditProfileActive(true);
    setMyFacitlityActive(false);
  }
  const handleMyFacility = () => {
    setIsAllBookingsActive(false);
    setIsEditProfileActive(false);
    setMyFacitlityActive(true);
  }
  return (
    <div className='w-[100%] min-h-screen flex'>
      <div className='bg-[#f7f7fc] sm:w-[20%] min-h-screen flex flex-col'>
        <div className='w-full h-[35vh] flex flex-col justify-center items-center'>
          <img src={user?.avtar}  alt="profile photo" className='w-[10vh] rounded-full'/>
          <div>{user?.name}</div>
          <div>{user?.phoneNo}</div>
          <div>{user?.email}</div>
        </div>
        <div className={`w-full h-[8vh] flex justify-center items-center text-xl border-t-1 border-b-1 border-t-[#ae85ff] border-b-[#ae85ff] cursor-pointer ${isAllBookingsActive ?  "bg-white":"bg-transparent"}`} onClick={handleAllBookings}>All Bookings</div>
        <div className={`w-full h-[8vh] flex justify-center items-center text-xl border-t-1 border-b-1 border-t-[#ae85ff] border-b-[#ae85ff] cursor-pointer ${isEditProfileActive ?  "bg-white":"bg-transparent"}`} onClick={handleEditProfile}>Edit Profile</div>
        {user?.role === "facilityOwner" && <div className={`w-full h-[8vh] flex justify-center items-center text-xl border-t-1 border-b-1 border-t-[#ae85ff] border-b-[#ae85ff] cursor-pointer ${isMyFacilityActive ?  "bg-white":"bg-transparent"}`} onClick={handleMyFacility}>My Facility</div>}
      </div>
      <div className='sm:w-[80%] w-full  h-[100vh]'>
        {isAllBookingsActive && <AllBookings/>}
        {isEditProfileActive && <EditProfile/>}
      </div>
    </div>
  )
}

export default Profile;