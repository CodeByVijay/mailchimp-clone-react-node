import express from "express";
import { getUsers,CheckEmail, Register, Login, Logout } from "../controllers/UsersConroller.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { createNewSubscriber,getAllsubscribers,deleteSelectedSubscriber,deleteSubscriber,getSubscriber,sendEmail,sendSelectedSubscriberEmail,deleteSubscribeGroup,editSubscriber } from "../controllers/SubscriberController.js";
import { createGroup,getAllGroups } from "../controllers/GroupsController.js";
import { createTemplate,allTemplate,getSingleTemplate,multipleDeleteTemplate,deleteTemplate,editTemplate } from "../controllers/TemplateController.js";
import { ckEditorImageUpload } from "../controllers/CkEditorImageUpload.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/check-email', CheckEmail);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.post('/logout', Logout);

router.post('/create-group', createGroup);
router.get('/api/get-all-groups', getAllGroups);

router.post('/api/create-new-subscriber', createNewSubscriber);
router.get('/api/get-all-subscribers', getAllsubscribers);
router.post('/api/delete-selected-subscriber', deleteSelectedSubscriber);
router.post('/api/delete-subscriber', deleteSubscriber);
router.post('/api/get-subscriber', getSubscriber);
router.post('/api/send-email', sendEmail);
router.post('/api/send-seleted-subscriber-email', sendSelectedSubscriberEmail);
router.post('/api/delete-subscriber-group', deleteSubscribeGroup);
router.post('/api/edit-subscriber', editSubscriber);
router.post('/api/create-new-template', createTemplate);
router.get('/api/all-templates', allTemplate);
router.post('/api/get-template', getSingleTemplate);
router.post('/api/multiple-delete-template', multipleDeleteTemplate);
router.post('/api/delete-template', deleteTemplate);
router.post('/api/edit-template', editTemplate);





router.post('/api/ckeditor-image-upload', ckEditorImageUpload);


export default router;