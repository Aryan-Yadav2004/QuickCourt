import React, { useEffect, useState } from 'react'
import ErrorAlert from '../components/errorAlert';
import SuccessAlert from '../components/successAlert';
import { loginUser } from '../services/server';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { setLoged, setUser } from '../features/user/userSlice';
import NProgress from 'nprogress';




function Login() {
    useEffect(()=>{
        NProgress.configure({showSpinner: false});
    },[]);
    const navigate = useNavigate();
    const [success,setSuccess] = useState("");
    const [error,setError] = useState(""); 
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        let res = await loginUser(data);
        if(res.ok){
            setSuccess("Login successful!");
            const user = await res.json();
            dispatch(setUser(user));
            dispatch(setLoged(true));
            navigate("/");
        }
        else{
            let result = await res.json();
            
            setError(result.message);
        }
        NProgress.done();
    }

    const closeErrorMsg = () => {
        setError("");
    }

    const closeSuccessMsg = () => {
        setSuccess("");
    }

  return (
    <div className='w-full h-lvh bg-[#f0ebfa] flex justify-center items-center'>
        <div className='w-[40%] h-[50vh] bg-white rounded-2xl relative'>
            <div className='left-0 text-2xl absolute font-bold max-w-52 ml-4'>QUICK<span className='text-[#5500ff] italic'>COURT</span></div>
            <h1 className='w-full text-center text-3xl font-serif'>Login.</h1>
            <form className='w-full h-[80%] flex flex-col gap-2 items-center justify-center' onSubmit={(e) => { NProgress.start(); handleSubmit(e)}} method='POST'>
                {/* username */}
                <div className='w-[70%]'>
                    <label htmlFor="username">username:</label>
                    <input type="text" id='username' name='username' placeholder=" SonnyHayes1234" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" required/>
                </div>
                {/* password */}
                <div className='w-[70%]'>
                    <label htmlFor="password">password:</label>
                    <input type="password" id='password' name='password'  placeholder="@#VEFAR#!#R$adfa" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f0ebfa] focus:border-[#f0ebfa]" required />
                </div>
                <button className='w-[70%] px-4 py-2 bg-[#5500ff] hover:cursor-pointer rounded-xl mt-2 text-white text-xl font-serif tracking-wider'>Login</button>
            </form>
            <div className='absolute bottom-1 left-[35%]'>Don't have account? <NavLink className="text-blue-500 cursor-pointer hover:underline" to={"/signup"}>Sign Up</NavLink> </div>
        </div>
        <ErrorAlert error={error}  closeMsg={closeErrorMsg}/>
        <SuccessAlert success={success} closeMsg={closeSuccessMsg} />
    </div>
  )
}

export default Login; 