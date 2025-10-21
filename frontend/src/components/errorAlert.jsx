import React, { useEffect } from 'react'

function ErrorAlert({closeMsg,error}) {
    if(error === "") return null;
    useEffect(()=>{
        const timeOutId = setTimeout(()=>{
            closeMsg();
        },5000);
        return () => {
            clearTimeout(timeOutId);
        }
    })
  return (
    <div className={`sm:max-w-2xl sm:px-4 sm:py-2 px-2 py-1 border border-red-700 text-red-700 bg-red-100 rounded-xl   absolute top-3 right-1`}>
        {error}
    </div>
  )
}

export default ErrorAlert;