import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

export const userSlice = createSlice({
    name: "isLoged",
    initialState: initialState,
    reducers: {
        setIsLoged: (state,action) => {
            return action.payload;
        },
    }
});

export const {setIsLoged} = userSlice.actions;
export default userSlice.reducer;