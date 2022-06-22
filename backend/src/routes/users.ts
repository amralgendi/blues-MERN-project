import express from 'express'
import { registerController, signinController } from '../controllers/user'
import { createEmailVerificationCode } from '../controllers/userVerification'
import IUser from '../interfaces/user'
import IUserVerification from '../interfaces/userVerification'
import { checkAuth } from '../middleware/checkAuth'
import User from '../models/User'
import UserVerification from '../models/UserVerification'
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Users')
})

router.post('/signin', signinController)
router.post('/register', registerController)
router.get('/verify', checkAuth, async (req, res) => {
    const { code } = req.query
    if (!code)
        return res.status(400).json({
            success: false,
            errors: {
                general: 'No Code Provided',
            },
        })
    const { id } = res.locals['user']
    const userVerification = (await UserVerification.findOne({
        user: id,
    })) as IUserVerification
    if (!userVerification)
        return res.status(400).json({
            success: false,
            errors: {
                general: 'Verification code does not exist for this user',
            },
        })
    if (userVerification.code !== code)
        return res.status(400).json({
            success: false,
            errors: {
                general: 'Code invalid or expired',
            },
        })
    const user = await User.findByIdAndUpdate(id, { verified: true })
    await UserVerification.findByIdAndDelete(userVerification.id)
    return res.status(200).json({ sucess: true, message: 'User Verified' })
})
router.get('/sendcode', checkAuth, async (req, res) => {
    const { id } = res.locals['user']
    const user = (await User.findById(id)) as IUser
    await createEmailVerificationCode(user)
    return res.json({
        success: true,
        message: 'Code sent Successfully',
    })
})

export default router
