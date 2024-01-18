import React, { useState } from 'react'
import Login from '../components/auth/Login'

const Home = () => {  return (
    <div style={{minHeight:"60vh",display:'grid',placeItems:'center'}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Login />
      </div>
    </div>
  )
}

export default Home
