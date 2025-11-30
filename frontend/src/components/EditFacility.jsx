import React ,{ useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getFacility, updateFacility } from '../services/server';
import { Save } from 'lucide-react';
import { upload } from '../services/Cloudinary';
import ErrorAlert from './errorAlert';
import SuccessAlert from './successAlert';
import NProgress from 'nprogress'; 
import "nprogress/nprogress.css";

 function EditFacility() {
  const { facilityId } = useParams();
    const [images, setImages] = useState(["","","","",""]);
    const [image, setImage] = useState("qeqweqweqwe");
    const [facility,setFacility] = useState(null);
    const [newData,setNewData] = useState({});
    const user = useSelector(state => state.user.userDetail);
    const [address,setAddress] = useState("new Delhi, india");
    const [files,setFiles] = useState([null,null,null,null,null]);
    const [profileImgFile,setProfileImgFile] = useState(null);
    const textareaRef = useRef(null);
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const [success,setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const amenitiesList = ["Parking","Restrooms","Locker Rooms","Shower Rooms","Waiting Area","Changing Rooms","Drinking Water","Reception Desk","Free WiFi","Air Conditioning","Power Backup","First Aid Kit","Medical Room","Viewing Gallery","CCTV Surveillance","Security Guard"];
    useEffect(() => {
        const fetchFacility = async () => {
            const res = await getFacility(facilityId);
            const data = await res.json();
            const newPhotos = ["","","","",""];
            
            if(res.ok){
              setFacility(data);
              setImage(data.profileImg);
              setAddress(`${data?.street} ${data?.city}, ${data?.state}, ${data?.country}`);
              setNewData(prev => ({...prev,name: data.name, about: data.about, pinCode: data.pinCode, amenities: [...data.amenities]}));
              data.photos.forEach((photo,index)=>{
                newPhotos[index] = photo;
              });
              setImages(newPhotos);
            }
            else{
                console.log(data.message);
            }
        }
        fetchFacility();
        NProgress.configure({showSpinner: false});
    },[]);

    useEffect(()=>{
      handleTextArea();
    },[newData?.about]);

    const handleTextArea = () => {
      if (loading) return;
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + 'px';
    }

    const handleAmenitiyChange = (amenity) => {
      if (loading) return;
      if(newData?.amenities.includes(amenity)){
        setNewData((prev)=> ({...prev,amenities: [...prev.amenities.filter(a => a !== amenity)]}));
      }
      else{
        setNewData(prev => ({...prev,amenities: [...prev.amenities,amenity]}));
      }
    }

    const handlePhotos = (file,index) => {
      if (loading) return;
      let newFiles = [...files];
      if(file.size > 10 * 1024 * 1024){
        setError("image size should be less than 10MB");
        return;
      }
      newFiles[index] = file;
      setFiles(newFiles);
      const url = URL.createObjectURL(file);
      let newPhotos = [...images];
      newPhotos[index] = url;
      setImages(newPhotos);
    }

    const handleRemovePhoto = (index) => {
      if (loading) return;
      let newPhotos = [...images];
      newPhotos[index] = "";
      setImages(newPhotos);
      let newFiles = [...files];
      newFiles[index] = null;
      setFiles(newFiles);
    }

    const handleProfilePhoto = (file) => {
      if(loading) return;
      setProfileImgFile(file);
      const url = URL.createObjectURL(file);
      setImage(url);
    }
    const handleRemoveProfilePhoto =  () => {
      if(loading) return;
      setImage("");
      setProfileImgFile(null);
    }
    const handleSubmit = async (e)=>{
      e.preventDefault();
      if(loading) {
        NProgress.done();
        return
      };
      setLoading(true);
      try {
        let profileImgLink = image;
        if(profileImgFile){
          let res = await upload(profileImgFile);
          if(res.status === 200){
            profileImgLink = res.message;
          }
          else{
            setError(link.message);
            NProgress.done();
            return;
          }
        }
        let photosLink = [];
        for(let i = 0; i < 5; i++){
          if(files[i]){
            let link = await upload(files[i]);
            if(link.status === 200){
              photosLink.push(link.message);
            }
            else{
              setError(link.message);
              NProgress.done();
              return;
            }
          }
          else{
            if(images[i]) photosLink.push(images[i]);
          }
        }
        let result = await updateFacility({name: newData.name,about: newData.about,amenities: newData.amenities,profileImg: profileImgLink, photos: photosLink},facilityId);
        if(result.ok){
          navigate(`/facility/${facilityId}`);
        }
        else{
          let result = await result.json();
          console.log(result.message);
        }
      } catch (error) {
        console.log(error.message);
      }
      finally{
        NProgress.done();
      }
    }
    const closeErrorMsg = () => {
      setError("");
    }

    const closeSuccessMsg = () => {
      setSuccess("");
    }
    // if(facility?.owner._id !== user?._id) return (
    //   <div className='w-full min-h-screen p-5'>
    //     <h1 className='text-center text-4xl text-gray-700'>Your are unauthorized</h1>
    //   </div>
    // )
  return (
    
    <form className='w-full h-full p-2 bg-white rounded-2xl  flex flex-col overflow-scroll facilityContainer relative' onSubmit={(e) => {NProgress.start();handleSubmit(e)}}>
        <div className='w-full h-[70vh]  flex flex-col sm:flex-row'>
            {/* image */}
            <div className='sm:h-full h-[50%] sm:w-[50%] w-full  p-2 flex flex-col items-center'>
                {image === "" ? 
                  <div className={`w-full h-full  border border-gray-300 flex items-center justify-center  cursor-pointer`} style={{backgroundImage: 'url(/plus.png)', backgroundPosition: "center",backgroundRepeat: 'no-repeat', backgroundSize:"50px"}} >
                    <input type="file" className={`w-full h-full text-transparent bg-transparent ${loading ? "cursor-not-allowed":"cursor-pointer"} `} onChange={(e)=>handleProfilePhoto(e.target.files[0])} required/>
                  </div>
                :
                  <div className='w-[90%] h-[70%]  bg-gray-100 flex items-center justify-center overflow-hidden relative'>
                    <div className={`w-[20px] h-[20px] pb-1 text-gray-800 flex justify-center items-center rounded-full absolute top-0 bg-gray-300 opacity-60 right-0  ${loading ? "cursor-not-allowed":"cursor-pointer"}`} onClick={handleRemoveProfilePhoto}>x</div>
                    <img src={image} alt="preview" className="w-full h-full object-contain" />
                  </div>
                }
                <div className='w-[90%] h-[30%]  flex justify-around items-center'>
                {images.map((imageLink, index) => {
                    return(
                      imageLink === ""? (
                        <div key={index + 'a'} className={`w-20 h-20  border border-gray-300 flex items-center justify-center cursor-pointer`} style={{backgroundImage: 'url(/plus.png)', backgroundPosition: "center",backgroundRepeat: 'no-repeat', backgroundSize:"50px"}} >
                          <input type="file" className='w-20 h-20 text-transparent bg-transparent cursor-pointer' onChange={(e)=>handlePhotos(e.target.files[0],index)}/>
                        </div>
                        ):(
                        <div key={index + 'b'} className={`w-20 h-20  border border-gray-300 flex items-center justify-center  relative`} >
                          <div className={`w-[20px] h-[20px] pb-1 text-gray-800 flex justify-center items-center rounded-full absolute top-0 bg-gray-300 opacity-60 right-0 ${loading ? "cursor-not-allowed":"cursor-pointer"}`} onClick={()=>handleRemovePhoto(index)}>x</div>
                          <img src={imageLink} alt="preview" className="w-full h-full object-contain" />
                        </div>
                      )
                    )
                  }
                )}
                </div>
                <p className='text-gray-500'>* Image size should be less than 10MB</p>
            </div>
            {/* details */}
            <div className='sm:h-full h-[50%] sm:w-[50%] w-full  flex flex-col items-start px-2 py-3 gap-2'>
              <div className='w-[80%] p-1 flex justify-between items-center'>
                <input className=' text-4xl font-semibold text-gray-800 w-[60%] p-0.5 focus:outline-none active:outline-none' value={newData?.name} onChange={(e) => { if(loading) return; setNewData({...newData, name:e.target.value})}}/>
                <button type="submit" className={`p-1 active:outline-none focus:outline-none  ${loading ? "cursor-not-allowed":"cursor-pointer"}`} ><Save size={25} className={`${loading?"text-[#a273ff]":"text-[#5500ff]"}`}/></button>
              </div>
              <p className='text-gray-700 max-w-[80%] p-1'><b>About:</b></p>
              <i className='w-full'><textarea className='min-w-[80%] resize-none overflow-hidden min-h-[40px] p-[8px] rounded-[6px] outline-none' rows={1} ref={textareaRef} name="about" value={newData?.about}  onChange={(e)=>{if (loading) return; setNewData({...newData,about: e.target.value})}}></textarea></i>
              <p className='text-gray-700 p-1'><b>Owner:</b><i>{facility?.owner?.name}</i></p>
              <div className='w-full'>
                <hr style={{color: "#a073fa", width: "80%",}} />
              </div>
              <div className='w-full p-1'>
                <h2 className='text-gray-700 text-xl font-semibold'>Features</h2>
                <div className="  text-gray-700 flex flex-col flex-wrap max-h-40">
                  {amenitiesList.map((amenity)=>(
                    <label key={amenity} className="flex items-center space-x-2">
                      <input type="checkbox" checked={newData?.amenities?.includes(amenity)} class="accent-[#a78bfa] w-4 h-4 focus:ring-[#f0ebfa]"  onChange={()=>handleAmenitiyChange(amenity)}/>
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
        </div>

        <div className='w-full py-1 px-[3%] flex flex-col justify-start items-start gap-4'>
            <div className='p-1 flex gap-1'>
                <p className='font-medium text-gray-700 text-xl'>Location: </p>
                <p className='font-light text-[18px]'><i>{`${facility?.street}, ${facility?.city}, ${facility?.state}, ${facility?.country}`}</i></p>
            </div>

        </div>
        <ErrorAlert error={error} closeMsg={closeErrorMsg} />
        <SuccessAlert success={success} closeMsg={closeSuccessMsg} />
      </form>
  )
}

export default EditFacility;