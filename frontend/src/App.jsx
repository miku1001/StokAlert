import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/navbar.jsx'
import HeroCard from './components/herocard.jsx'





function App() {

  return (
    <div className="min-h-screen">
      <NavBar/>
      <HeroCard/>
        <Routes>
          {/* <Route path="/"/>
          <Route path="/product" element={<Product/>}/>
          <Route path="/how" element={<HowItWorks/>}/>
          <Route path="/pricing" element={<Pricing/>}/> */}
        </Routes>
    </div>
  );
}

export default App
