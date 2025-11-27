import React from 'react'

function Sports() {
  return (
    <div className='w-full md:h-76 h-68 flex flex-col justify-around items-center bg-[#f0ebfa43]'>
        <h1 className='sm:text-4xl text-2xl font-semibold'>Enjoy your favourite sport.</h1>
        <div className='w-full h-[60%] flex  justify-center items-center'>
            <div className='md:w-56  flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center '>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://images.unsplash.com/photo-1626240362781-b0265a32161a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFza2V0YmFsbHxlbnwwfDJ8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" alt="Basketball" /></div>
                <div className='sm:text-xl'>Basketball</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center '>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://t3.ftcdn.net/jpg/15/76/56/64/240_F_1576566494_EvHbW0XGLGVe5If8Vm7utDGdfJg3PmRm.jpg" alt="Volleyball" /></div>
                <div className='sm:text-xl'>Volleyball</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center '>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://images.unsplash.com/photo-1599982946086-eb42d9e14eb8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JpY2tldHxlbnwwfDJ8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" alt="Cricket" /></div>
                <div className='sm:text-xl'>Cricket</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center '>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbGx8ZW58MHwyfDB8fHww&auto=format&fit=crop&q=60&w=600" alt="Football" /></div>
                <div className='sm:text-xl'>Football</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center '>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://plus.unsplash.com/premium_photo-1673995611896-fe6d252c5b7b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFkbWludG9uJTIwcGxheWVyfGVufDB8MnwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600" alt="Badminton" /></div>
                <div className='sm:text-xl'>Badminton</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center '>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://plus.unsplash.com/premium_photo-1664303119944-4cf5302bb701?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVubmlzfGVufDB8MnwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600" alt="Tennis" /></div>
                <div className='sm:text-xl'>Tennis</div>
            </div>
        </div>
    </div>
  )
}

export default Sports