import { useState } from 'react'

import './App.css'
import { Home } from './pages/Home'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { AdminPage } from './pages/Adminpage'

function App() {

  return (
    <>
     <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/AdminPage' element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
