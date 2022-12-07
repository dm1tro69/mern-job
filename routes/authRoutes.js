import {Router} from "express";

import {login, register, updateUser} from "../controllers/authControllers.js";
import {authenticateUser} from "../middleware/auth.js";

const router = Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)

export default router
