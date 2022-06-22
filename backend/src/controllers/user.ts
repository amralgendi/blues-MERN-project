import { Request, Response } from 'express'
import IUser from '../interfaces/user'
import User from '../models/user'
import { createHashedPassword, isValidPassword } from '../utils/hashPassword'
import { generateToken } from '../utils/jwt'
import { validateRegistration, validateSignin } from '../utils/userValidation'

const registerController = async (req: Request, res: Response) => {
    const { email, password, confirmPassword } = req.body
    const { valid, errors } = validateRegistration(
        email,
        password,
        confirmPassword
    )
    if (!valid) return res.status(400).json({ success: false, errors })
    const existingUser = await User.findOne({ email })
    if (existingUser)
        return res.status(400).json({
            success: false,
            errors: {
                email: 'Email already exists',
            },
        })
    const hashedPassword = await createHashedPassword(password)
    const newUser = new User({ email, password: hashedPassword })
    const result = await newUser.save()
    const token = generateToken(result)

    res.status(200).json({
        success: true,
        data: {
            id: result.id,
            email: result.email,
            token,
        },
    })
}

const signinController = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const { valid, errors } = validateSignin(email, password)
    if (!valid) return res.status(400).json({ success: false, errors })
    const user = (await User.findOne({ email })) as IUser

    if (!user)
        res.status(400).json({
            success: false,
            errors: { email: 'Email does not exists' },
        })
    const validPassword = await isValidPassword(password, user.password)

    if (!validPassword)
        return res.json({
            success: false,
            errors: {
                password: 'Invalid Password',
            },
        })
    const token = generateToken(user)
    res.status(200).json({
        success: true,
        data: {
            id: user.id,
            email: user.email,
            token,
        },
    })
}

export { registerController, signinController }
