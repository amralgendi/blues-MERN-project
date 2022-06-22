import jwt from 'jsonwebtoken'
import IUser from '../interfaces/user'

const generateToken = (user: IUser): string => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.SECRET_TOKEN as jwt.Secret,
        {
            expiresIn: '1h',
        }
    )
    return token
}

export { generateToken }
