import express from 'express'
import { login, newAdmin, patientRegister } from '../Controller/userController.js'

const router = express.Router()

router.post("/patient/register",patientRegister)
router.post("/login",login)
router.post("/admin/register",newAdmin)

export default router