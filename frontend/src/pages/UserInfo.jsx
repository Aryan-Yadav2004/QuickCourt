import React, { useEffect, useState } from 'react'
import { Mail, Phone, MapPin, Calendar, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, getUserByUsername, updateUserStatus } from '../services/server';
function UserInfo() {
  const navigate = useNavigate();
  const [user,setUser] = useState(null);
  const currUser = useSelector(state => state.user.userDetail);
  const { username } = useParams();
  const [bookingData, setBookingData] = useState({}) 
  
  useEffect(()=>{
    const fetchUser = async () => {
      const res = await getUserByUsername(username);
      const data = await res.json();
      if(res.ok){
        console.log(data);
        setUser(data);
        const total = data?.bookings.length;
        let completed = 0;
        let upcoming  = 0;
        let totalSpent = 0;
        for(let booking of data?.bookings){
          if(booking?.status === "completed") completed++;
          if(booking?.status === "booked") upcoming++;
          if(booking?.status !== "cancelled")totalSpent += booking.price;
        }
        setBookingData({total,completed,upcoming, totalSpent});
      }
      else{
        console.log(data.message);
      }
    }
    fetchUser();
  },[]);

  const handleStatus = async (status) => {
    const res = await updateUserStatus(user?._id,status);
    const data = await res.json()
    if(res.ok){
      console.log(data.message);
    }
    else{
      console.log(data.message);
    }
    window.location.reload();
  }
  function extractTime(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes} ${ampm}`,
    };
  }

  let count = 0;
  
  return (
    user?
    <div className='bg-gray-50 w-full h-[100vh] flex flex-col justify-start p-4 items-center gap-4 overflow-scroll facilityContainer'>
      <div className="bg-white rounded-lg w-full shadow p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center text-3xl font-bold text-purple-700">
              <img src={user?.avtar} alt="profile image"  className='w-full h-full object-contain rounded-full'/>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  'active' === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {'Active'}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  'facilityOwner' === 'facilityOwner' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {user?.role === 'facilityOwner'? "Owner":""}
                  {user?.role === 'user'? "User":""}
                  {user?.role === 'admin'? "Admin":""}
                </span>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{user?.phoneNo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{`${user?.street}, ${user?.city}, ${user?.state}, ${user?.country}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {/* <span>Joined: {new Date(selectedUser.joinedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span> */}
                  <span>Joined: {extractTime(user?.joinedAt)?.date}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {user?.status === 'active' ? (
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer" onClick={() => {handleStatus("banned")}}>
                <XCircle size={18} />
                Ban User
              </button>
            ) : (
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer" onClick={() => {handleStatus("active")}}>
                <CheckCircle size={18} />
                Unban User
              </button>
            )}
          </div>
        </div>
      </div>

      { (user?.role === 'user' || user?.role === 'admin') && (
        <div className="w-full py-1 flex flex-col justify-start items-center gap-4">
          <div className="bg-white rounded-lg w-full shadow p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold">{bookingData?.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 w-full">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-2xl font-bold">{bookingData?.completed}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 w-full">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Upcoming</p>
                <p className="text-2xl font-bold">{bookingData?.upcoming}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 w-full">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 p-3 rounded-full">
                <DollarSign className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Spent</p>
                <p className="text-2xl font-bold">{bookingData?.totalSpent}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {user?.role === 'facilityOwner' && (
        <div className="bg-white rounded-lg shadow p-6 w-full">
          <h3 className="text-xl font-bold mb-4">Facilities</h3>
          <div className="space-y-4">
            {user.facility.map((f) => (
              <div key={f._id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{f.name}</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                      <div>
                        <p><span className='font-medium'>About:</span>{f.about}</p>
                        <p><span className="font-medium">Location: </span> {`${f?.street}, ${f?.city}, ${f?.state}, ${f?.country}`}</p>
                        <p><span className="font-medium">Status: </span> <span className={`${f.status === 'accepted' && 'text-green-500'} ${f.status === 'pending' && 'text-yellow-500'} ${f.status === 'rejected' && 'text-red-500'}`}>{f.status}</span></p>
                        {/* <p><span className="font-medium">Sports:</span> {facility.sports}</p> */}
                      </div>
                      <div>
                        <p><span className="font-medium">Rating:</span> ⭐ 4.5</p>
                      </div>
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      
     {user?.bookings.length?
        <div className="bg-white rounded-lg shadow w-full p-6">
          <h3 className="text-xl font-bold mb-4">Booking History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Court</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {user?.bookings.map((booking)=>(
                  <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{`${booking.facility}, ${booking.street}, ${booking.city}, ${booking.state}, ${booking.country}`}</td>
                    <td className="px-4 py-3 text-gray-600">{booking.court}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <div>{extractTime(booking.time).date}</div>
                      <div className="text-sm text-gray-500">{extractTime(booking.time).time}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        booking.status === 'Completed' 
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'booked'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">₹{booking.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    
      :
        <div className="bg-white rounded-lg shadow w-full  p-6">
          <h3 className="text-xl font-bold mb-4">Booking History</h3>
          <div className="text-center py-8 text-gray-500">
            <Calendar size={48} className="mx-auto mb-2 opacity-50" />
            <p>No booking history available</p>
          </div>
        </div>
      }
       

    </div>

    :

    <div className='w-full min-h-screen bg-gray-100'>
        <h1 className='text-4xl font-medium text-gray-500 text-center p-5'>No user found!</h1>
    </div>
  )
}

export default UserInfo;