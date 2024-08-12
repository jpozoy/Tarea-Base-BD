import React,{ useState, useEffect } from 'react'
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import axios from 'axios'
import Home from './Home'
import Registros from './Registros'
import './App.css'


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registros" element={<Registros />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App
