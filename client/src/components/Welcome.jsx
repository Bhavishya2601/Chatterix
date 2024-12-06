import React from 'react'
import { useUser } from '../context/UserContext'

const Welcome = () => {
    const {userData} = useUser()
  return (
    <div>
      WElcome {userData.name} to Chatterix!!    
    </div>
  )
}

export default Welcome
