import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminPanel from './AdminPanel/AdminPanel'
import Login from './AdminPanel/AdminLogin'
import { Routes, Route } from "react-router-dom";
import UserDetailsStaffs from './AdminPanel/UserDetailsStaffs'
import UserDetailsInterns from './AdminPanel/UserDetailsInterns'
import UserDetailsClient from './AdminPanel/UserDetailsClient'
import UserDetailsVisitors from './AdminPanel/UserDetailsVisitors'

function App() {
 
  return (
    <>
    <Routes>
      <Route>
        <Route path='/' element={<Login/>}/>
        <Route path='/adminpanel' element={<AdminPanel/>}/>
        <Route path='/user/:id' element={<UserDetailsStaffs/>}/>
        <Route path='/:userType/intern/:id' element={<UserDetailsInterns/>}/>
        <Route path='/:userType/client/:id' element={<UserDetailsClient/>}/>
        <Route path='/:userType/visitor/:id' element={<UserDetailsVisitors/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
