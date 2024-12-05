import express from 'express'
import axios from 'axios'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import GoogleStrategy from 'passport-google-oauth2'
import GithubStrategy from 'passport-github2'
import DiscordStrategy from 'passport-discord'
import TwitterStrategy from 'passport-twitter'
import dotenv from 'dotenv'
dotenv.config()

import User from '../models/userModel.js'

const router = express.Router()

const generateToken = (user) => {
    return jwt.sign({
        id: user.id, email: user.email
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

router.use(passport.initialize())
router.use(passport.session())

router.get('/:provider/main', (req, res, next)=>{
    const {provider} = req.params
    if (!['discord', 'github', 'google', 'linkedin'].includes(provider)){
        return res.redirect(`${process.env.FRONTEND_URL}/signup`)
    }
    passport.authenticate(provider, (err, user, info)=>{
        if (err || !user){
            console.log(err.message)
            res.redirect(`${process.env.FRONTEND_URL}/signup`)
        }
        const token = generateToken(user)
        res.cookie('chatterix', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24*60*60*1000,
            sameSite: 'None'
        })
        res.redirect(`${process.env.FRONTEND_URL}/chat`)
    })(req, res, next)
})

router.get('/google', passport.authenticate("google", {
    scope: ["profile", "email"]
}))

router.get('/github', passport.authenticate("github", {
    scope: ['user:email']
}))

router.get('/discord', (req, res)=>{
    res.redirect('https://discord.com/oauth2/authorize?client_id=1313887480726028389&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fdiscord%2Fmain&scope=identify+email')
})

router.get('/twitter', passport.authenticate("twitter", {
    scope: ['tweet.read', 'users.read', 'offline.access']  
}))

passport.use("google", new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `/auth/google/main`
}, async (accessToken, refreshToken, profile, cb)=>{
    const {provider, id, displayName, email} = profile
    try{
        let user = await User.findOne({email })
        if (user){
            return cb(null, user)
        }
        const newUser = new User({
            name: displayName,
            email: email,
            id: id,
            provider: provider
        })
        const savedUser = await newUser.save()
        return cb(null, savedUser)
    } catch (err) {
        console.log("Error inserting data into database  ", err.message)
        cb(null, false, {message:"Failed to log in with google"})
    }
}))

passport.use('github', new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/main'
}, async (accessToken, refreshToken, profile, cb)=>{
    const {provider, displayName, id} = profile

    try{
        const { data: emails } = await axios.get('https://api.github.com/user/emails', {
            headers: { Authorization: `token ${accessToken}` }
        })
        const email = emails.find(email => email.primary && email.verified)?.email

        let user = await User.findOne({email})
        if (user){
            return cb(null, user)
        }

        const newUser = new User({
            name: displayName,
            email: email,
            id: id,
            provider: provider
        })
        const savedUser = newUser.save()
        return cb(null, savedUser)
    } catch (err){
        console.log("Error inserting data into database ", err.message)
        cb(null, false, {message: "Error logging in using github"})
    }
}))

passport.use('discord', new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: '/auth/discord/main'
}, async (accessToken, refreshToken, profile, cb)=>{
    const {id, global_name, provider, email} = profile

    try{
        let user = await User.findOne({email })
        if (user){
            return cb(null, user)
        }
        const newUser = new User({
            name: global_name,
            email: email,
            id: id,
            provider: provider
        })
        const savedUser = await newUser.save()
        return cb(null, savedUser)
    } catch (err) {
        console.log("Error inserting data into database  ", err.message)
        cb(null, false, {message:"Failed to log in with discord"})
    }
    
}))

passport.use("twitter", new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: '/auth/twitter/main'
}, async (accessToken, refreshToken, profile, cb)=>{
    console.log(profile)
}))

passport.serializeUser((user, cb)=>{
    cb(null, user)
})

passport.deserializeUser((user, cb)=>{
    cb(null, user)
})

export default router