import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate('/chat')
  }, [])
  
  return (
    <div>
      404 Error not found
    </div>
  )
}

export default Error
