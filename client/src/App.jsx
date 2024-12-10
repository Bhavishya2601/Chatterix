import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

import Loading from './components/Loading'
import UserProvider from './context/UserContext'

const Signup = lazy(() => import('./pages/Signup'))
const Error = lazy(() => import('./pages/Error'))
const Chat = lazy(() => import('./pages/Chat'))
const SetAvatar = lazy(() => import('./pages/SetAvatar'))

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
        <Toaster />
          <Suspense fallback={<Loading />} >
            <Routes>
              <Route path={'/'} element={<Signup />} />
              <Route path={'/chat'} element={<Chat />} />
              <Route path={'/setAvatar'} element={<SetAvatar />} />
              <Route path={'*'} element={<Error />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App
