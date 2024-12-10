import React from 'react'
import loader from '../assets/loader.gif'

const Loading = () => {
  return (
    <div className='relative bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center overflow-hidden'>
      <img src={loader} alt="Loading..." />
    </div>
  )
}

export default Loading
