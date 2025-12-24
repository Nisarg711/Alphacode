import React, { useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import {createUserWithEmailAndPassword} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { setDoc,doc } from 'firebase/firestore';
import { auth } from '../firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../index.css";



const signup = () => {
  useEffect(()=>{
    const initializeGoogle = () => {
      if (window.google) {
        google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback:handlecredentiallogin
        })
        google.accounts.id.renderButton(
          document.getElementById("googleauth"),
          {theme:"outline",size:"large"}
        )
      } else {
        setTimeout(initializeGoogle, 100);
      }
    }
    initializeGoogle();
  },[])
  const handlecredentiallogin=(response)=>{
    if(response?.credential)
    {
      console.log("check",response.credential);
      localStorage.setItem('users', JSON.stringify({token:response.credential }));
      window.location.href="/guest"; 
    }
  }
  const [register,setregister]=useState({username:"", email:"", password:""});

  const handlechange=(e)=>{
    setregister({...register,[e.target.name]:e.target.value});
    
  }

   async function delay (d){
      return new Promise((res,rej)=>{
          setTimeout(() => {
              res("done");
          }, d);
      })
    }

  async function handleregister(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, register.email,register.password).then(async ()=>{
      const usr=auth.currentUser;
      if(usr)
      {
       
         toast('User registered Successfully!!', {
                         position: "top-right",
                         autoClose: 1000,
                         hideProgressBar: false,
                         closeOnClick: false,
                         pauseOnHover: true,
                         draggable: true,
                         progress: undefined,
                         theme: "light",
                       
                         }); 
         await delay(1500);
         window.location.href="/guest";
      }
    }).catch((err)=>{
      alert(err.message);
    })
  }
async function delay(t) {
    return new Promise((res,rej)=>{
        setTimeout(() => {
            res();
        }, t);
    })
}
  const googlesignup=()=>{
    const provider=new GoogleAuthProvider();
    
    signInWithPopup(auth,provider).then(async (res)=>{
        console.log(res);
        const usr=auth.currentUser;
        if(usr)
        {
            toast('User registered Successfully!!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              
                }); 
await delay(1500);
window.location.href="/";
        }
    })
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-4'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">

          <div className="md:w-1/2 bg-gradient-to-br from-purple-600 to-purple-800 p-12 flex flex-col justify-center items-center text-white">
            <img src="./AlphaCode.png" alt="AlphaCode Logo" className="w-48 h-48 mb-6 object-contain" />
            <h2 className="text-4xl font-bold mb-4 text-center">AlphaCode IDE</h2>
            <p className="text-lg text-center text-purple-200">Your Ultimate Coding Companion</p>
          </div>


          <div className="md:w-1/2 p-8 md:p-12">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
              <p className="text-gray-600 mb-8">Create your account to get started</p>

              <form onSubmit={handleregister} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your username"
                    value={register.name}
                    onChange={handlechange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={register.email}
                    onChange={handlechange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={register.password}
                    onChange={handlechange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition duration-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign Up
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center" id="googleauth">
               
                </div>
              </div>

              <p className="mt-8 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" target="_blank" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
                  Click here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signup
