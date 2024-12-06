import React, {useState} from 'react'
import Picker from 'emoji-picker-react'

const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [msg, setMsg] = useState('')

    const handleEmojiClick = (emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message)
    }

    const sendChat = (event) => {
        event.preventDefault()
        if (msg.length > 0){
            handleSendMsg(msg)
            setMsg('')
        }
    }
    
    return (
        <div className='flex gap-2'>
            <div onClick={()=>{setShowEmojiPicker(prev => !prev)}}>
                smile
            </div>
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
            <form className='flex gap-3' onSubmit={(e)=>sendChat(e)}>
                <input type="text" placeholder='Type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)} />
                <input type='submit' value="send" />
            </form>
        </div>
    )
}

export default ChatInput
