import React, { useEffect, useState } from 'react'
import ErrorAlert from './errorAlert';
import { upload } from '../services/Cloudinary';
import { createCourt } from '../services/server';
import { useNavigate, useParams } from 'react-router-dom';
import NProgress from 'nprogress'; 
import "nprogress/nprogress.css";
function CreateCourt() {
  const [error,setError] = useState("");
  const navigate = useNavigate();
  const [image,setImage] = useState("");
  const [file,setFile] = useState(null);
  const { facilityId } = useParams();
  const [addTimerToggle,setAddTimerToggle] = useState(false);
  const [price, setPrice] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [time, setTime] = useState({hour: '1', minute: '0', meridian: 'AM'});
  const [weekdays, setWeekdays] = useState([]);
  const [seats,setSeats] = useState(0);
  const weeks = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
  const sports = ["soccer", "cricket", "basketball", "tennis", "volleyball", "rugby", "hockey", "baseball", "table tennis", "badminton", "athletics", "swimming", "boxing", "wrestling", "judo", "karate", "taekwondo", "fencing", "archery", "cycling", "golf", "gymnastics", "skiing", "snowboarding", "figure skating", "speed skating", "curling", "equestrian", "rowing", "canoeing", "sailing", "shooting", "triathlon", "polo", "surfing", "skateboarding", "climbing", "e-sports"];
  sports.sort();
  const hours = Array.from({length: 12},(_,i)=>(i + 1));
  const minutes = Array.from({length: 60},(_,i)=>(i));
  useEffect(()=>{
    NProgress.configure({showSpinner: false});
  },[]);
  const closeErrorMsg = () => {
    setError("");
  }
  const handleTimer = () => {
    if(loading) return;
    if(!time?.hour || (!time?.minute && time?.minute !== "0")  || !time.meridian) {
      setError("select time");
      return;
    }
    if(schedule.some((t)=>JSON.stringify(t) === JSON.stringify(time))){
      setError("Time already chosen");
      return;
    }
    setSchedule((prev)=>[...prev,time]);
    setAddTimerToggle(!addTimerToggle);
  }
  const handleRemoveTimer = (time) => {
    const newSchedule = schedule.filter((currTime) => JSON.stringify(currTime) !== JSON.stringify(time));
    setSchedule(newSchedule);
  }
  const handleImageInput = (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  }
  const handleRemoveProfilePhoto = () => {
    setFile(null);
    setImage("");
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if(schedule.length === 0){
      setError("set atleast on timeSlot");
      setLoading(false);
      NProgress.done();
      return;
    }
    const msg = await upload(file);
    let link = "";
    if(msg.status === 200){
      link = msg.message;
    }
    else{
      setError(msg.message);
      setLoading(false);
      NProgress.done();
      return;
    } 
    const t = schedule.map((s)=>(
      {
        hour: parseInt(s.hour),
        minute: parseInt(s.minute),
        meridian: s.meridian
      }
    ))
    const court = {sport: data.sport, about: data.about, photoLink: link, price: parseInt(price), schedule: {days: weekdays, time: t}, seats: parseInt(seats)}
    const res = await createCourt(facilityId,court);
    if(res.ok){
      navigate(`/facility/${facilityId}`);
    }
    else{
      const result = await res.json();
      setError(result.message);
    }
    NProgress.done();
    setLoading(false);
  }

  const handleWeekDay = (day) => {
    if(weekdays.includes(day)){
      let newWeekDays = weekdays.filter((d)=> d !== day);
      setWeekdays(newWeekDays);
    }
    else{
      setWeekdays(prev => [...prev,day]);
    }
  }
  return (
    <div className='w-full h-[100vh] relative flex flex-col jusitfy-start items-center gap-4 p-4'>
      <h1 className='text-3xl font-semibold'>Create Court</h1>
      <form className='flex justify-between items-center w-full h-[70vh] relative' onSubmit={(e) => { NProgress.start(); setLoading(true);handleSubmit(e)}}>
        <div className='w-[50%] h-full flex justify-center items-start'>
          {image === "" ? 
            <div className={`w-[80%] h-[50vh]  border border-gray-300 flex items-center justify-center  cursor-pointer`} style={{backgroundImage: 'url(/plus.png)', backgroundPosition: "center",backgroundRepeat: 'no-repeat', backgroundSize:"50px"}} >
              <input type="file" className={`w-full h-full text-transparent bg-transparent cursor-pointer `} onChange={(e) => {if(loading) return; handleImageInput(e)}} required/> 
            </div>
          :
            <div className='w-[80%] h-[50vh]  bg-gray-100 flex items-center justify-center overflow-hidden relative'>
              <div className={`w-[20px] h-[20px] pb-1 text-gray-800 flex justify-center items-center rounded-full absolute top-0 bg-gray-300 opacity-60 right-0  cursor-pointer`} onClick={(e)=>{if(loading) return; handleRemoveProfilePhoto(e)}}>x</div>
              <img src={image} alt="preview" className="w-full h-full object-contain" />
            </div>
          }
        </div>
        <div className='w-[50%] h-full flex flex-col justify-start  items-start gap-2'>
          <div className='flex w-full gap-16'>
            <div className='p-2 flex flex-col gap-1'>
              <p className='text-xl font-medium text-gray-700'>Sports:</p>
              <select id='sport' name='sport' className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" required>
                {sports.map((sport) => (<option key={sport}>{sport}</option>))}
              </select>
            </div>
            <div className='p-2  flex flex-col gap-1'>
              <p className='text-xl font-medium text-gray-700'>Price (in ruppee per hour):</p>
              <input type="number" placeholder='150' value={price} className='w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-[#f0ebfa] focus:border-[#f0ebfa]' min={0} onChange={(e)=>{if(loading) return; setPrice(e.target.value)}} required/>
            </div>
            <div className='p-2  flex flex-col gap-1'>
              <p className='text-xl font-medium text-gray-700'>Seat available:</p>
              <input type="number" placeholder='5' value={seats} className='w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-[#f0ebfa] focus:border-[#f0ebfa]' min={0} onChange={(e)=>{if(loading) return; setSeats(e.target.value)}} required/>
            </div>
          </div>
          <div className='p-2 w-full flex flex-col gap-1'>
            <p className='text-xl font-medium text-gray-700'>About:</p>
            <textarea name="about" id="about" placeholder='Enter dimension and description about your court...' className='active:none border border-[#eee6ff] focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] rounded-2xl p-2 min-h-[40px]'></textarea>
          </div>
          <div className='p-2 w-full h-10 flex flex-col gap-2 '>
            <p className='text-xl font-medium text-gray-700 '>Add time Slot:</p>
            <div className='w-[70%] flex justify-between items-center'>
              {weeks.map((day)=>(
                <div key={day} className={`w-10 h-10 rounded-full text-center pt-1.5  border ${weekdays.includes(day)?"bg-violet-100 text-violet-700 border-violet-700":"bg-white text-gray-600 border-gray-600"} cursor-pointer `} onClick={()=>{if(loading) return ;handleWeekDay(day)}}>
                  {day.substring(0,1).toLocaleUpperCase() + day.substring(1,3) }
                </div>
              ))}
            </div>
            <div className='w-[70%] flex flex-row flex-wrap gap-2'>
              {schedule.map((time,index)=>(
                <div key={index} className='p-2 bg-violet-500 border-0 rounded-2xl relative'>
                  <button type='button' className='pb-1 w-4 h-4 text-[10px]   rounded-full text-center bg-gray-300 absolute top-0 right-0 cursor-pointer' onClick={()=>{if(loading) return; handleRemoveTimer(time)}}>x</button>
                  <p className='text-white font-medium'>{`${time.hour < 10? `0${time.hour}`:`${time.hour}`}:${time.minute < 10? `0${time.minute}`:`${time.minute}`} ${time.meridian}`}</p>
                </div>
              ))}
              {addTimerToggle? 
                <div className='w-[80%]  h-10 flex justify-around items-center'>
                  <select name="hour" id="hour" className='w-[20%] px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]"' onChange={(e)=>{if(loading) return;  setTime(prev=>({...prev, hour: e.target.value}))}}>
                    {hours.map((hour)=>(
                      <option value={hour}>{hour}</option>
                    ))}
                  </select>
                  <p className='text-gray-700 text-2xl'>:</p>
                  <select name='minute' id='minute' className='w-[20%] px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]"' onChange={(e)=>{if(loading) return; setTime(prev=>({...prev,minute: e.target.value}))}}>
                    {minutes.map((minute)=>(
                      <option value={minute}>{minute}</option>
                    ))}
                  </select>
                  <p className='text-gray-700 text-2xl'>:</p>
                  <select name="meridian" id="meridian" className='w-[20%] px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]"' onChange={(e)=>{if(loading) return; setTime(prev=>({...prev,meridian: e.target.value}))}}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  <button type='button' className='px-3 py-2 text-white font-semibold rounded-2xl border-0 bg-violet-500 cursor-pointer' onClick={handleTimer} >confirm</button>
                </div>
                :
                <button type='button' className='w-11 h-10 pb-7 font-bold  text-4xl text-center rounded-xl cursor-pointer border-1 border-violet-500' style={{backgroundImage: 'url(/plus.png)', backgroundPosition: "center",backgroundRepeat: 'no-repeat', backgroundSize:"50px"}} onClick={()=>{if(loading) return; setAddTimerToggle(!addTimerToggle)}}  ></button>
              }
            </div>
          </div>
        </div>
        <button type='submit' className={`absolute  px-3 py-2 border-0 rounded-2xl text-center text-white ${loading?"cursor-not-allowed bg-violet-300":"cursor-pointer bg-violet-500"} bottom-0 left-[47%]`} >Create</button>
      </form>
      <ErrorAlert error={error} closeMsg={closeErrorMsg} />
    </div>
  )
}

export default CreateCourt;