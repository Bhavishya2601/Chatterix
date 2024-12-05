import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

import AllContacts from '../components/AllContacts'

const Chat = () => {
  const navigate = useNavigate()
  const {userData, isLoading} = useUser()
  const [contacts, setContacts] = useState([])

  useEffect(()=>{
    fetchContacts()
  }, [])

  const fetchContacts =async () => {
    const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/allUsers/${userData._id}`)
    console.log('hello', response.data)
  }

  useEffect(()=>{
    if (!isLoading && Object.entries(userData).length===0){
      navigate('/')
    }
  },[userData, isLoading])

  return (
    <div>
      chat
      <br/><br/>
      <Link to={'/setAvatar'}>avatar</Link>
      {/* <AllContacts /> */}
    </div>
  )
}

export default Chat
