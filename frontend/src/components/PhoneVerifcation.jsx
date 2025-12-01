import React, { useEffect, useState } from 'react'

function PhoneVerifcation({isOpen,onPhoneOtpPreviewClose,phonecode,phoneNo, completeVerification}) {
    if(!isOpen) return null;
    const timeperiod = 2 * 60;
    const [timeLeft,setTimeLeft] = useState(timeperiod);
    const [userOtp,setUserOtp] = useState("");
    const [otp,setOtp] = useState("");
    const [error,setError] = useState(false);
    useEffect(()=>{
        if(!isOpen) return;
        const code = String(Math.floor(100000 + Math.random() * 900000));
        setOtp(code);
        console.log(code);
        fetch("http://localhost:3000/api/v1/sendOtp",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({otp:code,phonecode:phonecode,phoneNo:phoneNo}),
        }).then(res => res.json()).then(data => console.log(data.message));
    },[]);
    useEffect(()=>{
        if(!isOpen) return;
        if(timeLeft <= 0){
            onPhoneOtpPreviewClose();
            return
        }        
        const timeIntervalId = setInterval(()=>{
            setTimeLeft((prev) => prev - 1);
        },1000)
        return () => {
            clearInterval(timeIntervalId);
        }
    },[timeLeft])
    const onChangeUserOtp = (e) => {
        let value = e.target.value.trim();
        setUserOtp(value);
    }
    const handleVerification = () => {
        if(userOtp.trim() === otp){
            completeVerification();
            onPhoneOtpPreviewClose();
            return
        }
        setError(true);
    }
    let second = timeLeft % 60;
    let minutes = Math.floor(timeLeft / 60);
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-[#f0ebfa77] backdrop-blur-sm' >
        <div className='bg-white rounded-2xl w-11/12 max-w-md p-6 relative flex flex-col gap-2 items-center'>
            <button onClick={onPhoneOtpPreviewClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold">×</button>
            <h1>Enter OTP sent at {phoneNo} throught sms.</h1>
            <div className='w-full flex gap-2 justify-center'>
                <input type="text" name="otp" id="otp" className="w-full px-4 py-2 border max-w-60 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]"  onChange={onChangeUserOtp}/>
                <button className={`w-[19%] py-2 bg-green-200  font-medium border border-gray-300 rounded-md   text-center ${(userOtp !== "")?"text-green-900 hover:cursor-pointer hover:bg-green-300" : "text-gray-500 hover:cursor-not-allowed"}`} onClick={handleVerification}>Verify</button>
            </div>
            <h2 className='text-gray-600'>Time Left : <span className='text-red-500'>{minutes}:{second}</span> </h2>
            {error && <h2 className='text-red-500'>Invalid Otp!</h2>}
        </div>
    </div>
  )
}

export default PhoneVerifcation;