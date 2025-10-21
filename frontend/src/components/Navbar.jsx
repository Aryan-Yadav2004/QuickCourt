import React, { useState } from 'react';
import {Menu, X} from "lucide-react";
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
function Navbar() {
    const [open,setOpen] = useState(false);
    const login = useSelector((state)=> state.user.isLoged);

    const user = useSelector((state) => state.user.userDetail);
    const navigate = useNavigate();
  return (
    <div className='w-full h-20 top-0 relative flex items-center justify-around border-1 border-[#e3d7fb]'>
        <div className='left-0 text-3xl absolute font-bold max-w-52 ml-4'>QUICK<span className='text-[#5500ff] italic'>COURT</span></div>
        <div className='md:hidden cursor-pointer m-2 right-0 absolute max-w-8' onClick={()=>setOpen(!open)}>
            {open? <X size={28}/>: <Menu size={28}/>}
        </div>
         <div className="hidden md:flex gap-8 text-lg">
            <div  className="hover:cursor-pointer text-[#5500ff] ">Home</div>
            <div  className="hover:cursor-pointer">Book</div>
            <div  className="hover:cursor-pointer">About Us</div>
        </div>

        {
            open &&
            <div className='md:hidden  w-18 h-28 right-0 top-11 absolute text-right flex flex-col justify-around pr-1.5'>
                <div  className="hover:cursor-pointer text-[#5500ff]">Home</div>
                <div  className="hover:cursor-pointer">Book</div>
                <div  className="hover:cursor-pointer">About Us</div>
            </div>
        }

        {/* {auth section */}
        <div className="p-3 flex gap-1 items-center absolute right-0 mr-8 ">
            {login? <div className='w-full flex gap-1 items-center'>
                <img src={user?.avtar} alt="avtar" className='w-10 h-10 rounded-full' />
                <NavLink className='text-xl cursor-pointer hover:underline' to={"/profile"}>{user?.username}</NavLink>
            </div> : 
                <>
                    <div>
                        <div className='text-xl text-[#5500ff] mr-1 cursor-pointer' onClick={()=>navigate("/login")}>Login</div>
                    </div>
                    <div className='p-2 px-4 rounded-[5px] bg-[#5500ff] cursor-pointer'>
                        <div className='text-xl text-white' onClick={()=>navigate("/signup")}>Sign up</div>
                    </div>
                </>
            }
        </div>
    </div>
  )
}

export default Navbar