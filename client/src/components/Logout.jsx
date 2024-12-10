import React from 'react'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useUser } from '../context/UserContext';
import { CiLogout } from "react-icons/ci";

const Logout = () => {
    const {setUserData} = useUser()
    const handleLogout = async () => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {}, {
                withCredentials: true
            })
            if (response.status === 200){
                toast.success('Successfully Logged Out')
                setUserData({})
            }
        } catch (err){
            console.log('Something Went Wrong While logging out', err.message)
            toast.error('Something Went Wrong')
        }
    }
  return (
    <div>
      <CiLogout className='text-red-600 text-3xl font-bold cursor-pointer' onClick={handleLogout} />
    </div>
  )
}

export default Logout
