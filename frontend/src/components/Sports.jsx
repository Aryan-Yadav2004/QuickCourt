import React from 'react'

function Sports() {
  return (
    <div className='w-full md:h-76 h-68 flex flex-col justify-around items-center bg-[#f0ebfa]'>
        <h1 className='sm:text-4xl text-2xl font-semibold'>Select your Sport</h1>
        <div className='w-full h-[60%] flex justify-around items-center'>
            <div className='md:w-56  flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center hover:cursor-pointer'>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://images.unsplash.com/photo-1626240362781-b0265a32161a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFza2V0YmFsbHxlbnwwfDJ8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" alt="Basketball" /></div>
                <div className='sm:text-xl'>Basketball</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center hover:cursor-pointer'>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://media.istockphoto.com/id/1371823675/photo/bad-shot.webp?a=1&b=1&s=612x612&w=0&k=20&c=kATqMj0p3sGw6ccEQItAsTWYFOnCaBltlgPi47j_KpI=" alt="Volleyball" /></div>
                <div className='sm:text-xl'>Volleyball</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center hover:cursor-pointer'>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://images.unsplash.com/photo-1599982946086-eb42d9e14eb8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JpY2tldHxlbnwwfDJ8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600" alt="Cricket" /></div>
                <div className='sm:text-xl'>Cricket</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center hover:cursor-pointer'>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vdGJhbGx8ZW58MHwyfDB8fHww&auto=format&fit=crop&q=60&w=600" alt="Football" /></div>
                <div className='sm:text-xl'>Football</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center hover:cursor-pointer'>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://plus.unsplash.com/premium_photo-1673995611896-fe6d252c5b7b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFkbWludG9uJTIwcGxheWVyfGVufDB8MnwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600" alt="Badminton" /></div>
                <div className='sm:text-xl'>Badminton</div>
            </div>
            <div className='md:w-56 flex  flex-col gap-1 md:h-48 w-38 h-38 items-center text-center hover:cursor-pointer'>
                <div className='md:w-36 md:h-36 w-16 h-16 rounded-full'><img className='md:w-36 md:h-36 w-16 h-16 rounded-full' src="https://plus.unsplash.com/premium_photo-1664303119944-4cf5302bb701?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVubmlzfGVufDB8MnwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600" alt="Tennis" /></div>
                <div className='sm:text-xl'>Tennis</div>
            </div>
        </div>
    </div>
  )
}

export default Sports