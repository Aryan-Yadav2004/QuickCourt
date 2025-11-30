import { Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { getAllUsers, updateUserStatus } from '../services/server';
import { useNavigate } from 'react-router-dom';

function UserManagement() {
    const [page,setPage] = useState(1);
    const limit = useRef(2);
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("all");
    const [search,setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchAllusers = async () => {
            const res = await getAllUsers(page,limit.current);
            const data = await res.json();
            if(res.ok){
                setUsers(prev => [...prev,...data]);
            }
            else{

            }
            setLoading(false);
        }
        fetchAllusers();
    },[page]);
    const handleLoadmore = async () => {
      if(loading) return;
      setLoading(true);
      setPage(page + 1);
    }

    const handleStatus = async (userId,status) => {
      const res = await updateUserStatus(userId,status);
      const data = await res.json()
      if(res.ok){
        console.log(data.message);
        const newUsers = users.map(user => {
          if(user._id === userId) {
            return {...user,status: status}
          }
          return user;
        });
        setUsers(newUsers);
      }
      else{
        console.log(data.message);
      }
    }

    const handleSearch = async () => {
      navigate(`/user/${search}`)
    }
    const handleFilter = (e) => {
        const f = e.target.value;
        setFilter(f);
    }
  return (
    <div className='w-full max-h-screen p-1 overflow-scroll facilityContainer flex flex-col justify-start items-center gap-2'>
        {/* search and filter section  */}
        <div className="bg-white rounded-lg shadow p-4 flex gap-4 items-center w-full max-w-2xl">
            <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#dccafe] " size={20} />
            <input
                type="text"
                placeholder="Search by username"
                value={search}
                className="w-full pl-10 pr-4 py-2 border border-[#dccafe] active:outline-0 focus:outline-0  focus:border-2 focus:border-[#b996ff] rounded-lg text-gray-700 "
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if(e.key === 'Enter'){
                    handleSearch();
                  }
                }}
            />
            </div> 
            <div className="flex items-center gap-2">
                <div className='w-full py-1   relative flex justify-end '>
                    <select name="filter" id="filter" className='text-right  w-full px-4 py-2 min-w-40 border border-[#dccafe] active:outline-0 focus:outline-0  focus:border-2 focus:border-[#b996ff] text-gray-700 relative rounded-lg' onChange={handleFilter}>
                        <option value="all">All Roles</option>
                        <option value="user">Users</option>
                        <option value="facilityOwner">Owners</option>
                    </select>
                    <img src="filter.svg" alt="filter" className='w-8 h-8 object-contain absolute right-30 top-2' />
                </div>
            </div>
        </div>

        {/* user table */}
        <div className="bg-white w-full rounded-lg shadow overflow-scroll max-h-[70vh] facilityContainer">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">

            {users.map((user) => (
              <tr key={user._id} className={`hover:bg-gray-50 ${user.role === filter || filter === "all" ?"":"hidden"}` }>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center object-contain">
                      <img src={user?.avtar} alt="avtar" className='w-full h-full rounded-full' />
                    </div>
                    <span className="ml-3 font-medium">{user.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    user?.role === 'facilityOwner' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {user?.role === 'facilityOwner'? "Owner":""}
                    {user?.role === 'user'? "User":""}
                    {user?.role === 'admin'? "Admin":""}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user?.status === 'active'? "Active":"Banned"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm cursor-pointer font-medium" onClick={()=> navigate(`/user/${user.username}`)}>
                      View
                    </button>
                    {user.status === 'active' ? (
                      <button className="text-red-600 hover:text-red-800 cursor-pointer  text-sm font-medium" onClick={()=>handleStatus(user._id,"banned")}>
                        Ban
                      </button>
                    ) : (
                      <button className="text-green-600 hover:text-green-800 text-sm font-medium" onClick={()=>handleStatus(user._id,"active")}>
                        Unban
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            
             
          </tbody>
        </table>
         <div className='w-full p-1 flex justify-center items-center relative'>
            <button className={`m-auto p-2 active:outline-none bg-transparent text-center ${loading?"text-gray-400 cursor-not-allowed":"text-[#6c22ff] cursor-pointer"} `} onClick={handleLoadmore}>Load more</button>
        </div>
      </div>

    </div>
  )
}

export default UserManagement;