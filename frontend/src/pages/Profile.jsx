import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AllBookings from '../components/AllBookings';
import EditProfile from '../components/EditProfile';
import MyFacility from '../components/MyFacility';
import AdminPanel from '../components/AdminPanel';
function Profile() {
  const user = useSelector((state) => state.user?.userDetail);
  const [isAllBookingsActive,setIsAllBookingsActive] = useState(true);
  const [isEditProfileActive,setIsEditProfileActive] = useState(false);
  const [isMyFacilityActive,setMyFacitlityActive] = useState(false);
  const [isAdminPanelActive,setIsAdminPanelActive] = useState(false);

  const handleAllBookings = () => {
    setIsAllBookingsActive(true);
    setIsEditProfileActive(false);
    setMyFacitlityActive(false);
    setIsAdminPanelActive(false);
  }
  const handleEditProfile = () => {
    setIsAllBookingsActive(false);
    setIsEditProfileActive(true);
    setMyFacitlityActive(false);
    setIsAdminPanelActive(false);
  }
  const handleMyFacility = () => {
    setIsAllBookingsActive(false);
    setIsEditProfileActive(false);
    setMyFacitlityActive(true);
    setIsAdminPanelActive(false);
  }
  const handleAdminPanel = () => {
    setIsAdminPanelActive(true);
    setIsAllBookingsActive(false);
    setIsEditProfileActive(false);
    setMyFacitlityActive(false);
  }
  return (
    <div className='w-[100%] min-h-screen flex'>
      <div className='bg-[#f7f7fc] sm:w-[20%] min-h-screen flex flex-col'>
        <div className='w-full h-[35vh] flex flex-col justify-center items-center  '>
          <img src={user?.avtar}  alt="profile photo" className='w-[10vh] rounded-full'/>
          <div>{user?.name}</div>
          <div>{user?.phoneNo}</div>
          <div>{user?.email}</div>
        </div>
        <div className={`w-[80%] ml-4 h-[6vh] flex justify-start items-center text-[18px] text-gray-700 cursor-pointer  ${isAllBookingsActive ?  "pl-8 bg-gray-200 rounded-2xl":"pl-4"}`} onClick={handleAllBookings}>All Bookings</div>
        <div className={`w-[80%] ml-4 h-[6vh] flex justify-start items-center text-[18px] text-gray-700  cursor-pointer ${isEditProfileActive ?  "pl-8 bg-gray-200 rounded-2xl":"pl-4"}`} onClick={handleEditProfile}>Edit Profile</div>
        {user?.role === "facilityOwner" && <div className={`w-[80%] ml-4 h-[6vh] flex justify-start items-center text-[18px] text-gray-700  cursor-pointer ${isMyFacilityActive ?  "pl-8 bg-gray-200 rounded-2xl":"pl-4"}`} onClick={handleMyFacility}>My Facility</div>}
        {user?.role === "admin" && <div className={`w-[80%] ml-4 h-[6vh] flex justify-start items-center text-[18px] text-gray-700  cursor-pointer ${isAdminPanelActive ?  "pl-8 bg-gray-200 rounded-2xl":"pl-4"}`} onClick={handleAdminPanel}>Admin Panel</div>}
      </div>
      <div className='sm:w-[80%] w-full  h-[100vh] '>
        {isAllBookingsActive && <AllBookings/>}
        {isEditProfileActive && <EditProfile/>}
        {isMyFacilityActive && <MyFacility/>}
        {isAdminPanelActive && <AdminPanel/>}
      </div>
    </div>
  )
}

export default Profile;