import express from "express";
import { getUsers,CheckEmail, Register, Login, Logout } from "../controllers/UsersConroller.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { createNewSubscriber,getAllsubscribers } from "../controllers/SubscriberController.js";
import { createGroup,getAllGroups } from "../controllers/GroupsController.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/check-email', CheckEmail);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.post('/logout', Logout);

router.post('/create-group', createGroup);
router.get('/get-all-groups', getAllGroups);

router.post('/create-new-subscriber', createNewSubscriber);
router.get('/get-all-subscribers', getAllsubscribers);

 
export default router;