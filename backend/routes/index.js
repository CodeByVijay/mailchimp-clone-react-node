import express from "express";
import { getUsers,CheckEmail, Register, Login, Logout } from "../controllers/UsersConroller.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/check-email', CheckEmail);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.post('/logout', Logout);
 
export default router;