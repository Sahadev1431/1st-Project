import express from 'express'
import { sendMesage } from '../Controller/messageController.js';

const router = express.Router();

router.post("/send",sendMesage)

export default router