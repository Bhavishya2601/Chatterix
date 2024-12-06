import express from 'express'
import {checkUser, setAvatar, allUsers, logout} from '../controllers/userController.js'

const router = express()

router.get('/checkUser', checkUser)
router.get('/allUsers/:id', allUsers)
router.post('/setAvatar', setAvatar)
router.post('/logout', logout)

export default router