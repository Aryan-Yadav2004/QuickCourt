import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLoged } from './features/user/userSlice.js'
import Home from './pages/Home.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Signup from './pages/Signup.jsx';
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const checkLogin = async ()=>{
      fetch("http://localhost:3000/api/v1/hello",{
        method: "GET",
        credentials: "include",
      }).then(res => res.json()).then(data => console.log(data));
      const res = await fetch('http://localhost:3000/api/v1/user/verify',{
        method: "GET",
        credentials: "include",
      });
      console.log(res);
      if(res.ok){
        dispatch(setIsLoged(true));
      }
      else{
        dispatch(setIsLoged(false));
      }
    }
    checkLogin();
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<Home/>}></Route>
        </Route>
        <Route path='/signIn' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App