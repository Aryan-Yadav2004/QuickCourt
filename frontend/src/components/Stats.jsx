import React from 'react'
import { Users, Building2, Calendar, TrendingUp, CheckCircle, XCircle, AlertCircle, Search, Filter } from 'lucide-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { getAdminStats } from '../services/server';
import { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Bar, BarChart, Pie, PieChart, Tooltip } from 'recharts';
function Stats() {
    const user = useSelector(state => state.user.userDetail);
    const [data, setData] = useState(null);
    const [userReg, setUserReg] = useState([]);
    const [booking, setBooking] = useState([]);
    const [sports, setSports] = useState([]);
    const [earning, setEarning] = useState([]);
    const [userRegPeriod, setUserRegPeriod] = useState("week");
    const [bookingPeriod, setBookingPeriod] = useState('week');
    const [earningPeriod, setEarningPeriod] = useState('week');
    useEffect(() => {
        if(!user) return;
        const fetchData = async() => {
            const res = await getAdminStats(user?._id);
            const result = await res.json();
            if(!res.ok) {
                console.log(result);
                return;
            }
            console.log(result);
            setData(result);
        }
        fetchData();
    },[user]);
    const weeks = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    function makeChartData (arr){
        let newArr = [];
        if(arr?.length === 7 ){
            newArr = arr.map((val, idx) => {
                return {name: weeks[idx], uv: val}
            });
        }
        if(arr?.length === 12 ){
            newArr = arr.map((val, idx) => {
                return {name: months[idx], uv: val}
            });
        }
        if(arr?.length === 31 ){
            newArr = arr.map((val, idx) => {
                return {name: idx, uv: val}
            });
        }
        return newArr;
    }
    useEffect(() => {
        setUserReg( makeChartData(data?.userRegistrationChart[userRegPeriod]));
        setBooking( makeChartData(data?.bookings[bookingPeriod]));
        setEarning( makeChartData(data?.earning[earningPeriod]));
        if(!data?.sports) return;
        setSports([...Object.entries(data?.sports).map((x) => ({name: x[0], uv: x[1]}))]);
    },[userRegPeriod, bookingPeriod, earningPeriod, data]);
    const renderCustomBarLabel = ({ x, y, width, value }) => {
        return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`${value}`}</text>;  
    };

  return (
    <div className="flex flex-col justify-start items-center w-full max-h-[87vh] overflow-scroll  gap-2" style={{scrollbarWidth: "none"}}>
        <div className='w-full h-[120vh] flex flex-col'>
            <div className='w-full h-[50%] flex'>
                <div className='w-[50%] h-full flex  flex-col gap-4'>
                    <h1 className='text-center text-gray-700 font-semibold'>User Registrations</h1>
                    <div className='w-full h-[75%]'>
                        <LineChart style={{ width: '100%', aspectRatio: 1.7, maxWidth: 600 }} responsive data={userReg}>
                            <CartesianGrid />
                            <Line dataKey="uv" fill='#5500ff' /> 
                            <XAxis dataKey="name" />
                            <YAxis />
                        </LineChart>
                    </div>
                    <div className='w-full h-[25%] flex justify-center items-center'>
                        <button className={`w-[15%]  py-0.5 rounded-l-full border-1 active:outline-0 focus:outline-0 border-[#5500ff] cursor-pointer ${userRegPeriod === "year"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setUserRegPeriod("year")}}>Yearly</button>
                        <button className={`w-[15%]  py-0.5 border-1 border-[#5500ff] active:outline-0 focus:outline-0 cursor-pointer ${userRegPeriod === "month"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setUserRegPeriod("month")}}>Monthly</button>
                        <button className={`w-[15%]  py-0.5 rounded-r-full border-1 active:outline-0 focus:outline-0 border-[#5500ff] cursor-pointer ${userRegPeriod === "week"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setUserRegPeriod("week")}}>Weekly</button>
                    </div>
                </div>
                <div className='w-[50%] h-full flex flex-col'>
                    <h1 className='text-center text-gray-700 font-semibold'>Most Active Sports</h1>
                    <PieChart style={{ width: '100%', aspectRatio: 1.7, maxWidth: 600 }}>
                        <Pie
                            activeShape={{
                            fill: '#5500ff',
                            }}
                            data={sports}
                            dataKey="uv"
                            isAnimationActive={true}
                        />
                        <Tooltip defaultIndex={2} />
                    </PieChart>
                </div>
            </div>
            <div className='w-full h-[50%] flex'>
                <div className='w-[50%] h-full flex flex-col gap-4'>
                    <h1 className='text-center text-gray-700 font-semibold'>Earnings</h1>
                    <div className='w-full h-[75%]'>
                        <BarChart style={{width: '100%', aspectRatio: 1.7, maxWidth: 600 }} responsive  data={earning}>
                        <XAxis
                            dataKey="name"
                        />
                        <YAxis  />
                        <Bar dataKey="uv" fill="#5500ff" label={renderCustomBarLabel} />
                        </BarChart>
                    </div>
                    <div className='w-full h-[25%] flex justify-center items-center'>
                        <button className={`w-[15%]  py-0.5 rounded-l-full border-1 border-[#5500ff] active:outline-0 focus:outline-0 cursor-pointer ${earningPeriod === "year"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setEarningPeriod("year")}}>Yearly</button>
                        <button className={`w-[15%]  py-0.5 border-1 border-[#5500ff] cursor-pointer active:outline-0 focus:outline-0 ${earningPeriod === "month"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setEarningPeriod("month")}}>Monthly</button>
                        <button className={`w-[15%]  py-0.5 rounded-r-full border-1 border-[#5500ff] active:outline-0 focus:outline-0 cursor-pointer ${earningPeriod === "week"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setEarningPeriod("week")}}>Weekly</button>
                    </div>
                </div>
                <div className='w-[50%] h-full flex flex-col gap-4'>
                    <h1 className='text-center text-gray-700 font-semibold'>Bookings</h1>
                    <div className='w-full h-[75%]'>
                        <LineChart style={{ width: '100%', aspectRatio: 1.7, maxWidth: 600 }} responsive data={booking}>
                            <CartesianGrid />
                            <Line dataKey="uv" fill='#5500ff' /> 
                            <XAxis dataKey="name" />
                            <YAxis />
                        </LineChart>
                    </div>
                    <div className='w-full h-[25%] flex justify-center items-center'>
                        <button className={`w-[15%]  py-0.5 rounded-l-full border-1 active:outline-0 focus:outline-0 border-[#5500ff] cursor-pointer ${bookingPeriod === "year"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setBookingPeriod("year")}}>Yearly</button>
                        <button className={`w-[15%]  py-0.5 border-1 border-[#5500ff] active:outline-0 focus:outline-0 cursor-pointer ${bookingPeriod === "month"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setBookingPeriod("month")}}>Monthly</button>
                        <button className={`w-[15%]  py-0.5 rounded-r-full border-1 active:outline-0 focus:outline-0 border-[#5500ff] cursor-pointer ${bookingPeriod === "week"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setBookingPeriod("week")}}>Weekly</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-white rounded-lg  p-6 w-full">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{data?.totalUser}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
                <Users className="text-purple-600" size={24} />
            </div>
            </div>
        </div>

        <div className="bg-white rounded-lg  p-6 w-full">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">Facility Owners</p>
                <p className="text-3xl font-bold text-gray-800">{data?.totalFacilityOwner}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
                <Building2 className="text-blue-600" size={24} />
            </div>
            </div>
        </div>

        <div className="bg-white rounded-lg  p-6 w-full">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-800">{data?.totalBooking}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
                <Calendar className="text-green-600" size={24} />
            </div>
            </div>
        </div>

        <div className="bg-white rounded-lg  p-6 w-full">
            <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">Active Courts</p>
                <p className="text-3xl font-bold text-gray-800">{data?.totalActiveCourts}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="text-orange-600" size={24} />
            </div>
            </div>
        </div>
    </div>
  )
}

export default Stats