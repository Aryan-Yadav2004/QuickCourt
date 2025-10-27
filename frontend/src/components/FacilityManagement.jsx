import React, { useState } from 'react'
import { Users, Building2, Calendar, TrendingUp, CheckCircle, XCircle, AlertCircle, Search, Filter, ArrowLeftCircle } from 'lucide-react';

function FacilityManagement() {
  const [request,setRequest] = useState(10);
  
  const amenitiesList = ["Parking","Restrooms","Locker Rooms","Shower Rooms","Waiting Area","Changing Rooms","Drinking Water"];
  const images = ["https://plus.unsplash.com/premium_photo-1684820878202-52781d8e0ea9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3BvcnRzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=6000",
    "https://plus.unsplash.com/premium_photo-1676634832558-6654a134e920?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/photo-1542319281-2a3772c20dfc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
    "https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"]
  const [image,setImage] = useState(images[0]);
  return (
  <>
    {(!request) ? 
      <>
      <div className='w-full h-full relative facilityContainer overflow-scroll gap-2 flex flex-col'> 
        {/* request card */} 
        <div className="bg-white rounded-lg  p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">Agarwal Sport Arena</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p><span className="font-medium">Owner:</span> Ajay agarwal</p>
                  <p><span className="font-medium">Location:</span> Bilaspur, Chhattisgarh </p>
                </div>
                <div>
                  <p><span className="font-medium">Submitted:</span> 12/12/2012</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
                  <CheckCircle size={18} />
                  Approve
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
                  <XCircle size={18} />
                  Reject
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer" onClick={()=>{}}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      :
      <>
        <div className='w-full h-full p-2 bg-white rounded-2xl relative flex flex-col'>
          <div className='p-1 rounded-full absolute top-1 left-1 cursor-pointer' onClick={()=>setRequest(null)}>
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
              <h1 className=' text-4xl font-semibold text-gray-800'>Agarwal Sports Arena</h1>
              <p className='text-gray-700 max-w-[80%] p-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores commodi tempora repellendus dignissimos, qui facilis atque! Deleniti doloribus inventore accusamus accusantium ab optio sint, blanditiis, natus eos debitis ullam adipisci. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et ea fuga corporis voluptas animi dolores, suscipit delectus repellendus perferendis atque repudiandae deserunt? Tenetur optio ab ratione voluptatem labore accusamus similique!</p>
              <div className='w-full '>
                <hr style={{color: "#a073fa", width: "80%",}} />
              </div>
              <div className='w-full p-1'>
                <h2 className='text-gray-700 text-xl font-semibold'>Features</h2>
                <ul className="list-disc marker:text-violet-500 list-inside  text-gray-700">
                  {amenitiesList.map((amenty)=>(
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
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline cursor-pointer"
                >
                  View Full Document
                </a>
              </div>

              <div className="mt-2 flex gap-3">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
                  <CheckCircle size={18} />
                  Approve
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer">
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