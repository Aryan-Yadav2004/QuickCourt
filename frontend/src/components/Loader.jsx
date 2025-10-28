import React from 'react';
function Loader() {
  return (
    <div className='w-full h-full flex justify-center items-center z-50 bg-gray-100 blur-2xl opacity-50'>
        <img id="volleyball" src="/volleyball.png" />
        {/* <div className='text-black text-2xl'>Loading...</div> */}
    </div>
  )
}

export default Loader;