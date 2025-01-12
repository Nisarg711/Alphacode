import { useState,useEffect } from 'react'
import Nav from './components/nav'
import Home from './home'
import Fav from './favourite'
import './App.css'
import { BrowserRouter,createBrowserRouter, RouterProvider } from 'react-router-dom'
function App() {
 const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/favourite',
    element:<Fav/>
  }
 ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
