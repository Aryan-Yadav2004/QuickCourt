import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import FacilityCard from './FacilityCard';
import CreateFacility from './CreateFacility';
import TrackRequest from './TrackRequest';
import { setMyFacilities } from '../features/facility/facilitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingTrend, getEarning, readAllFacilities } from '../services/server';
import BookingTrend from './BookingTrend';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Bar, BarChart } from 'recharts';

function MyFacility() {
    const [facilities,setFacilities] = useState([]);
    const dispatch = useDispatch();
    const [trendData, setTrendData] = useState([]);
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState("week");
    const [earningData, setEarningData] = useState([]);
    const [earning, setEarning] = useState([]);
    const [earningPeriod, setEarningPeriod] = useState('week');
    useEffect(()=>{
      const fetchFacilities = async () => {
        const res = await readAllFacilities();
        if(!res.ok) return;
        const newfacilities = await res.json();
        dispatch(setMyFacilities(newfacilities));
        setFacilities(newfacilities.filter((f)=> f?.status === "accepted"));
        let res1 = await getBookingTrend();
        const t = await res1.json();
        if(res1.ok) setTrendData(t);
        else console.log(t.message);
        let res2 = await getEarning();
        const s = await res2.json();
        console.log(s);
        if(res2.ok) setEarningData(s);
        else console.log(s.message);
      }
      fetchFacilities();
    },[]);
    
    const [isKPIsActive,setIsKPIsActive] = useState(true);
    const [isCreateNewFacilityActive,setCreateNewFacilityActive] = useState(false);
    const [isRequestHistoryActive,setIsRequestHistoryActive] = useState(false);
    const [isBookingsOverviewActive,setIsBookingsOverviewActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    const handleGroupBtn = () => {
      setIsOpen(!isOpen);
    }
    const handleCreateNewFacility = () => {
      setCreateNewFacilityActive(true);
      setIsRequestHistoryActive(false);
      setIsBookingsOverviewActive(false);
      setIsKPIsActive(false);
    }
    const handleRequestHistory = () => {
      setCreateNewFacilityActive(false);
      setIsRequestHistoryActive(true);
      setIsBookingsOverviewActive(false);
      setIsKPIsActive(false);
    }
    const handleBookingOverview = () => {
      setCreateNewFacilityActive(false);
      setIsRequestHistoryActive(false);
      setIsBookingsOverviewActive(true);
      setIsKPIsActive(false);
    }
    const handleKPIsPage = ( ) => {
      setCreateNewFacilityActive(false);
      setIsRequestHistoryActive(false);
      setIsBookingsOverviewActive(false);
      setIsKPIsActive(true);
    }
    const weeks = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    useEffect(() => {
      if(period === "month"){
        let newData = trendData?.month?.map((m,index) => {
          return {name: index, uv: m}
        });
        setData(newData);
      }
      if(period === "year"){
        let newData = trendData?.year?.map((y,index) => {
          return {name: months[index].toString(), uv: y}
        });
        setData(newData);
      }
      if(period === "week"){
        let newData = trendData?.week?.map((w,index) => {
          return {name: weeks[index], uv: w}
        });
        setData(newData);
      }
    },[period, trendData]);
    useEffect(() => {
      if(earningPeriod === "month"){
        let newData = earningData?.month?.map((m,index) => {
          return {name: index, uv: m}
        });
        setEarning(newData);
      }
      if(earningPeriod === "year"){
        let newData = earningData?.year?.map((y,index) => {
          return {name: months[index].toString(), uv: y}
        });
        setEarning(newData);
      }
      if(earningPeriod === "week"){
        let newData = earningData?.week?.map((w,index) => {
          return {name: weeks[index], uv: w}
        });
        setEarning(newData);
      }
    },[earningPeriod, earningData]);
    const margin = {
      top: 20,
      right: 30,
      left: 20,
      bottom: 25,
    };
  return (
      <div className='w-full h-full p-4 relative facilityContainer overflow-scroll bg-gray-50'>
        {/* Floating Button Group */}
        <div className='fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2'>

          {/* Buttons with Transition */}
          <div className={`flex flex-col items-end gap-2 transition-all duration-500 ease-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
            <button className='bg-violet-400 py-2 px-3 rounded-2xl cursor-pointer hover:bg-violet-500 text-white font-bold shadow-md' onClick={handleCreateNewFacility}>Create</button>
            <button className='bg-violet-400 py-2 px-3 rounded-2xl cursor-pointer hover:bg-violet-500 text-white font-bold shadow-md' onClick={handleRequestHistory}>Track Request</button>
            <button className='bg-violet-400 py-2 px-3 rounded-2xl cursor-pointer hover:bg-violet-500 text-white font-bold shadow-md' onClick={handleBookingOverview}>Bookings</button>
            <button className='bg-violet-400 py-2 px-3 rounded-2xl cursor-pointer hover:bg-violet-500 text-white font-bold shadow-md' onClick={handleKPIsPage}>Dashboard</button>
          </div>

          {/* Main + Button */}
          <button
            onClick={handleGroupBtn}
            className={`sm:w-12 sm:h-12 flex justify-center items-center rounded-full outline-none text-center bg-violet-400 hover:bg-violet-500 font-serif text-white text-3xl cursor-pointer transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
          >
            +
          </button>

        </div>

        {/* Page Content */}
        {isKPIsActive && 
          <>
            <div className='w-full h-110 flex  '>
              <div className='w-[50%] h-full flex flex-col'>
                <h1 className='text-center'>Bookings</h1>
                <div className='w-full h-[75%]'>
                  <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={data}>
                    <CartesianGrid />
                    <Line dataKey="uv" fill='#5500ff' /> 
                    <XAxis dataKey="name" />
                    <YAxis />
                  </LineChart>
                </div>
                <div className='w-full h-[25%] flex justify-center items-center'>
                  <button className={`w-[15%]  py-0.5 rounded-l-full border-1 active:outline-0 focus:outline-0 border-[#5500ff] cursor-pointer ${period === "year"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setPeriod("year")}}>Yearly</button>
                  <button className={`w-[15%]  py-0.5 border-1 border-[#5500ff] active:outline-0 focus:outline-0 cursor-pointer ${period === "month"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setPeriod("month")}}>Monthly</button>
                  <button className={`w-[15%]  py-0.5 rounded-r-full border-1 active:outline-0 focus:outline-0 border-[#5500ff] cursor-pointer ${period === "week"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setPeriod("week")}}>Weekly</button>
                </div>
              </div>
              <div className='w-[50%] h-full flex flex-col'>
                <h1 className='text-center'>Earning</h1>
                <div className='w-full h-[75%]'>
                  <BarChart style={{width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive  data={earning}>
                    <XAxis
                      dataKey="name"
                    />
                    <YAxis  />
                    <Bar dataKey="uv" fill="#5500ff"  />
                  </BarChart>
                </div>
                <div className='w-full h-[25%] flex justify-center items-center'>
                  <button className={`w-[15%]  py-0.5 rounded-l-full border-1 border-[#5500ff] active:outline-0 focus:outline-0 cursor-pointer ${earningPeriod === "year"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setEarningPeriod("year")}}>Yearly</button>
                  <button className={`w-[15%]  py-0.5 border-1 border-[#5500ff] cursor-pointer active:outline-0 focus:outline-0 ${earningPeriod === "month"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setEarningPeriod("month")}}>Monthly</button>
                  <button className={`w-[15%]  py-0.5 rounded-r-full border-1 border-[#5500ff] active:outline-0 focus:outline-0 cursor-pointer ${earningPeriod === "week"?"text-white bg-[#5500ff]":"text-gray-600"}`} onClick={() => {setEarningPeriod("week")}}>Weekly</button>
                </div>
              </div>
            </div>
            <div className='flex flex-col justify-start gap-6 min-h-[50vh] items-center w-full py-4 '>
              <h1 className='text-center font-bold text-2xl'>My Facilities</h1>
              {(facilities.length === 0 ? <div className='w-full h-full flex justify-center items-center text-2xl text-gray-600'>No facility yet!</div>:
              facilities.map((facility)=> (
                <FacilityCard key={facility?._id} facility={facility}/>
              )))}
            </div>
          </>
        }
        {isCreateNewFacilityActive && <CreateFacility/>}
        {isRequestHistoryActive && <TrackRequest/>}
        {isBookingsOverviewActive && <BookingTrend />}
      </div>
  )
}

export default  MyFacility;