import { Model, model, Schema } from 'mongoose'
import ITodo from '../interfaces/todo'

const todoSchema = new Schema({
    userEmail: String,
    title: String,
    description: String,
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
    },
    status: {
        type: String,
        enum: ['in progress', 'under review', 'rework', 'completed'],
    },
    startDate: String,
    endDate: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
})

const Todo: Model<ITodo> = model<ITodo>('Todo', todoSchema)

export default Todo
