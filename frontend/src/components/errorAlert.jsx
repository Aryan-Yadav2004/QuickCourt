import React, { useEffect } from 'react'

function ErrorAlert({msg,closeMsg,error}) {
    if(msg === "") return null;
    useEffect(()=>{
        const timeOutId = setTimeout(()=>{
            closeMsg();
        },5000);
        return () => {
            clearTimeout(timeOutId);
        }
    })
  return (
    <div className={`sm:max-w-2xl sm:px-4 sm:py-2 px-2 py-1 border ${error?"border-red-700 text-red-700 bg-green-100":"border-green-700 text-green-700 bg-red-100"} border-red-700 text-red-700 bg-red-100 rounded-xl   absolute top-3 right-1`}>
        {error}
    </div>
  )
}

export default ErrorAlert;