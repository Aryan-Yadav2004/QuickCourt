import React, { useEffect, useRef, useState } from 'react'
import { Users, Building2, Calendar, TrendingUp, CheckCircle, XCircle, AlertCircle, Search, Filter, ArrowLeftCircle } from 'lucide-react';
import { allPendingRequest, replyRequest } from '../services/server';
import ErrorAlert from './errorAlert';
import SuccessAlert from './successAlert';

function FacilityManagement() {
  const [request,setRequest] = useState(null);
  const [requests,setRequests] = useState([]);
  const [images, setImages] = useState([]);
  const [image,setImage] = useState("");
  const [page, setPage] = useState(1);
  const limit = useRef(2);
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  useEffect(() => {
    const fetchRequest = async () => {
      const res = await allPendingRequest(page,limit.current);
      if(res.ok){
        const pendingRequest = await res.json();
        setRequests((prev) => [...prev, ...pendingRequest.facilities]);
      }
      else{
        const err = await res.json();;
        
        console.log(err.message);
      }
      setLoading(false);
    }
    fetchRequest();
    
  },[page]);
  const [loading, setLoading] = useState(false);
  const handleLoadmore = async () => {
    if(loading) return;
    setLoading(true);
    setPage(page + 1);
  }
  const handleVerfication = (facility) => {
    setRequest(facility);
    setImage(facility.profileImg);
    setImages([facility.profileImg,...facility.photos]);
  }
  const handleNavigateBack = () => {
    setRequest(null);
    setImage("");
    setImages([]);
  }

  const closeErrorMsg = () => {
    setError("");
  }

  const closeSuccessMsg = () => {
    setSuccess("");
  }

  const handleRequestAnswer = async(facility,answer) => {
    let res = await replyRequest(facility._id,answer);
    if(res.ok){
      let data = await res.json();
      setSuccess("request answered");
      let newRequests = requests.filter((req) => facility._id !== req._id);
      setRequests(newRequests);
    }
    else{
      let data = await res.json();
      setError(data.message);
    }
  }

  return (
  <>
    {(!request) ? 
      <>
      <div className='w-full max-h-[87vh] relative facilityContainer overflow-scroll gap-2 flex flex-col '>
        {/* request card */} 
        {requests.map((req) => (
          <div key={req._id} className="bg-white rounded-lg  p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{req.name}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p><span className="font-medium">Owner:</span>{req.owner.name}</p>
                    <p><span className="font-medium">Location:</span> Bilaspur, Chhattisgarh </p>
                  </div>
                  <div>
                    <p><span className="font-medium">Submitted:</span> {req.createdAt}</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer" onClick={()=>handleRequestAnswer(req,"accepted")}>
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer" onClick={()=>handleRequestAnswer(req,"rejected")}>
                    <XCircle size={18} />
                    Reject
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer" onClick={()=>handleVerfication(req)}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='w-full p-1 flex justify-center items-center'>
          <button className={`mx-auto p-2 active:outline-none bg-transparent text-center ${loading?"text-gray-400 cursor-not-allowed":"text-[#6c22ff] cursor-pointer"} `} onClick={handleLoadmore}>Load more</button>
        </div>
        <ErrorAlert error={error} closeMsg={closeErrorMsg} />
        <SuccessAlert success={success} closeMsg={closeSuccessMsg} />
      </div>
      </>
      :
      <>
        <div className='w-full h-full p-2 bg-white rounded-2xl relative flex flex-col overflow-scroll facilityContainer'>
          <div className='p-1 rounded-full absolute top-1 left-1 cursor-pointer' onClick={handleNavigateBack}>
            <ArrowLeftCircle size={24} color='gray' />
          </div>
          <div className='w-full h-[70vh]  flex flex-col sm:flex-row'>
            {/* image */}
            <div className='sm:h-full h-[50%] sm:w-[50%] w-full  p-2 flex flex-col items-center'>
              <div className='w-[90%] h-[70%]  bg-gray-100 flex items-center justify-center overflow-hidden'>
                <img src={image} alt="preview" className="w-full h-full object-contain" />
              </div>
              <div className='w-[90%] h-[30%]  flex justify-around items-center'>
                {images.map((imageLink)=>(
                  <div className={`w-20 h-20  ${image===imageLink? "border-4 border-violet-500":"border border-gray-300"} flex items-center justify-center cursor-pointer`} onClick={()=>setImage(imageLink)}>
                    <img src={imageLink} alt="preview" className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
            {/* details */}
            <div className='sm:h-full h-[50%] sm:w-[50%] w-full  flex flex-col items-start px-2 py-3 gap-2'>
              <h1 className=' text-4xl font-semibold text-gray-800'>{request.name}</h1>
              <p className='text-gray-700 max-w-[80%] p-1'><b>About:</b> <i>{request.about}</i></p>
              <p className='text-gray-700 p-1'><b>Owner:</b> <i>{request.owner.name}</i> </p>
              <div className='w-full '>
                <hr style={{color: "#a073fa", width: "80%",}} />
              </div>
              <div className='w-full p-1'>
                <h2 className='text-gray-700 text-xl font-semibold'>Features</h2>
                <ul className="list-disc marker:text-violet-500 list-inside  text-gray-700">
                  {request.amenities.map((amenty)=>(
                    <li>{amenty}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
          <div className='w-full p-1 flex flex-col gap-2 ml-4'>
                <div className='p-1 flex gap-2'>
                <p>Legal Document: </p>
                <a
                  href={request.legalDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline cursor-pointer"
                >
                  Download legal Document
                </a>
              </div>

              <div className="mt-2 flex gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer" onClick={async()=>{ await handleRequestAnswer(request,"accepted"); handleNavigateBack();}}>
                  <CheckCircle size={18} />
                  Approve
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer" onClick={async()=>{ await handleRequestAnswer(request,"rejected"); handleNavigateBack();}}>
                  <XCircle size={18} />
                  Reject
                </button>
              </div>

          </div>
        </div>
      </>
    }
  </>
    
  )
}

export default FacilityManagement