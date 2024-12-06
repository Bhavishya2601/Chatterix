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

    const port = parseInt(process.env.PORT)
    const app = express()
    const server = http.createServer()
    // const io = new Server(server, {
    //     cors: {
    //         origin: `${process.env.FRONTEND_URL || 'http://localhost:5173'}`,
    //         credentials: true,
    //         methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //         allowedHeaders: ['Content-Type', 'Authorization']
    //     }
    // })

    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser())
    app.use(cors({
        origin: `${process.env.FRONTEND_URL || 'http://localhost:5173'}`,
        credentials: true,
        methods: ['GET', 'POST', 'UPDATE', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))

    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            ttl: 14*24*60*60
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,
            maxAge: 14*24*60*60*1000
        }
    }))

    const startServer = async () => {
        try{
            mongoose.connect(process.env.MONGODB_URI)
            .then(()=>{
                console.log('DB connected successfully')
                app.listen(port, ()=>{
                    console.log(`Server listening at port ${port}`)
                })
            })
        } catch (err){
            console.log('Error connecting to mongodb', err.message)
        }
    }

    startServer()

    app.use('/auth', authRoutes)
    app.use('/user', userRoutes)
    app.use('/messages', msgRoutes)
    // app.use('/api/messages', messageRoutes)

    // io.on('connection', (socket)=>{
    //     console.log('user connected')

    //     socket.on('disconnect', ()=>{
    //         console.log("user disconnected")
    //     })
    // })

    app.get('/', (req, res)=>{
        res.send("Backend Started")
    })
