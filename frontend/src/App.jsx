import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoged } from './features/user/userSlice.js'
import HeroSection from './components/HeroSection.jsx';
import Home from './pages/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const checkLogin = ()=>{
      fetch("http://localhost:3000/api/v1/hello",{
        method: "GET",
        credentials: "include",
      }).then(res => res.json()).then(data => console.log(data));
      // const res = await fetch('localhost:3000/api/v1/user/verify',{
      //   method: "GET",
      //   credentials: "include",
      // });
      // if(res.ok){
      //   dispatch(setIsLoged(true));
      // }
      // else{
      //   dispatch(setIsLoged(false));
      // }
    }
    checkLogin();
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<Home/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App