import React from 'react'
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Navbar from './components/navbar'
import Home from './components/home'
import './App.css'


function App() {

  return (
    <>
      <Navbar />
      
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
