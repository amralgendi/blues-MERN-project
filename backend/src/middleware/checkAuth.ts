import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authentication } = req.headers

    if (!authentication)
        return res.status(400).json({
            success: false,
            errors: {
                general: 'Authentication required',
            },
        })
    const token = (authentication as string).split('Bearer ')[1]
    if (!token)
        return res.status(400).json({
            success: false,
            errors: {
                general: 'Bad Authentication',
            },
        })
    try {
        const decodedToken = jwt.verify(
            token,
            process.env.SECRET_TOKEN as string
        )
        res.locals['user'] = decodedToken
        next()
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            errors: {
                general: 'Not Logged in!',
            },
        })
    }
}

export { checkAuth }
