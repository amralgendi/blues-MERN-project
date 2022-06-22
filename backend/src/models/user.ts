import { model, Schema, Model } from 'mongoose'
import IUser from '../interfaces/user'

const userSchema: Schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
        required: true,
    },
    verified: { type: Boolean, default: false, required: true },
})
const User: Model<IUser> = model<IUser>('User', userSchema)
export default User
