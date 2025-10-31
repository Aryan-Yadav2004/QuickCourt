const baseURL = "http://localhost:3000/api/v1";

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

export {registerUser, loginUser, getAllBookings, updateUser, createFacility, readAllFacilities, upLoadPdf, allPendingRequest, replyRequest, getAllUsers, updateUserStatus, getUser, getUserByUsername, getFacility};