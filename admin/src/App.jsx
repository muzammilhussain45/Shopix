import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import {Routes, Route} from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';



export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const currency = '$';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'):"");

  useEffect(()=>{
    localStorage.setItem('token', token);
  },[token])

  return (
    <div className='bg-ink-50 min-h-screen'>
        <ToastContainer
          position="top-right"
          autoClose={2600}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
          toastStyle={{
            borderRadius: '12px',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '14px',
            boxShadow: '0 10px 30px rgba(24,24,27,0.10)',
            border: '1px solid #e8e8ea',
          }}
        />

      {token === "" ? <Login setToken={setToken}/>:
      <>
       <NavBar setToken={setToken}></NavBar>
       <div className='flex w-full'>
         <SideBar/>
         <main className='flex-1 min-w-0 px-6 sm:px-10 py-8 text-ink-700'>
           <Routes>
             <Route path='/add' element={<Add token={token} />} />
             <Route path='/list' element={<List token={token} />} />
             <Route path='/orders' element={<Orders token={token} />} />
           </Routes>
         </main>
       </div>
      </>}

   
    </div>
  )
}

export default App
