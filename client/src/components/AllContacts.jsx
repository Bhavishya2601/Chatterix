import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useUser } from '../context/UserContext'

const AllContacts = ({ contacts, handleChatChange }) => {
  const { userData, isLoading } = useUser()
  const [currentSelected, setCurrentSelected] = useState(undefined)
  const { name, avatarImage } = userData

  const changeCurrentChat = (index, contacts) => {
    setCurrentSelected(index)
    handleChatChange(contacts)
  }

  return (
    <>
    <div>logo</div>
    <div className='flex flex-col gap-8 bg-yellow-500'>
      {contacts.map((contact, index) => {
        return (
          <div key={index} className={`bg-red-500 flex gap-5 items-center ${currentSelected===index ? 'bg-blue-500' : ""}`} onClick={()=>changeCurrentChat(index, contact)}>
            <div><img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" className='h-20' /></div>
            <div>{contact.name}</div>
          </div>
        )
      })}
    </div>
    <div className='flex gap-10'>
      <img src={`data:image/svg+xml;base64,${userData.avatarImage}`} alt="avatar" className='h-20' />
      <div>
      <div>{userData.name}</div>
      <div>{userData.email}</div>
      </div>
    </div>
    </>
  )
}

export default AllContacts
