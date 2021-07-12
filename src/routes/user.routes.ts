import { Router} from 'express'
import { login, signup} from '../requestHandler/user.handler'
import { protect } from "../middleware/protect.middleware";

const router = Router()

router.post('/user', signup)
router.post('/user/login', protect, login)


export default router