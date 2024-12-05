import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useUser } from '../context/UserContext'

const AllContacts = () => {
const {userData, isLoading} = useUser()    

  useEffect(()=>{
    fetchContacts()
  }, [])

  const fetchContacts =async () => {
    const response = axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/allUsers/${userData._id}`)
    console.log(response.data)
  }
  return (
    <div>
      COntact
    </div>
  )
}

export default AllContacts
