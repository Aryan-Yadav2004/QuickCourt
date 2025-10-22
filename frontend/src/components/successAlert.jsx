import React, { useEffect } from 'react'

function SuccessAlert({closeMsg,success}) {
    if(success === "") return null;
    useEffect(()=>{
        const timeOutId = setTimeout(()=>{
            closeMsg();
        },5000);
        return () => {
            clearTimeout(timeOutId);
        }
    },[])
  return (
    <div className={`sm:max-w-2xl sm:px-4 sm:py-2 px-2 py-1 border border-green-700 text-green-700 bg-green-100 rounded-xl   absolute top-3 right-1`}>
        {success}
    </div>
  )
}

export default SuccessAlert;