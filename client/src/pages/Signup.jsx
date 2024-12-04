import React from 'react'
import axios from 'axios'

const Signup = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  }
  
  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  }

  const handleDiscordLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/discord`
  }

  return (
    <div className='flex gap-5'>
      <button onClick={handleGoogleLogin}>Google</button>
      <button onClick={handleGithubLogin}>Github</button>
      <button onClick={handleDiscordLogin}>Discord</button>
      <button>Twitter</button>
    </div>
  )
}

export default Signup
