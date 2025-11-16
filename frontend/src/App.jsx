import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoged, setUser } from './features/user/userSlice.js'
import Home from './pages/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
import UserInfo from './pages/UserInfo.jsx';
import FacilityDetails from './components/FacilityDetails.jsx';
import EditFacility from './components/EditFacility.jsx';
import CreateCourt from './components/CreateCourt.jsx';
import CourtDetail from './components/CourtDetail.jsx';
import EditCourt from './components/EditCourt.jsx';
import Payment from './pages/Payment.jsx';
function App() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const checkLogin = async ()=>{
      const res = await fetch('http://localhost:3000/api/v1/user/verify',{
        method: "GET",
        credentials: "include",
      });
      console.log(res);
      if(res.ok){
        dispatch(setLoged());
        const user = await res.json();
        dispatch(setUser(user));
      }
    }
    checkLogin();
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<Home/>}></Route>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/user/:username' element={<UserInfo/>}/>
          <Route path='/facility/:facilityId'>
            <Route path='' element={<FacilityDetails/>} />
            <Route path='edit' element={<EditFacility />} />
            <Route path='court/create' element={<CreateCourt/>} />
            <Route path='court/:courtId'>
              <Route path='' element={<CourtDetail/>}/>
              <Route path='edit' element={<EditCourt/>}/>
            </Route>
          </Route>
        </Route>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/payment' element={<Payment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App