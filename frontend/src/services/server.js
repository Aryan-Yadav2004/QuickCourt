

const baseURL = "https://quickcourt-pvr8.onrender.com/api/v1";
//https://quickcourt-pvr8.onrender.com

const registerUser = async (user) => {
    let res = await fetch(`${baseURL}/user/register`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });
    
    return res;
}



const loginUser = async(user) => {
    let res = await fetch(`${baseURL}/user/login`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(user)
    });
    return res;
}

const updateUser = async(id,data) => {
    let res = await fetch(`${baseURL}/user/${id}`,{
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });
    return res;
}

const getAllBookings = async(id) => {
    let res = await fetch(`${baseURL}/user/${id}/bookings`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });
    return res;
}

const createFacility = async (facility) => {
    let res = await fetch(`${baseURL}/facility/new`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(facility),
        credentials: "include",
    })
    return res;
}

const readAllFacilities = async () => {
    let res = await fetch(`${baseURL}/facility/allfacility`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    })
    return res;
}

const upLoadPdf = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    let res = await fetch(`${baseURL}/upload`,{
        method: 'POST',
        credentials: "include",
        body: formData
    });
    return res;
}


const allPendingRequest = async (page,limit) => {
    const res = await fetch(`${baseURL}/facility/allPendingRequest?page=${page}&limit=${limit}`,{
        method: 'GET',
        credentials: "include",
    });
    return res;
}

const replyRequest = async(facilityId,answer) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}/requestReply`,{
        method: 'PATCH',
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({request: answer}),
    })
    return res;
}

const getAllUsers = async (page,limit) => {
    const res = await fetch(`${baseURL}/user/getUsers?page=${page}&limit=${limit}`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    })
    return res;
}

const getUser = async (userId) => {
    const res = await fetch(`${baseURL}/user/${userId}`,{
        method: 'GET',
        credentials: 'include',
    })
    return res;
}

const updateUserStatus = async (userId,status) => {
    const res = await fetch(`${baseURL}/user/${userId}/updateStatus`,{
        method: 'PATCH',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({status: status}),
    })
    return res;
}

const getFacility = async (facilityId) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}`,{
        method: 'GET',
        credentials: "include",
    })
    return res;
}

const getUserByUsername = async (username) => {
    const res = await fetch(`${baseURL}/user/getUserByUsername?username=${username}`,{
        method: 'GET',
        credentials: 'include',
    })
    return res;
}

const updateFacility = async(facility,facilityId) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}/edit`,{
        method: 'PATCH',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(facility),
    })
    return res;
}

const deleteFacility = async (facilityId) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}/delete`,{
        method: 'DELETE',
        credentials: "include",
    });
    return res;
}

const createCourt = async(facilityId,court) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}/courts/new`,{
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(court),
    });
    return res;
}

const getCourt = async(facilityId, courtId) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}/courts/${courtId}`,{
        method: 'GET',
        credentials: 'include',
        
    })
    return res;
}

const createReview = async(facilityId,courtId,review) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}/courts/${courtId}/reviews/new`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(review),
    })
    return res;
}

const deleteReview = async(facilityId,courtId,reviewId) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}/courts/${courtId}/reviews/${reviewId}/delete`,{
        method: 'DELETE',
        credentials: 'include',
    })
    return res; 
}
const updateCourt = async(facilityId,courtId,court) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}/courts/${courtId}/edit`,{
        method: 'PATCH',
        credentials: "include",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(court),
    });
    return res;
}

const deleteCourt = async(facilityId,courtId) => {
    const res = await fetch(`${baseURL}/facility/${facilityId}/courts/${courtId}/delete`,{
        method: 'DELETE',
        credentials: 'include',
    });
    return res;
}

const createOrder = async(slot_id, court_id, seats) => {
    const res = await fetch(`${baseURL}/payment/orders`,{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify({slot_id: slot_id,court_id: court_id,seats: seats}),
    });
    return res;
}

const verifyPayment = async (razorpay_payment_id, razorpay_order_id, razorpay_signature, orderAmount, slot_id, user_id, seats) => {
    const res = await fetch(`${baseURL}/payment/verify`,{
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({razorpay_payment_id: razorpay_payment_id,razorpay_order_id: razorpay_order_id, razorpay_signature, orderAmount: orderAmount ,slot_id: slot_id, user_id: user_id, seats: seats}),
    });
    const result = await res.json(); 
    return result;
}

const createFundAccount = async (detail) => {
    const res = await fetch(`${baseURL}/payment/createFundAccount`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(detail)
    });
    return res;
}

const getBookingTicket = async (userId, bookingId) => {
    const res = await fetch(`${baseURL}/user/${userId}/bookings/${bookingId}`,{
        method: 'GET',
        credentials: 'include'
    });
    return res;
} 

const cancelBooking = async (userId, bookingId) => {
    const res = await fetch(`${baseURL}/user/${userId}/bookings/${bookingId}/cancel`,{
        method: 'PATCH',
        credentials: 'include'
    });
    return res;
}

const getCountryISO = async () => {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  return data;
};

const searchContent = async () => {
    const res = await fetch(`${baseURL}/facility/searchContent`,{
        method: 'GET',
    })
    const result = await res.json();
    return result;
}

const getFacilityListing = async (filter,page,limit) => {
    const res = await fetch(`${baseURL}/facility/facilities`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({filter,page,limit}),
    });
    return res
}

const getSlotBookingDetails = async(id, time) => {
    const res = await fetch(`${baseURL}/user/${id}/ownerBookingdetails/${time}`,{
        method: 'GET',
        credentials: 'include'
    })
    return res;
}

const getBookingTrend = async () => {
    const res = await fetch(`${baseURL}/facility/bookingtrend`,{
        method: "GET",
        credentials: 'include'
    });
    return res;
}

const getEarning = async () => {
    const res = await fetch(`${baseURL}/facility/earnings`,{
        method: "GET",
        credentials: 'include'
    });
    return res;
}

const getAdminStats = async (id) => {
    const res = await fetch(`${baseURL}/user/${id}/stats`,{
        method: "GET",
        credentials: 'include'
    });
    return res;
}

const handleLogOut = async (id) => {
    const res = await fetch(`${baseURL}/user/${id}/logout`,{
        method: 'POST',
        credentials: 'include'
    });
    return res;
}

export { getAdminStats ,registerUser, getEarning ,getBookingTrend, loginUser, createCourt, getAllBookings, updateUser, updateFacility, createFacility, readAllFacilities, upLoadPdf, allPendingRequest, replyRequest, getAllUsers, updateUserStatus, getUser, getUserByUsername, getFacility, deleteFacility, getCourt, createReview,updateCourt, deleteCourt,deleteReview, createOrder, verifyPayment, createFundAccount, getBookingTicket,cancelBooking ,getCountryISO, searchContent, getFacilityListing, getSlotBookingDetails, handleLogOut};