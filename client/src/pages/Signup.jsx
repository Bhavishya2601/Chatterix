import React, { useEffect } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { useUser } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Signup = () => {
  const navigate = useNavigate()
  const { userData, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading && Object.entries(userData).length > 0) {
      navigate('/')
    }
  }, [])

  const particlesInit = async (main) => {
    await loadFull(main)
  }

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  }

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  }

  const handleDiscordLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/discord`
  }

  const handleTwitterLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/twitter`
  }

  return (
    <div className='relative bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center overflow-hidden'>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true },
          particles: {
            number: {
              value: 40,
              density: { enable: true, value_area: 800 }
            },
            color: { value: "#B98546" },
            shape: { type: "circle" },
            opacity: { value: 0.5 },
            size: {
              value: 70,
              random: true
            },
            move: {
              enable: true,
              speed:2,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out"
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" }
            },
            modes: {
              repulse: { distance: 200 },
              push: { quantity: 2 }
            }
          }
        }}
      />
      <div className='relative z-10 bg-opacity-100 backdrop-blur-md px-4 xs:px-8 py-8 rounded-2xl shadow-lg mx-3 w-full xs:w-auto xs:min-w-[400px]' style={{ background: 'linear-gradient(rgba(100, 149, 237, 0.15), rgba(0, 0, 0, 0.7))' }}>
        <div className='flex flex-col gap-6'>
          <div className='text-2xl text-center w-full font-bold text-white flex gap-5 items-center justify-center'>
            <div><img src="/logo.png" alt="Chatterix" className='h-12' /></div>
            <div className='font-manrope'>Chatterix</div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-4 items-center w-full justify-between  px-5 xxs:px-10 cursor-pointer py-2 rounded-lg bg-transparent border border-white hover:bg-[#ffe1e11a] text-white transition-all duration-500' onClick={handleGoogleLogin}>
              <FaGoogle className='text-2xl' />
              <div className='text-lg w-4/5 flex justify-center'> Continue with Google</div>
            </div>
            <div className='flex gap-5 items-center w-full justify-between px-5 xxs:px-10 cursor-pointer py-2 rounded-lg bg-transparent border border-white hover:bg-[#ffe1e11a] text-white transition-all duration-500' onClick={handleGithubLogin}>
              <FaGithub className='text-2xl' />
              <div className='text-lg w-4/5 flex justify-center'> Continue with Github</div>
            </div>
            <div className='flex gap-4 items-center w-full justify-between  px-5 xxs:px-10 cursor-pointer py-2 rounded-lg bg-transparent border border-white hover:bg-[#ffe1e11a] text-white transition-all duration-500' onClick={handleDiscordLogin}>
              <FaDiscord className='text-2xl' />
              <div className='text-lg w-4/5 flex justify-center'> Continue with Discord</div>
            </div>
            <div className='flex gap-4 items-center w-full justify-between  px-5 xxs:px-10 cursor-pointer py-2 rounded-lg bg-transparent border  border-white hover:bg-[#ffe1e11a] text-white transition-all duration-500' onClick={handleTwitterLogin}>
              <FaXTwitter className='text-2xl' />
              <div className='text-lg w-4/5 flex justify-center'> Continue with X</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
// import React, { useEffect } from 'react'
// import Particles from 'react-tsparticles'
// import { loadFull } from 'tsparticles'
// import { useUser } from '../context/UserContext'
// import { useNavigate } from 'react-router-dom'
// import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";

// const Signup = () => {
//   const navigate = useNavigate()
//   const { userData, isLoading } = useUser()

//   useEffect(() => {
//     if (!isLoading && Object.entries(userData).length > 0) {
//       navigate('/')
//     }
//   }, [])

//   const particlesInit = async (main) => {
//     await loadFull(main)
//   }

//   const handleGoogleLogin = () => {
//     window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
//   }

//   const handleGithubLogin = () => {
//     window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
//   }

//   const handleDiscordLogin = () => {
//     window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/discord`
//   }

//   const handleTwitterLogin = () => {
//     window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/twitter`
//   }

//   return (
//     <div className='relative bg-gradient-to-br from-black via-gray-900 to-black min-h-screen flex items-center justify-center overflow-hidden'>
//        <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           fullScreen: { enable: true },
//           particles: {
//             number: {
//               value: 50,
//               density: { enable: true, value_area: 800 }
//             },
//             color: { value: "#ffffff" },
//             shape: { type: "circle" },
//             opacity: { value: 0.5 },
//             size: { value: 3 },
//             move: {
//               enable: true,
//               speed: 2,
//               direction: "none",
//               random: true,
//               straight: false,
//               outModes: "out"
//             },
//           },
//           interactivity: {
//             events: {
//               onHover: { enable: true, mode: "grab" },
//               onClick: { enable: true, mode: "push" }
//             },
//             modes: {
//               grab: { distance: 400 },
//               push: { quantity: 2 }
//             }
//           }
//         }}
//       />
//       <div className='relative z-10 bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-800 bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[25%]'>
//         <div className='flex flex-col gap-4 text-[#879197]'>
//           <div className='text-2xl text-center w-full font-bold text-white'>Chatterix</div>
//           <div className='flex gap-4 items-center w-full justify-between px-8 cursor-pointer py-2 rounded-lg bg-transparent border border-white  text-white transition-all duration-500' onClick={handleGoogleLogin}>
//             <FaGoogle className='text-2xl' />
//             <div className='text-lg w-4/5 flex justify-center'> Continue with Google</div>
//           </div>
//           <div className='flex gap-5 items-center w-full justify-between px-8 cursor-pointer py-2 rounded-lg bg-transparent border border-white  text-white transition-all duration-500' onClick={handleGithubLogin}>
//             <FaGithub className='text-2xl' />
//             <div className='text-lg w-4/5 flex justify-center'> Continue with Github</div>
//           </div>
//           <div className='flex gap-4 items-center w-full justify-between px-8 cursor-pointer py-2 rounded-lg bg-transparent border border-white  text-white transition-all duration-500' onClick={handleDiscordLogin}>
//             <FaDiscord className='text-2xl' />
//             <div className='text-lg w-4/5 flex justify-center'> Continue with Discord</div>
//           </div>
//           <div className='flex gap-4 items-center w-full justify-between px-8 cursor-pointer py-2 rounded-lg bg-transparent border border-white  text-white transition-all duration-500' onClick={handleTwitterLogin}>
//             <FaXTwitter className='text-2xl' />
//             <div className='text-lg w-4/5 flex justify-center'> Continue with X</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Signup
