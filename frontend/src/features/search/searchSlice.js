import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    facilities: [],
}

export const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        setSearch: (state,action) => {
            state.facilities = action.payload;
        },
    }
});

export const {setSearch} = searchSlice.actions;
export default searchSlice.reducer;