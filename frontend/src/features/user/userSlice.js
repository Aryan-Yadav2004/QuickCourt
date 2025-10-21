import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userDetail: null,
    isLoged: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setLoged: (state) => {
            state.isLoged = true;
        },
        setUser: (state,action) => {
            state.userDetail = action.payload;
        }
    }
});

export const {setLoged,setUser} = userSlice.actions;
export default userSlice.reducer;