import dotenv from 'dotenv'
dotenv.config()

import express from "express"
import http from "http"
import {Server} from "socket.io"
import MongoStore from 'connect-mongo'
import cors from "cors"
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import session from 'express-session'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import msgRoutes from './routes/messagesRoute.js'

const port = parseInt(process.env.PORT) || 3000
const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(cors({
    origin: `${process.env.FRONTEND_URL || '*'}`,
    credentials: true,
    methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const startServer = async () => {
    try{
        mongoose.connect(process.env.MONGODB_URI, {
            dbname: 'chatterix'
        })
        .then(()=>{
            console.log('DB connected successfully')
            server.listen(port, ()=>{
                console.log(`Server listening at port ${port}`)
            })
        })
    } catch (err){
        console.log('Error connecting to mongodb', err.message)
    }
}

startServer()

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 14*24*60*60
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 14*24*60*60*1000
    }
}))

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/messages', msgRoutes)

app.get('/', (req, res)=>{
    res.send("Backend Started")
})

const io = new Server(server, {
    cors: {
        origin: `${process.env.FRONTEND_URL || 'http://localhost:5173'}`,
        credentials: true,
        methods: ['GET', 'POST']
    }
})

global.onlineUsers = new Map()

io.on('connection', (socket)=>{
    global.chatSocket = socket
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-msg", (data)=>{
        const sendUsersSocket = onlineUsers.get(data.to)
        if (sendUsersSocket){
            socket.to(sendUsersSocket).emit('msg-recieve', data)
        }
    })
})

export default app
