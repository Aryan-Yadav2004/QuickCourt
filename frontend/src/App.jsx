import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLoged, setUser } from './features/user/userSlice.js'
import Home from './pages/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Profile from './pages/Profile.jsx';
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
        </Route>
        <Route path='/signup' element={<Signup/>}/> 
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App