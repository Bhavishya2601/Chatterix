import React from 'react'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'

const ChatContainer = ({currentChat}) => {
        const handleSendMsg = (msg) => {
            console.log(msg)
        }
    return (
        <>
            <div className='flex flex-col'>
                <div>header
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" className='h-20' />
                    {currentChat.name}
                    <Logout />
                </div>
                <Messages />
                <ChatInput handleSendMsg={handleSendMsg} />
            </div>
        </>
    )
}

export default ChatContainer
