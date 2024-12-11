import React, { useEffect, useRef, useState } from 'react'
import Picker from 'emoji-picker-react'
import { FaSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState('')
    const pickerRef = useRef(null)
    const inputContainerRef = useRef(null)

    const handleEmojiClick = (emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message)
    }

    const sendChat = (event) => {
        event.preventDefault()
        if (msg.length > 0) {
            handleSendMsg(msg)
            setMsg('')
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target) && inputContainerRef.current && !inputContainerRef.current.contains(e.target)) {
                setShowEmojiPicker(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            {showEmojiPicker && (
                <div ref={pickerRef} className='z-10 absolute bottom-24'>
                    <Picker onEmojiClick={handleEmojiClick} />
                </div>
            )}
            <div ref={inputContainerRef} className='flex gap-2 items-center'>
                <div onClick={() => { setShowEmojiPicker(prev => !prev) }}>
                    <FaSmile className='text-[#f2b830] text-3xl cursor-pointer' />
                </div>
                <form className='flex w-full bg-slate-800 rounded-lg' onSubmit={(e) => sendChat(e)}>
                    <input type="text" className='rounded-lg w-full bg-slate-800 py-2 px-2 outline-none text-white' placeholder='Type a message' value={msg} onChange={(e) => setMsg(e.target.value)} />
                    <button type='submit' className='px-8 rounded-xl bg-[#9086f5]'><IoSend className='text-xl' /></button>
                </form>
            </div>
        </>
    )
}

export default ChatInput
