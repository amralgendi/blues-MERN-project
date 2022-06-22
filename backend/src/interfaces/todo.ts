import { Document, Schema, PopulatedDoc } from 'mongoose'
import IUser from './user'

interface ITodo extends Document {
    userEmail: string
    title: string
    description: string
    priority: string
    status: string
    startDate: string
    endDate: string
    user: PopulatedDoc<Document<Schema.Types.ObjectId> & IUser>
}

export default ITodo
