import React from 'react'

function FacilityCard({facility}) {
  return (
    <div className="bg-[#ffffff] rounded-lg  w-full">
        <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-48 md:w-64 flex-shrink-0">
                <img 
                    src={facility.profileImg} 
                    alt="Profile" 
                    className="w-full h-48 sm:h-full object-cover rounded-lg "
                />
             </div>
            
            <div className="p-6 flex-1  relative">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{facility.name}</h2>
                <p><b>Location:</b> {`${facility.street}, ${facility.city}`}</p>
                <p>{`${facility.state}, ${facility.country}`}</p>
                <p><b>About: </b>{facility.about}</p>
                <p>Starts With: </p>
                <div className='absolute top-2 right-2 items-center py-1 px-2 rounded-[10px] flex bg-green-700'>
                    <img src="/star.svg" alt="star"  className='w-5 h-5 object-contain'/>
                    <div className='text-white font-semibold'>4.5</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FacilityCard