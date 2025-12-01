import React, { useState,useEffect } from 'react'
import { upload } from '../services/Cloudinary.js';
import { getCities, getCountries, getStates } from '../services/GeoDB.js';
import ErrorAlert from './errorAlert.jsx';
import SuccessAlert from './successAlert.jsx';
import {useSelector} from "react-redux"
import { createFacility, upLoadPdf } from '../services/server.js';
import NProgress from 'nprogress'; 
import "nprogress/nprogress.css";



function CreateFacility() {
    const [countries,setCountries] = useState([]);
    const [states,setStates] = useState([]);
    const [countryIso2,setCountryIso2] = useState("");
    const [cities,setCitites] = useState([]);
    const [profilePhoto,setProfilePhoto] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [legalDocument,setLegalDocument] = useState(null);
    const [profilePhotoSizeError,setProfilePhotoSizeError] = useState(false);
    const [photosSizeError,setPhotosSizeError] = useState(false);
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    const [selectedAmenities,setSelectedAmenities] = useState([]);
    const [isDisabled,setIsDisabled] = useState(false);
    const amenitiesList = ["Parking","Restrooms","Locker Rooms","Shower Rooms","Waiting Area","Changing Rooms","Drinking Water","Reception Desk","Free WiFi","Air Conditioning","Power Backup","First Aid Kit","Medical Room","Viewing Gallery","CCTV Surveillance","Security Guard"];
    useEffect(()=>{
        const fetchCountries = async () => {
            const res = await getCountries();
            setCountries(res);
        }
        fetchCountries();
        NProgress.configure({showSpinner: false});
    },[]);
    const handleCountry = async(e) => {
        let value = e.target.value;
        value = value.trim();
        const selectedCountry = countries.find(currCountry => currCountry.name === value);
        const iso2 = selectedCountry.iso2;
        setCountryIso2(iso2);
        const fetchedStates = await getStates(iso2);
        setStates(fetchedStates);
    }
    const user = useSelector(state => state.user.userDetail);
    const handleState = async(e) => {
        let value = e.target.value
        value = value.trim();
        const selectedState = states.find(currState => currState.name === value);
        const iso2 = selectedState.iso2;
        const fetchedCities = await getCities(countryIso2,iso2);
        setCitites(fetchedCities);
    }
    const onProfilePhotoChange = (e) => {
        const f = e.target.files[0];
        if(!f) return;
        if(f.size > 10 * 1024 * 1024){
            setProfilePhotoSizeError(true);
            e.target.value = "" // clear input
            return;
        }
        setProfilePhoto(f);
    }
    const handleAmenitiyChange = (amenity) => {
        if(selectedAmenities.includes(amenity)){
            setSelectedAmenities((prev)=> prev.filter((a)=> a!==amenity));
        }
        else{
            setSelectedAmenities(prev => [...prev,amenity]);
        }
    }
    const onLegalDocumentChange = (e) => {
        const f = e.target.files[0];
        if(!f) return;
        if(f.type !== "application/pdf"){
            setError("Document Should be in pdf format");
            return;
        }
        setLegalDocument(f);
    }
    const onPhotosChange = (e) => {
        let f = Array.from(e.target.files);
        console.log(f)
        if(!f) return;
        for(let photo of f){
            if(photo.size > 100 * 1024 * 1024){
                setPhotosSizeError(true);
                e.target.value = "" // clear input
                return;
            }
        }
        if(f.length > 5){
            f = f.slice(0,5);
        }
        setPhotos(f);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        NProgress.start();
        if(isDisabled) {
            NProgress.done();
            return;
        }
        setIsDisabled(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        let profilePhotoLink = ""
        if(profilePhoto){
            let resProfilePhoto = await upload(profilePhoto);
            if(resProfilePhoto.status === 200){
                profilePhotoLink = resProfilePhoto.message;
            }
            else{
                setError(resProfilePhoto.message + " error in profile photo");
                setIsDisabled(false);
                return;
            }
        }
        let legalDocLink = "";
        if(legalDocument){
            let res = await upLoadPdf(legalDocument);
            if(res.ok){
                let data = await res.json();
                legalDocLink = data.url;
            }
            else{
                let data = await res.json();
                setError(data.message);
                setIsDisabled(false);
                return;
            }
        }
        let photosArray = [];
        for(let photo of photos){
            if(photo){
                const resPhoto = await upload(photo);
                if(resPhoto.status === 200){
                    photosArray.push(resPhoto.message);
                }
                else{
                    setError(resPhoto.message + " error in photos");
                    setIsDisabled(false);
                    return;
                }
            }
        }
        const facility = {name: data.name, country: data.country, state: data.state, street: data.street, profileImg: profilePhotoLink, photos: photosArray, legalDocument: legalDocLink, owner: user._id, pinCode: data.pinCode, about: data.about, city: data.city, amenities: selectedAmenities, status: "pending", createdAt: Date.now()}
        const res = await createFacility(facility);
        if(res.ok){
            setSuccess("request sent");
        }
        else{
            let result = await res.json();
            setError(result.message);
        }
        setIsDisabled(false);
        NProgress.done();
    }
    const closeErrorMsg = () => {
        setError("");
    }

    const closeSuccessMsg = () => {
        setSuccess("");
    }
  return (
    <>
    <div className='w-[90%] h-[80vh] mx-[auto] bg-transparent'>
        <h1 className='font-bold font-serif text-center text-2xl'>Create Facility</h1>
        <form className='w-full h-full flex flex-col sm:flex-row justify-center items-center relative ' onSubmit={handleSubmit}>
            <div className='sm:w-[33%] w-full sm:h-full h-[40vh] flex flex-col justify-start items-center gap-4'>
                {/* name */}
                <div className='w-[70%]'>
                    <label htmlFor="name" className='font-medium text-gray-700'>Facility name:</label>
                    <input type="text" id='name' name='name' placeholder="Game Arena" className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] ${isDisabled?"cursor-not-allowed":"cursor-pointer"}`} required />
                </div>
                {/* country */}
                <div className='w-[70%]'>
                    <label htmlFor="country" className='font-medium text-gray-700'>Country:</label>
                    <select id='country' name='country' className={`w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] ${isDisabled?"cursor-not-allowed":"cursor-pointer"}`} onChange={handleCountry} required>
                        {countries.map(currCountry => (
                        <option key={currCountry.id}  value={currCountry.name}>{currCountry.name}</option>
                        ))}
                    </select>
                </div>
                {/* state */}
                <div className='w-[70%]'>
                    <label htmlFor="state" className='font-medium text-gray-700'>State:</label>
                    <select id='state' name='state' className={`w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] ${isDisabled?"cursor-not-allowed":"cursor-pointer"}`} onChange={handleState} required>
                        {states.map(currState => (
                        <option key={currState.id}  value={currState.name}>{currState.name}</option>
                        ))}
                    </select>
                </div>
                {/* city */}
                <div className='w-[70%]'>
                    <label htmlFor="city" className='font-medium text-gray-700'>City:</label>
                    <select id='city' name='city' className={`w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] ${isDisabled?"cursor-not-allowed":"cursor-pointer"}`} required>
                    {cities.map(currCity => (
                        <option key={currCity.id}  value={currCity.name}>{currCity.name}</option>
                    ))}
                    </select>
                </div>
                {/* street */}
                <div className='w-[70%]'>
                    <label htmlFor="street" className='font-medium text-gray-700'>Street:</label>
                    <input type="text" id='street' name='street'  placeholder=" Las Vegas Strip" className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] ${isDisabled?"cursor-not-allowed":"cursor-pointer"}`} required />
                </div>
                {/* pinCode */}
                <div className='w-[70%]'>
                    <label htmlFor="pinCode" className='font-medium text-gray-700'>Pin Code:</label>
                    <input type="text"  id='pinCode' name='pinCode'  placeholder="88999" className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] ${isDisabled?"cursor-not-allowed":"cursor-pointer"}`} required />
                </div>
            </div>
            <div className='sm:w-[33%] w-full sm:h-full h-[40vh] flex flex-col justify-start items-center '>
                {/* about */}
                <div className='w-[70%]'>
                    <label htmlFor="abuot" className='font-medium text-gray-700'>About:</label>
                    <textarea type="text" id='about' name='about'  placeholder=" Give brief description about your facility" className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] ${isDisabled?"cursor-not-allowed":"cursor-pointer"}`} required />
                </div>
                {/* profile photo */}
                <div className='w-[70%]'>
                    <label htmlFor="profileImg" className='font-medium text-gray-700'>Profile Image:</label>
                    <input type="file" id='profileImg' accept="image/*" name='profileImg'  className=" block w-full px-4 py-1 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f0ebfa] file:text-[#5500ff] hover:file:bg-[#e5dcfb]" onChange={(e) => {if(isDisabled) return; onProfilePhotoChange(e);}} required/>
                    {profilePhotoSizeError? <p className='text-red-500'>Image size should be less than or equal 10MB</p>:<></>}
                </div>
                {/* Facility photos */}
                <div className='w-[70%]'>
                    <label htmlFor="photos" className='font-medium text-gray-700'>Facility Images:</label>
                    <input type="file" id='photos' accept="image/*" name='photos'  className=" block w-full px-4 py-1 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f0ebfa] file:text-[#5500ff] hover:file:bg-[#e5dcfb]" onChange={(e)=>{if(isDisabled) return; onPhotosChange(e);}} multiple={true} required/>
                    {photosSizeError? <p className='text-red-500'>Image size should be less than or equal 10MB</p>:<></>}
                </div>
                {/* Legal Document */}
                <div className='w-[70%]'>
                    <label htmlFor="legalDocument" className='font-medium text-gray-700'>Legal Document:</label>
                    <input type="file" id='legalDocument' accept="" name='legalDocument'  className=" block w-full px-4 py-1 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f0ebfa] file:text-[#5500ff] hover:file:bg-[#e5dcfb]" onChange={(e) => {if(isDisabled) return; onLegalDocumentChange(e)}} required/>
                    <p className='text-gray-500'>* Upload a legal document in pdf or any other format that proves your ownership toward facility</p>
                </div>
                
            </div>
            <div className='sm:w-[33%] w-full sm:h-full h-[40vh] flex flex-col justify-start items-center gap-4'>
                <div className='w-[70%]'>
                    <label htmlFor="" className="block mb-1 font-medium text-gray-700">
                        Select Amenities:
                    </label>
                    <div class="flex flex-wrap gap-2 w-full">
                        {amenitiesList.map((amenity)=>(
                            <label class="flex items-center space-x-2">
                                <input type="checkbox" class="accent-[#a78bfa] w-4 h-4 focus:ring-[#f0ebfa]" onChange={()=>{if(isDisabled) return; handleAmenitiyChange(amenity)}}/>
                                <span>{amenity}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <button type='submit' className={`bottom-0 left-[45%] absolute m-auto px-3 py-2 rounded-l-full rounded-r-full max-w-sm text-white ${isDisabled? "bg-[#d9c5ff] cursor-not-allowed":"bg-[#5500ff] cursor-pointer"} text-center`} disabled={isDisabled}>Send Request</button>
        </form>
    </div>
    <ErrorAlert error={error} closeMsg={closeErrorMsg} />
    <SuccessAlert success={success} closeMsg={closeSuccessMsg} />
    </>
  )
}

export default CreateFacility;