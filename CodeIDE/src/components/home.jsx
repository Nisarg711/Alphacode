import React from 'react'
import './home.css'
const home = () => {
  const name = "AlphaCode"
  return (
    <div>
      <div className="nav flex">
        <div className="head"><h1 style={{ display: 'flex', gap: '8px' }}><div className='t'>AlphaCode</div><div style={{ color: 'white' }}>IDE</div></h1></div>
        <div className="btns">

          <button className='bt' onClick={() => { window.open("/login", "_blank") }}><lord-icon
            src="https://cdn.lordicon.com/rzsnbiaw.json"
            trigger="hover"
            stroke="bold"
            className='icon'>
          </lord-icon>Login</button>
          <button className='bt' onClick={()=>{window.open("/guest","_blank")}} ><lord-icon className='icon'
            src="https://cdn.lordicon.com/vgxjrbxm.json"
            trigger="hover"
            stroke="bold"></lord-icon>Explore</button>
        </div>
      </div>
      <hr style={{ background: 'rebeccapurple', height: '2px', border: 'none' }} />
      <div className="heading">
        <div className="h">
          <h1 className='title'>Dive into the Realm of Coding with AlphaCode!!!</h1>
        </div>

        <p className='bottom'>Welcome to AlphaCode - Your Ultimate Code IDE,designed to support almost any programming language to
          enhance your coding experience.
        </p>

      </div>
      <div className="button flex">
        <button className='bt' onClick={() => { window.open("/signup", "_blank") }}>Sign Up</button>
        <button className='bt' onClick={() => {
          window.open('/guest', '_blank')
        }}>Explore as Guest</button>
      </div>
      <div className="img"><img className='im' src="1.jpeg" alt="" /></div>
      <h1 className='why'>Why AlphaCode?</h1>
      <div className="features">

        <div className="box">
          <div><h1 className="h">Supports any Programming Language
          <div className="ic">
            <lord-icon
              style={{ height: '50px', width: '50px' }}
              src="https://cdn.lordicon.com/wgmzmyvv.json"
              colors="primary:#4f1091,secondary:#7166ee"
              trigger="hover"
              stroke="bold">
            </lord-icon>
          </div>

        </h1></div>

          <div className="para"><p>Almost 30+ coding languages are supported</p></div>
        </div>
        <div className="box"><div><h1 className="h">Vibrant themes
          <div className="ic">
            <lord-icon
              src="https://cdn.lordicon.com/vysppwvq.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#4f1091,secondary:#7166ee"
              style={{ height: '50px', width: '50px' }}>
            </lord-icon>
          </div>

        </h1></div>
          <div className="para"><p>Choose the theme that best suits you to create an adequate coding atmosphere</p></div></div>
        <div className="box">
          <div>
            <h1 className="h">Advanced Code editor
          <div className="ic">
            <lord-icon
              src="https://cdn.lordicon.com/iubtdgvu.json"
              trigger="hover"
              stroke="bold"
              style={{ height: '50px', width: '50px' }}
              colors="primary:#4f1091,secondary:#7166ee">
            </lord-icon>
          </div>
        </h1>
        </div>
        <div className="para">
          <p>Features such as Code wrapping, bracket matching and error display</p></div></div>
        <div className="box">
          <div ><h1 className="h">Flexible Input options
            <div className="ic">
              <lord-icon
                src="https://cdn.lordicon.com/iadtkccx.json"
                trigger="hover"
                style={{ height: '50px', width: '50px' }}
                stroke="bold"

                colors="primary:#4f1091,secondary:#7166ee">
              </lord-icon>
            </div>
          </h1></div>
          <div className="para"><p>Provide input by either uploading your code files or by typing codes directly</p></div>
        </div>
        <div className="box">
          <div ><h1 className="h">Customizable Workspace
            <div className="ic">
              <lord-icon
                src="https://cdn.lordicon.com/eduzjjfi.json"
                trigger="hover"
                stroke="bold"
                style={{ height: '50px', width: '50px' }}
                colors="primary:#4f1091,secondary:#7166ee">
              </lord-icon>
            </div>
          </h1></div>
          <div className="para"><p>Resizable terminal, file menu and editor sections as per user need</p></div>
        </div>
        <div className="box">
          <div ><h2 className="h">Enhanced Search tools
            <div className="ic">
              <lord-icon style={{ height: '50px', width: '50px' }}
                src="https://cdn.lordicon.com/vgxjrbxm.json"
                trigger="hover"

                colors="primary:#4f1091,secondary:#7166ee"

                stroke="bold"></lord-icon>
            </div>
          </h2></div>
          <div className="para"><p>Advanced search options to enable you to find your codes easily</p></div>
        </div>
        <div className="box">
          <div ><h2 className="h">Integrated Terminal
            <div className="ic">
              <lord-icon
                style={{ height: '50px', width: '50px' }}
                src="https://cdn.lordicon.com/eeolefdw.json"
                trigger="hover"
                stroke="bold"
                colors="primary:#4f1091,secondary:#7166ee"
              >
              </lord-icon>
            </div>
          </h2></div>
          <div className="para"><p>Run commands and debug your code on the browser</p></div>
        </div>
        <div className="box"><div ><h2 className="h">AI Chatbot Support
          <div className="ic">
            <lord-icon
              style={{ height: '50px', width: '50px' }}
              src="https://cdn.lordicon.com/ckdooote.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#4f1091,secondary:#7166ee">
            </lord-icon>
          </div>
        </h2></div>
          <div className="para"><p>Chat with AI powered assistant to resolve your coding doubts effortlessly.</p></div>
        </div>
        <div className="box">
          <div ><h2 className="h">Guest & Authenticated Access
            <div className="ic">
              <lord-icon
                src="https://cdn.lordicon.com/rzsnbiaw.json"
                trigger="hover"
                style={{ height: '50px', width: '50px' }}
                stroke="bold"
                colors="primary:#4f1091,secondary:#7166ee">
              </lord-icon>
            </div>
          </h2></div>
          <div className="para"><p>Explore as a guest or access features for the Authenticated users</p></div>
        </div>
      </div>

    </div>
  )
}

export default home
