import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import Sports from '../components/Sports';
import Footer from '../components/Footer';
import FacilityCarousel from '../components/facilityCarousel';
function Home() {
  return (
    <>
      <HeroSection/>
      <Sports/>
      <FacilityCarousel />
    </>
  )
}

export default Home;