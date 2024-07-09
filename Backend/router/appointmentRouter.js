import express from 'express'
import { postAppointment } from '../Controller/appointmentController.js'
import { isPatientAuthenticated } from '../Middleware/auth.js'

const router = express.Router()

router.post("/post",isPatientAuthenticated,postAppointment)

export default router