import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

import AllContacts from '../components/AllContacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'

const Chat = () => {
  const navigate = useNavigate()
  const {userData, isLoading} = useUser()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)

  useEffect(()=>{
    if (Object.entries(userData).length===0 && !isLoading){
      navigate('/')
    }
  }, [])

  useEffect(()=>{
    if (userData && !isLoading){
      if(userData.isAvatarSet){
        fetchContacts()
      } else {
        navigate('/setAvatar')
      }
    }
  }, [userData, isLoading])

  const fetchContacts =async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/allUsers/${userData._id}`)
    setContacts(response.data)
  }

  useEffect(()=>{
    if (!isLoading && Object.entries(userData).length===0){
      navigate('/')
    }
  },[userData, isLoading])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }

  return (
    <div>
      <div className='flex'>
        <div className='w-1/3'>

      <AllContacts contacts={contacts} handleChatChange={handleChatChange} />
        </div>
      <div>
        {
          currentChat===undefined ? 
          <Welcome /> :
          <ChatContainer currentChat={currentChat} />

        }
      </div>
      </div>
    </div>
  )
}

export default Chat
