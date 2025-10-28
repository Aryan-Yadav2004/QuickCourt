import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    myFacilities: null,
}

export const facilitySlice = createSlice({
    name: "facility",
    initialState: initialState,
    reducers: {
        setMyFacilities: (state,action) => {
            state.myFacilities = action.payload;
        },
    }
});

export const {setMyFacilities} = facilitySlice.actions;
export default facilitySlice.reducer;