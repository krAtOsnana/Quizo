import express from "express";
import { getMe, login, logout, signup } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoutes.js";

const router = express.Router()

router.post('/signup', protectRoute, signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/me',getMe)


export default router
