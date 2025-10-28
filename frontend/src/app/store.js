import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice.js';
import facilityReducer from '../features/facility/facilitySlice.js'
export const store = configureStore({
  reducer: {
    user: userReducer,
    facility: facilityReducer,
  },
})