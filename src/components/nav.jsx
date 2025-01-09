import React from 'react'
import './nav.css'
const nav = () => {
  return (
    <div className='nav'>
        <div className='heading'>BingWatch🍿-Your Movie App</div>
      <div className='side' style={{position:'absolute', right:'30px', cursor:'pointer'} }>Favourites</div>
    </div>
  )
}

export default nav
