import React, { useState } from 'react'

function GroupBtns() {
    
    const [isOpen,setIsOpen] = useState(false);

    let handlemainBtn = () => {
        setIsOpen(!isOpen);
    };

    
  return (
    <div className="sticky top-3 left-[97%] z-1000 max-w-56  flex flex-col gap-4">
        <button 
            id="mainBtn"
            className={`main-btn sm:w-10 sm:h-10   rounded-full active:none outline:none text-center bg-violet-400 hover:bg-violet-500 font-serif text-white text-2xl cursor-pointer sticky top-3 left-[97%] z-50 ${(isOpen? "active:": "")}`}
            onClick={handlemainBtn}
        >
            +
        </button>
        <div id="actionContainer" className="  flex flex-col gap-3 mt-2">
            <button 
                className={`${isOpen? "btn-visible":"btn-hidden"}  action-btn  btn-hidden px-8 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-full shadow-lg flex items-center justify-center focus:outline-none font-medium border border-gray-200`}
            >
                Create
            </button>
            <button 
                className={`${isOpen? "btn-visible":"btn-hidden"}  action-btn  btn-hidden px-8 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-full shadow-lg flex items-center justify-center focus:outline-none font-medium border border-gray-200`}
            >
                Track Request
            </button>
            <button 
                className={`${isOpen? "btn-visible":"btn-hidden"}  action-btn  btn-hidden px-8 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-full shadow-lg flex items-center justify-center focus:outline-none font-medium border border-gray-200`}
            >
                Bookings
            </button>
        </div>
    </div>
  )
}

export default GroupBtns;