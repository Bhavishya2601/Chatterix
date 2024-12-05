import React, { useEffect } from 'react'
import axios from 'axios'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const {userData, isLoading} = useUser()

  useEffect(()=>{
    if (!isLoading && Object.entries(userData).length > 0){
      navigate('/')
    }
  }, [])

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  }
  
  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  }

  const handleDiscordLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/discord`
  }

  const handleTwitterLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/twitter`
  }

  return (
    <div className='flex gap-5'>
      <button onClick={handleGoogleLogin}>Google</button>
      <button onClick={handleGithubLogin}>Github</button>
      <button onClick={handleDiscordLogin}>Discord</button>
      <button onClick={handleTwitterLogin}>Twitter</button>
    </div>
  )
}

export default Signup
