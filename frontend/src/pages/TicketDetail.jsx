import React, { useEffect, useRef, useState } from 'react'
import {TicketX, Phone} from 'lucide-react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getBookingTicket } from '../services/server';
import html2canvas from 'html2canvas';
function TicketDetail() {
  const { bookingId } = useParams();
  const user = useSelector(state => state.user.userDetail);
  const [ticket,setTicket] = useState(null);
  const tragetRef = useRef(null);
  useEffect(()=>{
    if (!user) return;
    const fetchTicket = async () => {
      const res = await getBookingTicket(user?._id, bookingId);
      const data = await res.json();
      setTicket(data);
      console.log(data);
    }
    fetchTicket();
  },[bookingId,user]);

  
  const extractTime = (time) => {
    const curr = new Date(time);
    const transformedTime = curr.toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit', hour12: true});
    const transformedDate = curr.toLocaleDateString('en-IN');
    return `${transformedTime} ${transformedDate}`;
  }
  const handleDownload = async () => {
    if(!tragetRef.current) return;
    try {
      const canvas = await html2canvas(tragetRef.current,{
        useCORS: true,
        scale: 2,
        allowTaint: false,
        logging: false
      });
      const dataURL = canvas.toDataURL("image/png");


      //create temporary download link
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `QuickCourt ticket ${extractTime(ticket?.time)}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Screenshot failed:", error);
      alert("Screenshot failed. Check console for details (possible CORS issue with images).");
    }
  }
  const bookedColor = (status) => {
    if(status === 'booked') return 'text-[#5500ff]';
    if(status === 'cancelled') return 'text-red-500';
    return 'text-green-500';
  }
  return (
    <div style={{
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f9fafb",
  gap: '10px'
}}>
  <div
    ref={tragetRef}
    style={{
      width: "300px",
      height: "450px",
      marginTop: "7%",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      gap: "16px",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
    }}
  >

    {/* Top Section */}
    <div style={{
      width: "100%",
      height: "30%",
      padding: "8px",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <div style={{
        width: "30%",
        height: "100%",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: "16px"
      }}>
        <img
          src="https://imgs.search.brave.com/ngyy-t3B-m0JyB5ewlKXENvqAI7Vy49P-b8xwi9ntXc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQx/NzMyNDk1Mi9waG90/by9zY2hvb2wtZ3lt/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1HQjNSZU5fSFZF/OEZHUmpOVFA4SkNJ/M2gzNk9zV3loT3dD/WUFiaGFjcFFJPQ"
          alt="preview"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <div style={{
        width: "65%",
        height: "100%",
        borderLeft: "1px solid #e4d7ff",
        padding: "8px",
        display: "flex",
        flexDirection: "column"
      }}>
        <h1 style={{ fontWeight: 500, color: "#374151" }}>{ticket?.facility}</h1>
        <p style={{ fontSize: "12px", color: "#6b7280" }}>{ticket?.court}</p>
        <p style={{ fontSize: "12px", color: "#6b7280" }}>
          {`${ticket?.street}, ${ticket?.city}, ${ticket?.state}, ${ticket?.country}`}
        </p>
      </div>
    </div>

    {/* Divider */}
    <div style={{
      width: "100%",
      padding: "4px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ width: "12px", height: "12px", borderTopRightRadius: "9999px", borderBottomRightRadius: "9999px", backgroundColor: "#e5e7eb" }}></div>
      <div style={{
        width: "80%",
        height: 0,
        border: "1px dashed #6b7280"
      }}></div>
      <div style={{ width: "12px", height: "12px",  borderTopLeftRadius: "9999px", borderBottomLeftRadius: "9999px", backgroundColor: "#e5e7eb" }}></div>
    </div>

    {/* Info Section */}
    <div style={{
      width: "100%",
      padding: "4px 0",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center"
    }}>

      <div style={{ width: "100%", padding: "4px 0", display: "flex", justifyContent: "center", gap: "4px" }}>
        <p style={{ fontWeight: 600, color: "#6b7280" }}>Booking ID:</p>
        <p style={{ color: "#6b7280" }}>{ticket?._id}</p>
      </div>

      <div style={{ width: "100%", padding: "4px 0", display: "flex", justifyContent: "center", gap: "4px" }}>
        <p style={{ fontWeight: 600, color: "#6b7280" }}>Court:</p>
        <p style={{ color: "#6b7280" }}>{ticket?.court}</p>
      </div>

      <div style={{ width: "100%", padding: "4px 0", display: "flex", justifyContent: "center", gap: "4px" }}>
        <p style={{ fontWeight: 600, color: "#6b7280" }}>Time:</p>
        <p style={{ color: "#6b7280" }}>{extractTime(ticket?.time)}</p>
      </div>

      <div style={{ width: "100%", padding: "4px 0", display: "flex", justifyContent: "center", gap: "4px" }}>
        <p style={{ fontWeight: 600, color: "#6b7280" }}>Status:</p>
        <p className={bookedColor(ticket?.status)}>{ticket?.status}</p>
      </div>
    </div>

    {/* Cancellation Line */}
    <div style={{
      width: "100%",
      textAlign: "center",
      padding: "8px 0",
      fontSize: "10px",
      fontWeight: "bold",
      color: "#b692ff",
      backgroundColor: "#ebe2ff",
      borderRadius: "8px"
    }}>
      Cancellation available up to 20 minutes before the booked time.
    </div>

    {/* Bottom Buttons */}
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center"
    }}>
      <div style={{ display: "flex", flexDirection: "column", padding: "4px", alignItems: "center", cursor: "pointer" }}>
        <TicketX size={22} style={{ color: "#6b7280" }} />
        <p style={{ fontSize: "10px", color: "#6b7280" }}>Cancel</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", padding: "4px", alignItems: "center", cursor: "pointer" }}>
        <Phone size={20} style={{ color: "#6b7280" }} />
        <p style={{ fontSize: "10px", color: "#6b7280" }}>Contact us.</p>
      </div>
    </div>

  </div>

  <button className='px-2 py-1 rounded-l-full rounded-r-full bg-[#5500ff] text-white cursor-pointer' onClick={handleDownload}>Download</button>
</div>

  )
}

export default TicketDetail; 