import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Search, SlidersHorizontal }  from 'lucide-react'
import { getCountryISO } from '../services/server';
import { getCitiesByCountry } from '../services/GeoDB';
function Book() {
    const [cities,setCities] = useState([]);
    const boxRef = useRef(null);
    const searchBarRef = useRef(null);
    const [hideBoxes,setHideBoxes] = useState({all: true, cities: true, search: true, filter: true});
    const [city,setCity] = useState("");
    useEffect(() => {
        const fetchCities = async () => {
            const { country } = await getCountryISO();
            console.log(country);
            const result = await getCitiesByCountry(country);
            setCities(["none",...result.sort()]);
        }
        const handleOutsideClick = (event) => {
            if(boxRef.current && !boxRef.current.contains(event.target) && !searchBarRef.current.contains(event.target)){
                setHideBoxes({all: true, cities: true, search: true, filter: true});
            }
        }
        document.addEventListener('mousedown',handleOutsideClick);
        fetchCities();
        return () => {
            document.removeEventListener('mousedown',handleOutsideClick);
        }
    },[]);
  return (
    <div className='w-full min-h-screen py-1 flex flex-col justify-start items-center'>
        {/* search bar */}
        <div ref={searchBarRef} className='w-[50%] min-h-14 py-1 flex flex-col justify-start gap-1'>
            {/* searchbar */}
            <div className='w-full h-14 border border-[#f0ebfa] rounded-2xl  flex justify-between items-center shadow-lg '>
                <div className='w-[28%] h-full flex justify-between items-center pl-2'  onClick={() => setHideBoxes(prev => ({...prev,all: false, cities: false, search: true, filter: true}))} >
                    <MapPin size={28} className='text-[#5500ff]  ' />
                    <div name="" id="" className='w-full  text-gray-500 text-[18px] ml-1'>
                        {city === ""? "Select city":city}
                    </div>
                </div>
                <div className='w-0 h-[30%] border border-gray-400'></div>
                <div className='w-[55%] h-full flex justify-between items-center'  >
                    <Search size={25} className='text-gray-400 ' />
                    <input type="text" className='w-full outline-none focus:ring-0 active:outline-none border-0 text-gray-700 text-[15px] pl-1' placeholder='Search for facility, courts' onClick={() => setHideBoxes(prev => ({...prev,all: false, search: false, filter: true, cities: true}))}  />
                </div>
                <div className='w-0 h-[30%] border border-gray-400 '></div>
                <div className='w-[16%] flex justify-center items-center gap-2 cursor-pointer' onClick={() => setHideBoxes(prev => ({...prev,all: false, filter: false, cities: true, search: true}))}>
                    <SlidersHorizontal size={25} className='text-gray-400' />
                    <p className='text-gray-400'>Filter</p>
                </div>
            </div>


            {/* area */}
            <div ref={boxRef} className={`w-full py-1  gap-0.5    ${hideBoxes.all?"hidden":"flex justify-between items-center"}`}>
                <div className={`w-[28%] h-98 pl-2 pt-2 flex flex-col justify-start items-start shadow-lg  border border-[#f0ebfa] overflow-scroll  rounded-2xl ${hideBoxes.cities?"invisible":""}`} style={{ scrollbarWidth: 'none' }}>
                    {cities.map((city)=>{
                        if(city === 'none') return <div key={0} className='py-1 rounded-lg w-full hover:bg-[#f0ebfa] cursor-pointer text-gray-800' onClick={()=>setCity("")}>none</div>
                        return <div key={city.id} className='py-1 rounded-lg w-full hover:bg-[#f0ebfa] cursor-pointer text-gray-800' onClick={()=>setCity(city.name)}>{city.name}</div>
                    })}
                </div>
                <div className={`w-[55%] h-98  shadow-lg  border border-[#f0ebfa] rounded-2xl ${hideBoxes.search?"invisible":""}`} >
                    
                </div>
                <div className={`w-[16%] h-98  shadow-lg  border border-[#f0ebfa] rounded-2xl ${hideBoxes.filter?"invisible":""}`} >
                    
                </div>           
            </div>
            
        </div>
    </div>
  )
}

export default Book;