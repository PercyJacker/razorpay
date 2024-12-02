import React from 'react'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Home from './component/Home'
import AboutUs from './component/AboutUs'

const App = () => {

  const route = createBrowserRouter([
    {
      path:'/',
      element : <Home/>
    },
    {
      path:'/aboutus',
      element : <AboutUs/>
    },
  ])
  return (
    <div className='h-screen w-full bg-slate-700 router'>
      <RouterProvider router = {route}></RouterProvider>
    </div>
  )
}

export default App