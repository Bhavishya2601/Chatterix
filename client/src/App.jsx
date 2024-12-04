import React, {lazy, Suspense} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 

import Loading from './components/Loading'

const Home = lazy(() => import('./pages/Home'))
const Signup = lazy(() => import('./pages/Signup'))
const Error = lazy(() => import('./pages/Error'))
const Chat = lazy(() => import('./pages/Chat'))

function App() {

  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<Loading />} >
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/signup'} element={<Signup />} />
      <Route path={'/chat'} element={<Chat />} />
      <Route path={'*'} element={<Error />} />
    </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
