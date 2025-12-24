import React from 'react'
import { useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.compat.css"
import './home.css'
const home = () => {
  const name = "AlphaCode"
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    window.history.scrollRestoration = 'manual';
  }, []);

  const cards=[
    {
      title:'Supports any Programming Language',
      sub:'Almost 30+ coding languages are supported',
      link:'https://cdn.lordicon.com/wgmzmyvv.json'
    },
     {
      title:'Vibrant themes',
      sub:'Choose the theme that best suits you to create an adequate coding atmosphere',
      link:'https://cdn.lordicon.com/vysppwvq.json'
    }
    ,
     {
      title:'Advanced Code editor',
      sub:'Features such as Code wrapping, bracket matching and error display',
      link:'https://cdn.lordicon.com/iubtdgvu.json'
    },
     {
      title:'Flexible Input options',
      sub:'Provide input by either uploading your code files or by typing codes directly',
      link:'https://cdn.lordicon.com/iadtkccx.json'
    },
     {
      title:'Customizable Workspace',
      sub:'Resizable terminal, file menu and editor sections as per user need',
      link:'https://cdn.lordicon.com/eduzjjfi.json'
    },
     {
      title:'Enhanced Search tools',
      sub:'Advanced search options to enable you to find your codes easily',
      link:'https://cdn.lordicon.com/vgxjrbxm.json'
    },
     {
      title:'Integrated Terminal',
      sub:'Run commands and debug your code on the browser',
      link:'https://cdn.lordicon.com/eeolefdw.json'
    },
     {
      title:'AI Chatbot Support',
      sub:'Get assistance and coding help from an integrated AI chatbot',
      link:'https://cdn.lordicon.com/ckdooote.json'
    },
     {
      title:'Guest & Authenticated Access',
      sub:'Access the IDE as a guest or log in for a personalized experience',
      link:'https://cdn.lordicon.com/rzsnbiaw.json'
    }
  ]
  return (
 
    <div>
      <div className="nav flex">
        <div className="head"><h1 className="font-serif text-3xl font-bold" style={{ display: 'flex', gap: '8px' }}><div className='t'>AlphaCode</div><div style={{ color: 'white' }}>IDE</div></h1></div>
        
        
        <div className="btns">

          <button className='bt font-serif font-semibold' onClick={() => { window.open("/login", "_blank") }}><lord-icon
            src="https://cdn.lordicon.com/rzsnbiaw.json"
            trigger="hover"
            stroke="bold"
            className='icon'>
          </lord-icon>Login</button>
          <button className='bt font-serif font-semibold' onClick={()=>{window.open("/guest","_blank")}} ><lord-icon className='icon'
            src="https://cdn.lordicon.com/vgxjrbxm.json"
            trigger="hover"
            stroke="bold"></lord-icon>Explore</button>
        </div>
      </div>


      <hr style={{ background: 'rebeccapurple', height: '2px', border: 'none' }} />


      <div className="heading">
        <div className="h">
          <h1 className='title font-serif font-bold tracking-tight'>Dive into the Realm of Coding with AlphaCode!!!</h1>
        </div>

        <p className='bottom font-serif text-xl leading-relaxed'>Welcome to AlphaCode - Your Ultimate Code IDE, designed to support almost any programming language to enhance your coding experience.
        </p>

      </div>
      <div className="button flex">
        <button className='bt font-serif font-bold text-lg' onClick={() => { window.open("/signup", "_blank") }}>Sign Up</button>
        <button className='bt font-serif font-bold text-lg' onClick={() => {
          window.open('/guest', '_blank')
        }}>Explore as Guest</button>
      </div>
      <ScrollAnimation animateIn="fadeIn" animatePreScroll={false}>
      <div className="img"><img className='im' src="1.jpeg" alt="" /></div>
      </ScrollAnimation>
      
      <h1 className='why font-serif font-bold text-4xl bottom-1'>Why AlphaCode?</h1>


         <ScrollAnimation animateIn="fadeIn">

        
      <div className="features">   
        {cards.map((ele,i)=>{
          return(
          <div key={i} className="box3 pt-4 pb-4 pl-4 pr-4">
          <div ><h1 className="h font-serif font-semibold text-xl">{ele.title}
            <div className="ic">
              <lord-icon
                src={ele.link}
                trigger="hover"
                stroke="bold"
                style={{ height: '50px', width: '50px' }}
                colors="primary:#4f1091,secondary:#7166ee">
              </lord-icon>
            </div>
          </h1></div>
          <div className="para"><p className="font-serif text-base">{ele.sub}</p></div>
        </div>
          )
        })}
       
   
       
      </div>
      </ScrollAnimation>
    </div>
  )
}

export default home
