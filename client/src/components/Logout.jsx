import React from 'react'
import { BiPowerOff } from "react-icons/bi";
import axios from 'axios';
import toast from 'react-hot-toast'
import { useUser } from '../context/UserContext';

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
      <BiPowerOff onClick={handleLogout} />
    </div>
  )
}

export default Logout
