import express from 'express'
import { getAllMessages, sendMesage } from '../Controller/messageController.js';
import { isAdminAuthenticated } from '../Middleware/auth.js';

const router = express.Router();

router.post("/send",sendMesage)
router.get("/getAll",isAdminAuthenticated,getAllMessages)

export default router