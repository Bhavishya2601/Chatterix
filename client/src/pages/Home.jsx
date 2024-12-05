import React from 'react'
import {Link} from 'react-router-dom'
import { useUser } from '../context/UserContext'

const Home = () => {
  const {userData, isLoading} = useUser()
  return (
    <div>
      <Link to={Object.entries(userData).length > 0 && !isLoading ? '/chat' : "/signup"}>Get started</Link>
    </div>
  )
}

export default Home
