import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/users'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use('/api/users', userRouter)
app.get('/', (req, res) => {
    res.send('Hello')
})
mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mn6f7.mongodb.net/blues?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('DB connected')
        app.listen(3000, () => {
            console.log('Connected')
        })
    })
