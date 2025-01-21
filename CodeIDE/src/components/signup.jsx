import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'; 
import {createUserWithEmailAndPassword} from "firebase/auth";
import { setDoc,doc } from 'firebase/firestore';
import { auth } from '../firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './sign.css'



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
         window.location.href="/";
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
    
    <div className='signup'>

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

     <div className="container3">
      <div className="img2"><img src="./AlphaCode.png" alt="hello" className="img4" /></div>
      <div className="form">
        <div className="heading1 moveht"><h1>Sign Up</h1></div>
        <div className="signname motion">
        <input type="text" placeholder='Enter Username' value={register.name} name='name' onChange={handlechange} className='ip3' />
        </div>
        <div className="email motion">
          <input type="text" className='ip3' value={register.email} name='email' onChange={handlechange} placeholder='Enter Email Id'/>
        </div>
        <div className="pwd motion">
          <input type="text" className='ip3' value={register.password} name='password' onChange={handlechange} placeholder='Enter Password' />
        </div>
        <div className="alv motion">Already have an account? <a href="/login" target='blank'> Click here.</a></div>
        <div className="btn3 motion2"><button className='bts motion2' onClick={handleregister}>Sign up</button></div>
        <div className="google">
          <div className="te "><p>----------OR----------</p></div> 
           <div className="img3 motion2" style={{cursor:'pointer'}} onClick={()=>{googlesignup()}} > <img src="./google.png" style={{width:'200px'}} alt="" /></div>
          
        </div>
      </div>
     </div>
    </div>
  )
}

export default signup
