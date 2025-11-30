import React, { useEffect, useRef, useState } from 'react'
import { MapPin, Search, SlidersHorizontal }  from 'lucide-react'
import { getCountryISO, getFacilityListing } from '../services/server';
import { getCitiesByCountry } from '../services/GeoDB';
import { use } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Book() {
    const [cities,setCities] = useState([]);
    const navigate = useNavigate();
    const boxRef = useRef(null);
    const searchBarRef = useRef(null);
    const [hideBoxes,setHideBoxes] = useState({all: true, cities: true, search: true, filter: true});
    const [filter,setFilter] = useState({rating: 0, price: 999, sport: 'all'});
    const [city,setCity] = useState("");
    const [searchedFacilities,setSearchFacilities] = useState([]);
    const sports = ["all","soccer", "cricket", "basketball", "tennis", "volleyball", "rugby", "hockey", "baseball","table tennis", "badminton", "athletics", "swimming", "boxing", "wrestling", "judo", "karate", "taekwondo", "fencing", "archery", "cycling", "golf", "gymnastics", "skiing", "snowboarding", "figure skating", "speed skating", "curling", "equestrian", "rowing", "canoeing", "sailing", "shooting", "triathlon", "polo", "surfing", "skateboarding", "climbing", "e-sports"].sort();
    const searchContent = useSelector(state => state.search.facilities);
    const [page,setPage] = useState({currpage: 1,add: true});
    const [facilities,setFacilities] = useState([]);
    useEffect(() => {
        const fetchCities = async () => {
            const { country } = await getCountryISO();
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
    useEffect(() => {
        const timeout = setTimeout(async() => {
            let newFilter = {};
            if(filter.sport !== "all"){
                newFilter = {...newFilter, sport: filter.sport}
            }
            if(city !== ""){
                newFilter = {...newFilter, city: city}
            }
            newFilter = {...newFilter, startsWith: filter.price, rating: filter.rating}
            const res = await getFacilityListing(newFilter,page.currpage, 10);
            const data = await res.json(); 
            console.log(data);
            if(page.add){
                setFacilities((prev)=>[...prev,...data]);
            }
            else{
                setFacilities(data);
            }
        },2000);
        return () => clearTimeout(timeout);
    },[filter,city,page]); 
    const handleSearch = (e) => {
        const key = e.target.value.trim();
        const n = key.length;
        if(n == 0){
            setSearchFacilities([]);
            return;
        }
        const newSearch = searchContent.filter((facility)=>{
            if(facility?.name.toLocaleLowerCase().substring(0,n) === key.toLocaleLowerCase()){
                return facility;
            }
        })
        setSearchFacilities(newSearch);
    }
  return (
    <div className='w-full min-h-screen py-1 flex flex-col  justify-start items-center'>
        {/* search bar */}
        <div ref={searchBarRef} className='w-[50%] min-h-14 py-1  flex flex-col justify-start gap-1 relative' >
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
            <div ref={boxRef} className={`w-full top-full left-0 absolute py-1 z-[999] gap-0.5 ${hideBoxes.all?"hidden":"flex justify-between items-start"}`}>
                <div className={`w-[28%] h-98 z-50 px-2 pt-2 flex flex-col justify-start items-start shadow-lg  border bg-white border-[#f0ebfa] overflow-scroll  rounded-2xl ${hideBoxes.cities?"invisible":""}`} style={{ scrollbarWidth: 'none' }}>
                    {cities.map((city)=>{
                        if(city === 'none') return <div key={0} className='py-1 pl-1 rounded-lg w-full hover:bg-[#f0ebfa] cursor-pointer text-gray-800' onClick={()=>{setCity(""); setPage({currpage: 1, add: false})}}>none</div>
                        return <div key={city.id} className='py-1 pl-1 rounded-lg w-full hover:bg-[#f0ebfa] cursor-pointer text-gray-800' onClick={()=>{setCity(city.name); setPage({currpage: 1, add: false})}}>{city.name}</div>
                    })}
                </div>
                <div className={`w-[55%] z-50  h-98 px-3 py-2 shadow-lg  flex flex-col justify-start gap-1 border overflow-scroll border-[#f0ebfa] bg-white rounded-2xl ${hideBoxes.search?"invisible":""}`} style={{ scrollbarWidth: 'none' }}>
                    {searchedFacilities.map(facility => (
                        <div key={facility._id} className='w-full py-1 flex justify-between items-center cursor-pointer rounded-l-full rounded-r-full hover:bg-[#f0ecf9b4]' onClick={()=>navigate(`/facility/${facility._id}`)}>
                            <div className='w-14 h-14  object-contain flex justify-center items-center'>
                                <img src={facility?.profileImg} className="w-full h-full rounded-full object-cover" alt="img" />
                            </div>
                            <div className='w-[85%] flex justify-start items-center text-gray-700 font-semibold text-2xl'>
                                {facility?.name}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={`w-[17%] z-50 h-48 flex flex-col pt-2  justify-start items-center shadow-lg bg-white border border-[#f0ebfa] rounded-2xl ${hideBoxes.filter?"invisible":""}`} >
                    {/* Price */}
                    <div className='w-full h-[33%] flex flex-col px-2 justify-start items-start gap-1'>
                        <div className='w-full flex justify-between'>
                            <span>Price:</span>
                            <span>{filter.price}</span>
                        </div>
                        <input type="range" min={0} max={999} value={filter.price}  step={1} className='w-full h-0.5 cursor-pointer accent-[#5500ff] bg-gray-500' onChange={(e)=>{setFilter(prev=>({...prev, price: Number(e.target.value)})); setPage({currpage: 1, add: false});}}/>
                    </div>
                    {/* Rating */}
                    <div className='w-full h-[33%] flex flex-col px-2 justify-start items-start gap-1'>
                        <div className='w-full flex justify-between'>
                            <span>Rating:</span>
                            <span>{filter.rating}</span>
                        </div>
                        <input type="range" min={0} max={5} value={filter.rating}  step={1} className='w-full h-0.5 cursor-pointer accent-[#5500ff] bg-gray-500' onChange={(e)=>{setFilter(prev=>({...prev, rating: Number(e.target.value)})); setPage({currpage: 1, add: false})}}/>
                    </div>
                    {/* sports */}
                    <div className='w-full h-[33%] flex flex-col px-2 justify-start items-start gap-1'>
                        <select className='w-full border-0 hover:border-0 text-gray-700 bg-transparent active:border-0 ring-0 focus:border-0' style={{ scrollbarWidth: 'none' }} onChange={(e)=>{setFilter(prev=>({...prev, sport: e.target.value})); setPage({currpage: 1, add: false})}} value={filter.sport}>
                            {sports.map((sport)=>(
                                <option key={sport} value={sport} className='w-full hover:bg-[#f0ebfa] text-gray-700'>{sport}</option>
                            ))}
                        </select>
                    </div>
                    <button className='w-full text-center text-red-500 mt-1 cursor-pointer' onClick={()=>{setFilter({price: 999, sport: "all", rating: 0}); setPage({currpage: 1, add: false})}}>Clear</button>
                </div>
            </div>
        </div>
        {/* facility change */}
        <div className='w-full py-1  mt-3 flex flex-col gap-5 justify-start items-center'>
            {/* {facility card} */}
            {facilities.map((facility)=>(
                <div key={facility._id} className='w-[50%] h-38 flex relative hover:shadow-lg cursor-pointer rounded-2xl' onClick={()=>navigate(`/facility/${facility._id}`)}>
                    <div className='w-[25%] h-full bg-gray-100 overflow-clip rounded-2xl'>
                        <img src={facility.profileImg} alt="" className='w-full h-full border-0 object-cover'/>
                    </div>
                    <div className='w-[75%] h-full px-4 flex flex-col justify-start gap-2'>
                        <div className='text-gray-700 font-semibold text-2xl'>{facility.name}</div>
                        <div className='w-full py-1 flex'>
                            <div className='w-6 h-6'>
                                <img src='location.svg' alt="map pin" className='h-full w-full object-contain'/>
                            </div>
                            <div className='text-gray-700'>{`${facility.street}, ${facility.city} , ${facility.state}, ${facility.country}`}</div>
                        </div>
                        <div className='p-1 max-w-76 gap-1 flex flex-wrap'>
                            {facility.sports.map((sport)=>(
                                <div  className='px-1.5 py-0.5 rounded-l-full rounded-r-full text-[12px] bg-[#5500ff] text-white'>{sport}</div>
                            ))}
                        </div>
                        <div className='text-gray-700'>starts with: ₹ {facility.startsWith} </div>
                        <div className='absolute top-2 right-2 items-center py-0.5 px-1 rounded-[7px] flex bg-green-700'>
                            <img src="/star.svg" alt="star"  className='w-4 h-4 object-contain'/>
                            <div className='text-white font-semibold text-[16px]'>{facility.rating}</div>
                        </div>
                    </div>
                </div>
            ))}

            <div className='w-[50%] text-center text-[#5500ff] cursor-pointer' onClick={()=>setPage({currpage: page.currpage + 1, add: true})}>
                Load more
            </div>

        </div>
    </div>
  )
}

export default Book;