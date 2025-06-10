import { useState, createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import CertificateDoc from './pages/CertificateDoc'
import CertificateSearch from './pages/CertificateSearch'
import { Buffer } from 'buffer';
import RollCallForm from './pages/RollCallForm';
import AdminLogin from './pages/AdminLogin';
import AdminRoutes from './pages/AdminRoutes';
import services from './services/services';

globalThis.Buffer = Buffer;

function App() {

  return (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CertificateSearch/>}/>
        <Route path="/certificate/:cpf/:classid" element={<CertificateDoc/>}/>
        <Route path="/rollcall/:classid/:pwd" element={<RollCallForm/>}/>
        <Route path="/adminLogin" element={<AdminLogin/>}/>
        <Route path ="/admin/*" element={<AdminRoutes/>}/>
        
      </Routes>
    </BrowserRouter>
  </div>
    
  )
}

export default App
