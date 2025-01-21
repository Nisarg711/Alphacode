import { useState } from 'react'
import Home from './components/home'
import './App.css'

import Signup from './components/signup'
import Login from './components/login'
import Guest from './components/guest'
import { createBrowserRouter,Route,RouterProvider, BrowserRouter } from 'react-router-dom'


function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/guest',
      element:<Guest/>
    }

  ])

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
