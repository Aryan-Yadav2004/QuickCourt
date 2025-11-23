import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice.js';
import facilityReducer from '../features/facility/facilitySlice.js';
import searchReducer from '../features/search/searchSlice.js';
export const store = configureStore({
  reducer: {
    user: userReducer,
    facility: facilityReducer,
    search: searchReducer 
  },
})