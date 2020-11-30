import { Router } from 'express'
import { oneUserByEmail, allUser, updateOneUser } from './user.controllers'

const router = Router()

router.get('/all', allUser)
router.get('/', oneUserByEmail)
router.put('/', updateOneUser)

export default router
