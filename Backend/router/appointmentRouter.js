import express from 'express'
import { deleteAppointment, postAppointment, updateAppointmentStatus, getAllAppointments } from '../Controller/appointmentController.js'
import { isAdminAuthenticated,isPatientAuthenticated } from '../Middleware/auth.js'

const router = express.Router()

router.post("/post",isPatientAuthenticated,postAppointment)
router.get("/getAll",isAdminAuthenticated,getAllAppointments)
router.put("/update/:id",isAdminAuthenticated,updateAppointmentStatus)
router.delete("/delete/:id",isAdminAuthenticated,deleteAppointment)

export default router