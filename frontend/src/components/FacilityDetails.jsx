import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getFacility } from '../services/server';
import { useSelector } from 'react-redux';
import { MapPin, Plus } from 'lucide-react'
function FacilityDetails() {
    const { facilityId } = useParams();
    const [images, setImages] = useState([]);
    const [image, setImage] = useState("");
    const [facility,setFacility] = useState(null);
    const user = useSelector(state => state.user.userDetail)
    useEffect(() => {
        const fetchFacility = async () => {
            const res = await getFacility(facilityId);
            const data = await res.json();
            if(res.ok){
                setFacility(data);
                setImage(data.profileImg);
                setImages([data.profileImg,...data.photos])
            }
            else{
                console.log(data.message);
            }
        }
        fetchFacility();
    },[]);
  return (
    <div className='w-full h-full p-2 bg-white rounded-2xl relative flex flex-col overflow-scroll facilityContainer'>
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
              <h1 className=' text-4xl font-semibold text-gray-800'>{facility?.name}</h1>
              <p className='text-gray-700 max-w-[80%] p-1'><b>About:</b> <i>{facility?.about}</i></p>
              <p className='text-gray-700 p-1'><b>Owner:</b><i>{facility?.owner?.name}</i></p>
              <div className='w-full '>
                <hr style={{color: "#a073fa", width: "80%",}} />
              </div>
              <div className='w-full p-1'>
                <h2 className='text-gray-700 text-xl font-semibold'>Features</h2>
                <ul className="list-disc marker:text-violet-500 list-inside  text-gray-700 flex flex-col flex-wrap max-h-40">
                  {facility?.amenities.map((amenty)=>(
                    <li key={amenty}>{amenty}</li>
                  ))}
                </ul>
              </div>
            </div>
        </div>

        <div className='w-full py-1 px-[3%] flex flex-col justify-start items-start gap-4'>
            <div className='p-1 flex gap-1'>
                <p className='font-medium text-gray-700 text-xl'>Location: </p>
                <MapPin  size={20} className='text-[#9965ff] '/>
                <p className='font-light text-[18px]'><i>{`${facility?.street}, ${facility?.city}, ${facility?.state}, ${facility?.country}`}</i></p>
            </div>
            <div className='p-1 flex gap-2'>
                <p className='font-medium text-gray-700 text-xl'>Sports: </p>
                <div className='px-1.5 py-0.5 rounded-l-full rounded-r-full bg-[#5500ff] text-white'>volleyball</div>
                <div className='px-1.5 py-0.5 rounded-l-full rounded-r-full bg-[#5500ff] text-white'>football</div>
                <div className='px-1.5 py-0.5 rounded-l-full rounded-r-full bg-[#5500ff] text-white'>badminton</div>
                <div className='px-1.5 py-0.5 rounded-l-full rounded-r-full bg-[#5500ff] text-white'>cricket</div>
                <div className='px-1.5 py-0.5 rounded-l-full rounded-r-full bg-[#5500ff] text-white'>tennis</div>
            </div>
        </div>

        <div className='w-full py-1 px-[3%] flex flex-col justify-start items-start mt-5 '>
            <div className='w-full p-1 flex justify-between items-center'>
                <h1 className=' text-4xl font-semibold text-gray-800'>Courts</h1>
                <Plus size={25} className='text-[#5500ff] cursor-pointer'/>
            </div>
            <hr style={{color:'#a073fa',width: "100%"}}/>
            <div className='w-full p-1 flex justify-around items-start flex-wrap gap-4'>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
                <div className='w-52 bg-blue-600 h-72'></div>
            </div>
        </div>

        <div className='w-full p-1'>
            
        </div>

        {user?.role === 'admin' && 
        <div className='w-full p-1 flex flex-col gap-2 ml-4'>
            <div className='p-1 flex gap-2'>
            <p>Legal Document: </p>
            <a
                href={facility?.legalDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline cursor-pointer"
            >
                Download legal Document
            </a>
            </div>

            {/* <div className="mt-2 flex gap-3">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer" onClick={async()=>{ await handleRequestAnswer(request,"accepted"); handleNavigateBack();}}>
                <CheckCircle size={18} />
                Approve
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer" onClick={async()=>{ await handleRequestAnswer(request,"rejected"); handleNavigateBack();}}>
                <XCircle size={18} />
                Reject
            </button>
            </div> */}
        </div>
        }
        </div>
  )
}

export default FacilityDetails;