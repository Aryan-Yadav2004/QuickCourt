import React from 'react'

function HeroSection() {
  return (
    <div className='w-full h-124  flex justify-between'>
        <div className='w-full md:w-[50%]  h-full flex flex-col justify-center sm:px-[10%] gap-6 text-left  '>
            <div className='text-4xl font-bold'>
                <div>FIND PLAYERS & VENUE</div>
                <div className='flex gap-1 justify-start'><div>NEARBY</div><img className='w-10 h-10' src="location.svg" alt="" /></div>
            </div>
            <div className='text-xl text-[#5500ff]'>
                <div>Seamlessly explore sports venues and play with</div>
                <div>sports enthusiasts just like you!</div>
            </div>
            <div className='p-4 pl-0  flex gap-2'>
                <button className='w-38 h-14 hover:cursor-pointer p-1 rounded-4xl text-2xl  text-white border-1 bg-[#5500ff]  flex gap-1 items-center' onClick={()=>console.log("court")}>
                    <img className='w-12 h-12' src="volleyballBtn.svg" alt='volleyball' />
                    <span>Court</span>
                </button>
            </div>
        </div>
        <div className='hidden md:block w-[50%] h-full'>
            <img className='w-full h-full' src="heroSectionBg.svg" alt="basketball"/>
        </div>
    </div>
  )
}

export default HeroSection