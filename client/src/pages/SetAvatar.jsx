import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import toast from 'react-hot-toast'
import { useUser } from '../context/UserContext'
import { useNavigate } from "react-router-dom"
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

import Loading from '../components/Loading'


const SetAvatar = () => {
    const navigate = useNavigate()
    const { userData, setIsLoading, setReTrigger } = useUser()
    const [avatar, setAvatar] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const [avatarLoading, setAvatarLoading] = useState(true)

    useEffect(() => {
        fetchAvatar()
    }, [])

    const particlesInit = async (main) => {
        await loadFull(main)
    }

    const fetchAvatar = async () => {
        let data = []
        for (let i = 0; i < 5; i++) {
            const response = await axios.get(`https://api.multiavatar.com/${Math.round(Math.random() * 1000)}`)
            const buffer = new Buffer(response.data)
            data.push(buffer.toString("base64"))
        }
        setAvatar(data)
        setAvatarLoading(false)
    }

    const setProfilePicture = async (e) => {
        e.preventDefault()
        if (selectedAvatar === undefined) {
            toast.error('Please Select an Avatar')
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/setAvatar`, {
                data: userData,
                img: avatar[selectedAvatar]
            })
            if (data.isSet) {
                setIsLoading(true)
                setReTrigger(prev=>prev+1)
                navigate('/chat')
            } else {
                toast.error('Something Went Wrong')
            }
        } catch (err) {
            console.log('Something went wrong while setting Avatar ', err.message)
            toast.error("Something Went Wrong")
        }
    }

    return (
        avatarLoading ? <Loading /> :
            <div className='relative bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center overflow-hidden'>
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        fullScreen: { enable: true },
                        particles: {
                            number: {
                                value: 50,
                                density: { enable: true, value_area: 800 }
                            },
                            color: { value: "#ffffff" },
                            shape: { type: "circle" },
                            opacity: { value: 0.5 },
                            size: { value: 3 },
                            move: {
                                enable: true,
                                speed: 2,
                                direction: "none",
                                random: true,
                                straight: false,
                                outModes: "out"
                            },
                        },
                        interactivity: {
                            events: {
                                onHover: { enable: true, mode: "grab" },
                                onClick: { enable: true, mode: "push" }
                            },
                            modes: {
                                grab: { distance: 400 },
                                push: { quantity: 2 }
                            }
                        }
                    }}
                />
                <div className='z-10 flex flex-col justify-center items-center gap-10'>
                    <div className='text-white text-3xl font-semibold'>Pick an avatar as your profile picture</div>
                    <div className='flex justify-center gap-5 items-center'>
                        {avatar.map((data, index) => {
                            return (
                                <div key={index} className={`cursor-pointer p-1 rounded-full transition-all duration-500 border-4 ${selectedAvatar === index ? " border-white" : "border-transparent"}`} onClick={() => setSelectedAvatar(index)}>
                                    <img src={`data:image/svg+xml;base64,${data}`} alt="Avatar" className='h-24' />
                                </div>
                            )
                        })}
                    </div>
                    <div className='p-2 border-2 bg-transparent text-white hover:bg-[#f7f7f743] transition-all duration-300 text-xl' onClick={setProfilePicture}>Set as Profile Picture</div>
                </div>
            </div>
    )
}

export default SetAvatar
