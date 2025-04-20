import React from 'react'
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom"
import Home from './component/Home'
import AboutUs from './component/AboutUs'

const App = () => {
  const route = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/aboutus',
      element: <AboutUs />
    },
  ])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white font-sans'>
      {/* Navbar */}
      <nav className='bg-slate-950 shadow-md p-4 flex justify-between items-center'>
        <div className='text-xl font-bold'>🔐 OTP App</div>
        <div className='space-x-4'>
          <Link to="/" className='hover:text-cyan-400 transition'>Home</Link>
          <Link to="/aboutus" className='hover:text-cyan-400 transition'>About Us</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className='p-4'>
        <RouterProvider router={route} />
      </div>
    </div>
  )
}

export default App
