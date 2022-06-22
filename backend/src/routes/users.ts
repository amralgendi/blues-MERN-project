import express from 'express'
import { registerController, signinController } from '../controllers/user'
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Users')
})

router.post('/signin', signinController)
router.post('/register', registerController)

export default router
