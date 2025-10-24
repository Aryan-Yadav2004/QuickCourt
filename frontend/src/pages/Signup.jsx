import React, { useEffect, useState } from 'react'
import { getCities, getCountries, getStates } from '../services/GeoDB.js';
import PhoneVerifcation from '../components/PhoneVerifcation.jsx';
import EmailVerification from '../components/EmailVerification.jsx';
import { upload } from '../services/Cloudinary.js';
import ErrorAlert from '../components/errorAlert.jsx';
import { registerUser } from '../services/server.js';
import SuccessAlert from '../components/successAlert.jsx';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email,setEmail] = useState("");
  const [phoneNo,setPhoneNo] = useState("");
  const [country,setCountry] = useState("");//
  const [verifiedEmail,setVerifiedEmail] = useState(false);
  const [verifiedPhoneNo,setVerifiedPhoneNo] = useState(false);
  const [phoneCode,setPhoneCode] = useState("");//
  const [countries,setCountries] = useState([]);
  const [states,setStates] = useState([]);
  const [countryIso2,setCountryIso2] = useState("");
  const [cities,setCitites] = useState([]);
  const [file,setFile] = useState(null)
  const [city,setCity] = useState("");
  const [avatarSizeError,setAvatarSizeError] = useState(false);
  const [emailOtpPreview,setEmailOtpPreview] = useState(false);
  const [phoneOtpPreview,setPhoneOtpPreview] = useState(false);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchCountries = async () => {
      const res = await getCountries();
      setCountries(res);
    }
    fetchCountries();
  },[]);


  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePhone = (e) => {
    if(isNaN(e.target.value)) return;
    setPhoneNo(e.target.value.trim());
  }



  const handleCountry = async(e) => {
    let value = e.target.value;
    value = value.trim();
    setCountry(value);
    const selectedCountry = countries.find(currCountry => currCountry.name === value);
    const iso2 = selectedCountry.iso2;
    setCountryIso2(iso2);
    setPhoneCode(selectedCountry.phonecode);
    const fetchedStates = await getStates(iso2);
    setStates(fetchedStates);
  }



  const handleState = async(e) => {
    let value = e.target.value
    value = value.trim();
    const selectedState = states.find(currState => currState.name === value);
    const iso2 = selectedState.iso2;
    const fetchedCities = await getCities(countryIso2,iso2);
    setCitites(fetchedCities);
  }



  const handleCity = (e) => {
    let value = e.target.value;
    value = value.trim();
    setCity(value);
  }


  const closeErrorMsg = () => {
    setError("");
  }

  const closeSuccessMsg = () => {
    setSuccess("");
  }

  const handleVerifyPhoneNo = () => {
    if(verifiedPhoneNo || phoneNo.trim().length < 10) return;
    setPhoneOtpPreview(true);
  }

  const onEmailOtpPreviewClose = () => {
    setEmailOtpPreview(false);
  }

  const onPhoneOtpPreviewClose = () => {
    setPhoneOtpPreview(false);
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

  const completePhoneVerification = () => {
    setVerifiedPhoneNo(true);
  }

  const handleVerifyEmail = () => {
    if(email.trim() === "" || verifiedEmail) return;
    setEmailOtpPreview(true);
  }

  const completeEmailVerification = () => {
    setVerifiedEmail(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!verifiedEmail || !verifiedPhoneNo){
      setError("verify email and phone number");
      return;
    }
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    let avtar = "https://i.pinimg.com/736x/9d/16/4e/9d164e4e074d11ce4de0a508914537a8.jpg";
     className='font-medium text-gray-700'
    data.avtar = avtar;
    data.phoneNo = Number(phoneNo);
    data.email = email;
    let result = await registerUser(data);
    if(result.ok){
      setSuccess("Registered successfully");
      navigate("/login");
    }
    else{
      result = await result.json();
      setError(result.message);
    }
  }

  return (
    <div className='w-full h-lvh bg-[#f0ebfa] flex justify-center items-center'>
      <div className='w-[70%] h-[70vh] bg-white rounded-2xl relative'>
        <div className='left-0 text-2xl absolute font-bold max-w-52 ml-4'>QUICK<span className='text-[#5500ff] italic'>COURT</span></div>
        <h1 className='w-full text-center text-3xl font-serif'>Sign up.</h1>
        <form className='w-full h-[80%] flex flex-col gap-2' onSubmit={handleSubmit} method='POST'>
            <div className='w-full h-full flex sm:flex-row flex-col justify-between items-center'>
              <div className='w-[48%] h-full  flex flex-col justify-around items-end'>
                  {/* name */}
                  <div className='w-[70%]'>
                    <label htmlFor="name" className='font-medium text-gray-700'>name:</label>
                    <input type="text" id='name' name='name' placeholder=" Sonny Hayes" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]"/>
                  </div>
                  {/* username */}
                  <div className='w-[70%]'>
                    <label htmlFor="username" className='font-medium text-gray-700'>username:</label>
                    <input type="text" id='username' name='username' placeholder=" SonnyHayes1234" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]"/>
                  </div>
                  {/* Email */}
                  <div className='w-[70%]'>
                    <label htmlFor="email" className='font-medium text-gray-700'>email:</label>
                    <div className='w-full flex justify-between'>
                      <input type="text" id='email' name='email' value={email}  placeholder=" SonnyHayes@gmail.com" className="w-[79%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" onChange={handleEmail} required disabled={verifiedEmail}/>
                      <button className={`w-[19%] py-2 bg-green-200  font-medium border border-gray-300 rounded-md   text-center ${(email.length > 0 && !verifiedEmail)?"text-green-900 hover:cursor-pointer hover:bg-green-300" : "text-gray-500 hover:cursor-not-allowed"}`} type='button' onClick={handleVerifyEmail}>verify</button>
                    </div>
                    {
                      email.length > 0 ? (
                        verifiedEmail ? (
                          <p className='text-green-500'>    &#10003;Verified</p>
                        ) : (
                          <p className='text-red-500'>Not Verified</p>
                        )
                      ) : <></>
                    }
                  </div>
                  {/* phoneno */}
                  <div className='w-[70%]'>
                    <label htmlFor="phoneNo" className='font-medium text-gray-700'>Phone No:</label>
                    <div className='w-full flex justify-between gap-0.5'>
                      <div className='w-[18%] py-2 text-center border border-gray-300 rounded-md'>+{phoneCode}</div>
                      <input type="text" id='phoneNo' name='phoneNo' value={phoneNo} placeholder=" XXXXXXXX78" className="w-[78%] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" onChange={handlePhone} required disabled={verifiedPhoneNo}/>
                      <button className={`w-[18%] py-2 bg-green-200  font-medium border border-gray-300 rounded-md   text-center ${((phoneNo.length > 0 && country!=="") && !verifiedPhoneNo)?"text-green-900 hover:cursor-pointer hover:bg-green-300" : "text-gray-500 hover:cursor-not-allowed"}`} type="button" onClick={handleVerifyPhoneNo}>verify</button>
                    </div>
                    {
                      phoneNo.length > 0 ? (
                        verifiedPhoneNo ? (
                          <p className='text-green-500'>    &#10003; Verified</p>
                        ) : (
                          (country==="") ? (<p className='text-red-500'>Select country before verifying</p>):<p className='text-red-500'>Not Verified</p>
                        )
                      ) : <></>
                    }
                  </div>
                  {/* password */}
                  <div className='w-[70%]'>
                    <label htmlFor="password" className='font-medium text-gray-700'>password:</label>
                    <input type="password" id='password' name='password'  placeholder="@#VEFAR#!#R$adfa" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" required />
                  </div>
              </div>
              <div className='w-[48%] h-full  flex flex-col justify-around items-start'>
                    {/* country */}
                    <div className='w-[70%]'>
                      <label htmlFor="country" className='font-medium text-gray-700'>Country:</label>
                      <select id='country' name='country' className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" onChange={handleCountry}>
                        {countries.map(currCountry => (
                          <option key={currCountry.id}  value={currCountry.name}>{currCountry.name}</option>
                        ))}
                      </select>
                    </div>
                    {/* state */}
                    <div className='w-[70%]'>
                      <label htmlFor="state" className='font-medium text-gray-700'>State:</label>
                      <select id='state' name='state' className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" onChange={handleState}>
                        {states.map(currState => (
                          <option key={currState.id}  value={currState.name}>{currState.name}</option>
                        ))}
                      </select>
                    </div>
                    {/* city */}
                    <div className='w-[70%]'>
                      <label htmlFor="city" className='font-medium text-gray-700'>City:</label>
                      <select id='city' name='city' className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" onChange={handleCity}>
                        {cities.map(currCity => (
                          <option key={currCity.id}  value={currCity.name}>{currCity.name}</option>
                        ))}
                      </select>
                    </div>
                    {/* street */}
                    <div className='w-[70%]'>
                      <label htmlFor="street" className='font-medium text-gray-700'>Street:</label>
                      <input type="text" id='street' name='street'  placeholder=" Las Vegas Strip" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" required />
                    </div>
                    {/* role */}
                    <div className='w-[70%]'>
                      <label htmlFor="role" className='font-medium text-gray-700'>Role:</label>
                      <select name="role" id="role" className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]">
                        <option value="user">User</option>
                        <option value="facilityOwner">Facility Owner</option>
                      </select>
                    </div>
                    {/* profile photo */}
                    <div className='w-[70%]'>
                      <label htmlFor="avatar" className='font-medium text-gray-700'>Profile Image:</label>
                      <input type = "file" accept = "image/*" className = "block w-full px-4 py-1 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#f0ebfa] file:text-[#5500ff] hover:file:bg-[#e5dcfb]" onChange={onFileChange}/>
                      {avatarSizeError? <p className = 'text-red-500'>Image size should be less than or equal 10MB</p>:<></>}
                    </div>
              </div>
            </div>
            <button type='submit' className='bottom-0 left-[50%] m-auto px-3 py-2 rounded-2xl max-w-sm text-white bg-[#5500ff] text-center cursor-pointer'>register</button>
        </form>
        <h2 className='text-center bottom-0.5 left-[40%] absolute'>Already have an account?<Link to={'/login' } className={"text-blue-600 hover:underline"}> Login</Link> </h2>
      </div>
      <PhoneVerifcation isOpen={phoneOtpPreview} onPhoneOtpPreviewClose={onPhoneOtpPreviewClose} phonecode={phoneCode} phoneNo={phoneNo} completeVerification={completePhoneVerification}/>
      <EmailVerification isOpen={emailOtpPreview} onEmailOtpPreviewClose={onEmailOtpPreviewClose} email={email} completeVerification={completeEmailVerification}/>
      <ErrorAlert error={error} closeMsg={closeErrorMsg} />
      <SuccessAlert success={success} closeMsg={closeSuccessMsg} />
    </div>
  )
}

export default Signup;