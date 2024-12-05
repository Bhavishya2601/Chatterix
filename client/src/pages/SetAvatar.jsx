import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import toast from 'react-hot-toast'
import { useUser } from '../context/UserContext'
import {useNavigate} from "react-router-dom"

const SetAvatar = () => {
    const navigate = useNavigate()
    const {userData} = useUser()
    const [avatar, setAvatar] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAvatar()
    }, [])

    const fetchAvatar = async () => {
        let data = []
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(`https://api.multiavatar.com/${Math.round(Math.random() * 1000)}`)
            const buffer = new Buffer(response.data)
            data.push(buffer.toString("base64"))
        }
        setAvatar(data)
        setIsLoading(false)
    }

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error('Please Select an Avatar')
        }
        const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/setAvatar`, {
            data: userData,
            img: avatar[selectedAvatar]
        })
        if (data.isSet){
            navigate('/chat')
        } else {
            toast.error('Something Went Wrong')
        }
    }

    return (
        isLoading? <div>Loading...</div> :
    <div className='h-screen w-full'>
        <div className='flex justify-center gap-5 items-center'>
            {avatar.map((data, index) => {
                return (
                    <div key={index} className={`cursor-pointer p-1 rounded-full transition-all duration-500 border-8 ${selectedAvatar === index ? " border-[#4e0eff]" : "border-transparent"}`} onClick={() => setSelectedAvatar(index)}>
                        <img src={`data:image/svg+xml;base64,${data}`} alt="Avatar" className='h-24' />
                    </div>
                )
            })}
        </div>
        <div><button className='p-2 border-2' onClick={setProfilePicture}>Set as Profile Picture</button></div>
    </div>
    )
}

export default SetAvatar
