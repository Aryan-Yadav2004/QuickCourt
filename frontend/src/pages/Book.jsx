import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Search, SlidersHorizontal }  from 'lucide-react'
import { getCountryISO } from '../services/server';
import { getCitiesByCountry } from '../services/GeoDB';
import { use } from 'react';
import { useSelector } from 'react-redux';
function Book() {
    const [cities,setCities] = useState([]);
    const boxRef = useRef(null);
    const searchBarRef = useRef(null);
    const [hideBoxes,setHideBoxes] = useState({all: true, cities: true, search: true, filter: true});
    const [filter,setFilter] = useState({rating: 0, price: 0, sport: 'all'});
    const [city,setCity] = useState("");
    const [searchedFacilities,setSearchFacilities] = useState([]);
    const sports = ["all","soccer", "cricket", "basketball", "tennis", "volleyball", "rugby", "hockey", "baseball","table tennis", "badminton", "athletics", "swimming", "boxing", "wrestling", "judo", "karate", "taekwondo", "fencing", "archery", "cycling", "golf", "gymnastics", "skiing", "snowboarding", "figure skating", "speed skating", "curling", "equestrian", "rowing", "canoeing", "sailing", "shooting", "triathlon", "polo", "surfing", "skateboarding", "climbing", "e-sports"].sort();
    const facilities = useSelector(state => state.search.facilities);
    useEffect(() => {
        const fetchCities = async () => {
            // const { country } = await getCountryISO();
            // const result = await getCitiesByCountry(country);
            // setCities(["none",...result.sort()]);
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
    const handleSearch = (e) => {
        const key = e.target.value.trim();
        const n = key.length;
        const newSearch = facilities.filter((facility)=>{
            if(facility?.name.toLocaleLowerCase().substring(0,n) === key.toLocaleLowerCase()){
                return facility;
            }
        })
        setSearchFacilities(newSearch);
    }
  return (
    <div className='w-full min-h-screen py-1 flex flex-col justify-start items-center'>
        {/* search bar */}
        <div ref={searchBarRef} className='w-[50%] min-h-14 py-1 flex flex-col justify-start gap-1'>
            {/* searchbar */}
            <div className='w-full h-14 border border-[#f0ebfa] rounded-2xl  flex justify-between items-center shadow-lg '>
                <div className='w-[28%] h-full flex justify-between items-center pl-2'  onClick={() => setHideBoxes(prev => ({...prev,all: false, cities: false, search: true, filter: true}))} >
                    <MapPin size={28} className='text-[#5500ff]' />
                    <div name="" id="" className='w-full  text-gray-500 text-[18px] ml-1'>
                        {city === ""? "Select city":city}
                    </div>
                </div>
                <div className='w-0 h-[30%] border border-gray-400'></div>
                <div className='w-[55%] h-full flex justify-between items-center'>
                    <Search size={25} className='text-gray-400' />
                    <input type="text" className='w-full outline-none focus:ring-0 active:outline-none border-0 text-gray-700 text-[15px] pl-1' placeholder='Search for facility' onClick={() => setHideBoxes(prev => ({...prev,all: false, search: false, filter: true, cities: true}))}  onChange={handleSearch}/>
                </div>
                <div className='w-0 h-[30%] border border-gray-400 '></div>
                <div className='w-[16%] flex justify-center items-center gap-2 cursor-pointer' onClick={() => setHideBoxes(prev => ({...prev,all: false, filter: false, cities: true, search: true}))}>
                    <SlidersHorizontal size={25} className='text-gray-400' />
                    <p className='text-gray-400'>Filter</p>
                </div>
            </div>


            {/* area */}
            <div ref={boxRef} className={`w-full py-1  gap-0.5 ${hideBoxes.all?"hidden":"flex justify-between items-start"}`}>
                <div className={`w-[28%] h-98 px-2 pt-2 flex flex-col justify-start items-start shadow-lg  border border-[#f0ebfa] overflow-scroll  rounded-2xl ${hideBoxes.cities?"invisible":""}`} style={{ scrollbarWidth: 'none' }}>
                    {cities.map((city)=>{
                        if(city === 'none') return <div key={0} className='py-1 pl-1 rounded-lg w-full hover:bg-[#f0ebfa] cursor-pointer text-gray-800' onClick={()=>setCity("")}>none</div>
                        return <div key={city.id} className='py-1 pl-1 rounded-lg w-full hover:bg-[#f0ebfa] cursor-pointer text-gray-800' onClick={()=>setCity(city.name)}>{city.name}</div>
                    })}
                </div>
                <div className={`w-[55%] h-98 px-3 py-2 shadow-lg  flex flex-col justify-start gap-1 border border-[#f0ebfa] rounded-2xl ${hideBoxes.search?"invisible":""}`} >
                    {searchedFacilities.map(facility => (
                        <div key={facility._id} className='w-full py-1 flex justify-between items-center'>
                            <div className='w-[20%] h-6 rounded-full object-cover flex justify-center items-center'>
                                <img src={facility?.profileImg} className="w-full h-full rounded-full object-contain" alt="img" />
                            </div>
                            <div className='w-[75%] flex justify-start items-center text-gray-700 font-semibold text-2xl'>
                                {facility?.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`w-[17%] h-48 flex flex-col pt-2  justify-start items-center shadow-lg  border border-[#f0ebfa] rounded-2xl ${hideBoxes.filter?"invisible":""}`} >
                    {/* Price */}
                    <div className='w-full h-[33%] flex flex-col px-2 justify-start items-start gap-1'>
                        <div className='w-full flex justify-between'>
                            <span>Price:</span>
                            <span>{filter.price}</span>
                        </div>
                        <input type="range" min={0} max={999} value={filter.price}  step={1} className='w-full h-0.5 cursor-pointer accent-[#5500ff] bg-gray-500' onChange={(e)=>setFilter(prev=>({...prev, price: Number(e.target.value)}))}/>
                    </div>
                    {/* Rating */}
                    <div className='w-full h-[33%] flex flex-col px-2 justify-start items-start gap-1'>
                        <div className='w-full flex justify-between'>
                            <span>Rating:</span>
                            <span>{filter.rating}</span>
                        </div>
                        <input type="range" min={0} max={5} value={filter.rating}  step={1} className='w-full h-0.5 cursor-pointer accent-[#5500ff] bg-gray-500' onChange={(e)=>setFilter(prev=>({...prev, rating: Number(e.target.value)}))}/>
                    </div>
                    {/* sports */}
                    <div className='w-full h-[33%] flex flex-col px-2 justify-start items-start gap-1'>
                        <select className='w-full border-0 hover:border-0 text-gray-700 bg-transparent active:border-0 ring-0 focus:border-0' style={{ scrollbarWidth: 'none' }} onChange={(e)=>setFilter(prev=>({...prev, sport: e.target.value}))} value={filter.sport}>
                            {sports.map((sport)=>(
                                <option key={sport} value={sport} className='w-full hover:bg-[#f0ebfa] text-gray-700'>{sport}</option>
                            ))}
                        </select>
                    </div>
                    <button className='w-full text-center text-red-500 mt-1 cursor-pointer' onClick={()=>setFilter({price: 0, sport: "all", rating: 0})}>Clear</button>
                </div>           
            </div>
        </div>
    </div>
  )
}

export default Book;