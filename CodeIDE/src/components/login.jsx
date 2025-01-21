import React, { useState } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setDoc,doc } from 'firebase/firestore';
import './login.css'
import { auth } from '../firebase.js';

const signup = () => {
  const [register,setregister]=useState({name:"", email:"", password:""});

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

    try{
        await signInWithEmailAndPassword(auth, register.email,register.password);
        const usr=auth.currentUser;
    console.log("After delay!!!");
      window.location.href="/main";
        
    }
    catch(err){
        toast.error("Invalid email or password");
        console.log(err);
    }
  
  }
  async function delay(t) {
    return new Promise((res,rej)=>{
        setTimeout(() => {
            res();
        }, t);
    })
  }
  const login=()=>{
    const  provider=new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async ()=>{
        const usr=auth.currentUser;
        if(usr)
        {
               toast('Signing you in!!!', {
                                     position: "top-right",
                                     autoClose: 1200,
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
    }).catch((err)=>{
        console.log(err);
    })
  }
  return (
    
    <div className='login'>
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
     <div className="container2">
      <div className="img2"><img src="./AlphaCode.png" alt="" className="img4" /></div>
      <div className="form">
        <div className="heading1 moveht"><h1>Log in</h1></div>
       
        <div className="email motion">
          <input type="text" className='ip3' value={register.email} name='email' onChange={handlechange} placeholder='Enter Email Id'/>
        </div>
        <div className="pwd motion">
          <input type="text" className='ip3' value={register.password} name='password' onChange={handlechange} placeholder='Enter Password' />
        </div>
        <div className="alv">New User? <a href="/signup" target='blank'>Register here.</a></div>
        <div className="btn3 motion2"><button className='bts' onClick={handleregister}>Sign up</button></div>
        <div className="google">
          <div className="te "><p>---------------OR---------------</p></div> 
           <div className="img3 motion2" style={{cursor:'pointer'}} onClick={()=>{login()}} > <img src="./google.png" style={{width:'200px'}} alt="" /></div>
          
        </div>
      
      </div>
     </div>
    </div>
  )
}

export default signup
