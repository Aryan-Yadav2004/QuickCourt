import React, { useState } from 'react'
import Stats from './Stats';
import FacilityManagement from './FacilityManagement';
import UserManagement from './UserManagement';

function AdminPanel() {
  const [tab,setTab] = useState("stats");
  
  return (
    <div className='w-full p-2 min-h-screen bg-gray-100 relative flex flex-col justify-start items-center '>
      <div className='w-full p-4 flex justify-start items-center bg-white gap-1 top-0 sticky mb-2 z-50'>
        <button className={`p-2 active:none  cursor-pointer ${tab==="stats"?"text-violet-500":"text-gray-800"} hover:text-violet-400 `} onClick={()=>{setTab("stats")}}>Stats</button>
        <button className={`p-2 active:none  cursor-pointer ${tab==="facilityManagement"?"text-violet-500":"text-gray-800"} hover:text-violet-400 `} onClick={()=>{setTab("facilityManagement")}}>Facility Approval</button>
        <button className={`p-2 active:none  cursor-pointer ${tab==="userManagement"?"text-violet-500":"text-gray-800"} hover:text-violet-400 `} onClick={()=>{setTab("userManagement")}}>User Management</button>
      </div>
      {tab === "stats" && <Stats/>}
      {tab === "facilityManagement" && <FacilityManagement/>}
      {tab === "userManagement" && <UserManagement /> }
    </div>
  )
}

export default AdminPanel;