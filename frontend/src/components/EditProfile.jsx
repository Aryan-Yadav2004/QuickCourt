import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCities, getCountries, getStates } from '../services/GeoDB';
import { updateUser } from '../services/server';
import ErrorAlert from './errorAlert';
import SuccessAlert from './successAlert';
import {upload} from '../services/Cloudinary.js'

function EditProfile() {
    const user = useSelector((state) => state.user?.userDetail);
    const [states,setStates] = useState([]);
    const [cities,setCitites] = useState([]);
    const [countryIso2,setCountrtyIso2] = useState();
    const [file,setFile] = useState(null)
    const [avatarSizeError, setAvatarSizeError] = useState(false);
    const [name, setName] = useState(user?.name);
    const [street,setStreet] = useState(user?.street);
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    let role = "";
    if(user?.role === "facilityOwner"){
        role = "Facility Owner";
    }
    else if(user?.role === "user"){
        role = "User";
    }
    else{
        role = "Admin";
    }
    useEffect(() => {
        if(!user) return;
        const fetchCountries = async () => {
            const countries = await getCountries();
            const country = countries.find((currCountry) => currCountry.name === user.country);
            const iso2 = country.iso2;
            const fetchedStates = await getStates(iso2);
            setStates(fetchedStates);
            setCountrtyIso2(iso2);
        }
        fetchCountries();
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        console.log(formData);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        let avtar = user?.avtar;
        if(file){
            const res = await upload(file);
            if(res.status === 200){
                avtar = res.message;
            }
            else{
                setError(res.message);
            }
        }
        data.avtar = avtar;
        let res = await updateUser(user?._id,data);
        if(res.ok){
            setSuccess("updated successfully!");
        }
        else{
            let result = await res.json();
            setError(result.message);
        }
    }
    const handleState = async (e) => {
        const value = e.target.value.trim();
        if(value === "" || !value) return;
        const selectedState = states.find((currState) => currState.name === value);
        console.log(selectedState);
        const stateIso2 = selectedState.iso2;
        const fetchedCities = await getCities(countryIso2,stateIso2);
        console.log(fetchedCities);
        setCitites(fetchedCities);
    }
    const onFileChange = (e) => {
        const f = e.target.files[0];
        if(!f) return;
        if(f.size > 10 * 1024 * 1024){
        setAvatarSizeError(true);
        e.target.value = "" // clear input
        return;
        }
        setFile(f);
    }
    const handleName =  (e) => {
        const value = e.target.value;
        setName(value);
    }
    const handleStreet =  (e) => {
        const value = e.target.value;
        setStreet(value);
    }
    const closeErrorMsg = () => {
        setError("");
    }

    const closeSuccessMsg = () => {
        setSuccess("");
    }
  return (
    <div className='w-full h-[70vh] bg-white relative  flex justify-center items-center'>
        <form className='w-full h-[80%] flex flex-col gap-2' onSubmit={handleSubmit} method='POST'>
            <div className='w-full h-full flex sm:flex-row flex-col justify-between items-center'>
                <div className='w-[48%] h-full  flex flex-col justify-around items-end'>
                    {/* name */}  
                    <div className='w-[70%]'>
                        <label htmlFor="name">name:</label>
                        <input type="text" id='name' name='name' value={name} placeholder=" Sonny Hayes" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" onChange={handleName}/>
                    </div>
                    {/* username */}
                    <div className='w-[70%]'>
                        <label htmlFor="username">username:</label>
                        <input type="text" id='username' name='username' value={user?.username} placeholder=" SonnyHayes1234" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-gray-200 cursor-not-allowed focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" readOnly={true} disabled={true}/>
                    </div>
                    {/* Email */}
                    <div className='w-[70%]'>
                        <label htmlFor="email">email:</label>
                        <input type="text" id='email' name='email' value={user?.email}  placeholder=" SonnyHayes@gmail.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] bg-gray-200 cursor-not-allowed focus:border-[#f0ebfa]"  readOnly={true}  disabled={true}/>
                    </div>
                    {/* phoneno */}
                    <div className='w-[70%]'>
                        <label htmlFor="phoneNo">Phone No:</label>
                        <input type="text" id='phoneNo' name='phoneNo' value={user?.phoneNo} placeholder=" XXXXXXXX78" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] bg-gray-200 cursor-not-allowed focus:border-[#f0ebfa]" readOnly={true}  disabled={true}/>                
                    </div>   
                    {/* role */}
                    <div className='w-[70%]'>
                        <label htmlFor="role">Role:</label>
                        <input name="role" id="role" value={role} className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] bg-gray-200 cursor-not-allowed focus:border-[#f0ebfa]" readOnly={true} disabled={true} />
                    </div>                 
                </div>
                <div className='w-[48%] h-full  flex flex-col justify-around items-start'>
                    {/* country */}
                    <div className='w-[70%]'>
                        <label htmlFor="country">Country:</label>
                        <input id='country' name='country' value={user?.country} className="w-full px-4 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] bg-gray-200 cursor-not-allowed"  readOnly={true} disabled={true}/>
                    </div>
                    {/* state */}
                    <div className='w-[70%]'>
                        <label htmlFor="state">State:</label>
                        <select id='state' name='state' defaultValue={user?.state} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" onChange={handleState}>
                        {states.map(currState => (
                            <option key={currState.id}  value={currState.name} >{currState.name}</option>
                        ))}
                        </select>
                    </div>
                    {/* city */}
                    <div className='w-[70%]'>
                        <label htmlFor="city">City:</label>
                        <select id='city' name='city' defaultValue={user?.city} className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" >
                        {cities.map(currCity => (
                            <option key={currCity.id}  value={currCity.name} >{currCity.name}</option>
                        ))}
                        </select>
                    </div>
                    {/* street */}
                    <div className='w-[70%]'>
                        <label htmlFor="street">Street:</label>
                        <input type="text" id='street' value={street} name='street'  placeholder=" Las Vegas Strip" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" onChange={handleStreet} />
                    </div>
                    
                    {/* profile photo */}
                    <div className='w-[70%]'>
                        <label htmlFor="avtar">Profile Image:</label>
                        <input type="file" id='avtar' accept="image/*" className=" block w-full px-4 py-1 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f0ebfa] file:text-[#5500ff] hover:file:bg-[#e5dcfb]" onChange={onFileChange}/>
                        {avatarSizeError? <p className='text-red-500'>Image size should be less than or equal 10MB</p>:<></>}
                    </div>
                </div>
            </div>
            <button type='submit' className='bottom-0 left-[50%] m-auto px-3 py-2 rounded-2xl max-w-sm text-white bg-[#5500ff] text-center cursor-pointer'>Save</button>
        </form>
        <ErrorAlert error={error} closeMsg={closeErrorMsg} />
        <SuccessAlert success={success} closeMsg={closeSuccessMsg} />
    </div>
  )
}

export default EditProfile;