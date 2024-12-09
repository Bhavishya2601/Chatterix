import React, { useState, useEffect, useRef } from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios'
import { useUser } from '../context/UserContext'
import {v4 as uuid} from 'uuid'

const ChatContainer = ({ currentChat, socket }) => {
    const { userData } = useUser()
    const [messages, setMessages] = useState([])
    const [arrivalMsg, setArrivalMsg] = useState(null)
    const scrollRef = useRef()

    const handleSendMsg = async (msg) => {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/messages/addMsg`, {
            from: userData._id,
            to: currentChat._id,
            message: msg
        })
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: userData._id,
            message: msg
        })

        const msgs = [...messages]
        msgs.push({
            fromSelf: true, 
            message: msg
        })
        setMessages(msgs)
    }

    useEffect(()=>{
        if (socket.current){
            socket.current.on("msg-recieve", (msg)=>{
                setArrivalMsg({
                    fromSelf: false,
                    message: msg
                })
            })
        }
    }, [])

    useEffect(()=>{
        console.log('arrivalmsg', arrivalMsg)
        arrivalMsg && setMessages((prev)=>[...prev, arrivalMsg])
    }, [arrivalMsg])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [messages])

    useEffect(() => {
        const fetchMsg = async () => {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/messages/allMsg`, {
                from: userData._id,
                to: currentChat._id
            })
            setMessages(response.data)
        }
        if (currentChat){
            fetchMsg()
        }
    }, [currentChat])

    return (
        <>
            <div className='flex flex-col'>
                <div>header
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" className='h-20' />
                    {currentChat.name}
                    <Logout />
                </div>
                {/* <Messages /> */}
                <div>
                    {messages.map((msg) => {
                        return (
                            <div ref={scrollRef} key={uuid()}>
                                {/* {console.log(msg.fromSelf, msg.message)} */}
                                {msg.message}
                            </div>
                        )
                    })}
                </div>
                <ChatInput handleSendMsg={handleSendMsg} />
            </div>
        </>
    )
}

export default ChatContainer
