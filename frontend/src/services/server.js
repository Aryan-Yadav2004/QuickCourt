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

export {registerUser, loginUser, getAllBookings, updateUser};