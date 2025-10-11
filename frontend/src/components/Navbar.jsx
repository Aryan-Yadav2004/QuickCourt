import React, { useState } from 'react';
import {Menu, X} from "lucide-react";

function Navbar() {
    const [open,setOpen] = useState(false);
    const login = false;
  return (
    <div className='w-full h-20 top-0 relative flex items-center justify-around '>
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

        {/* {auth page} */}
        <div className="p-3 pt-0 flex gap-1 items-center absolute right-0 mr-8 ">
            {login? <></> : 
            
                <>
                    <div>
                        <div className='text-xl text-[#5500ff] mr-1 cursor-pointer'>Login</div>
                    </div>
                    <div className='p-2 px-4 rounded-[5px] bg-[#5500ff] cursor-pointer'>
                        <div className='text-xl text-white'>SignUp</div>
                    </div>
                </>
            }
        </div>
    </div>
  )
}

export default Navbar