import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'


export const checkUser = async (req, res) => {
    const token = req.cookies.chatterix
    if (!token) {
        console.log('No token found')
        return res.status(401).json({ error: 'No token found' })
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(404).json({ message: 'UnAuthorized, Invalid Token' })

        try {
            const id = decoded.id
            const user = await User.findOne({ id })
            res.json({ user })

        } catch (err) {
            console.log('Error fetching userdata ', err.message)
        }
    })
}

export const setAvatar = async (req, res) => {
    const { email } = req.body.data
    const avatar = req.body.img

    try {

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            {
                $set: {
                    isAvatarSet: true,
                    avatarImage: avatar
                }
            },
            { new: true }
        )

        return res.json({
            isSet: updatedUser.isAvatarSet,
            img: updatedUser.avatarImage
        })
    } catch (err) {
        console.log('Error setting avatar', err.message)
        res.status(500).json({
            error: err.message,
            isSet: false
        })
    }
}

export const allUsers = async (req, res)=>{
    try{
        const AllUsers = await User.find({_id:{$ne:req.params.id}}).select([
            "email", "name", "avatarImage", "_id"
        ])
        res.json(AllUsers)
    } catch(err){
        console.log('Error fetching all the users', err.message)
        res.json({err: 'Something Went wrong'})
    } 
}

export const logout = async (req, res) => {
    try{
        res.cookie('chatterix', '', {
            httpOnly: true,
            secure: true,
            maxAge: 0,
            sameSite: 'None'
        })
        res.status(200).json({message: 'Successfully Logged Out'})
    } catch (err){
        console.log('Something Went Wrong While Logging Out', err.message)
        res.status(500).json({error: 'Something Went Wrong'})
    }
}