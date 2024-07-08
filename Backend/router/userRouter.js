import express from 'express'
import { addNewDoctor, getAllDoctors, getUserDetail, login, logoutAdmin, logoutPatient, newAdmin, patientRegister } from '../Controller/userController.js'
import { isAdminAuthenticated,isPatientAuthenticated } from '../Middleware/auth.js'

const router = express.Router()

router.post("/patient/register",patientRegister)
router.post("/login",login)
router.post("/admin/addNew",isAdminAuthenticated,newAdmin)
router.get("/doctors",getAllDoctors)
router.get("/admin/me",isAdminAuthenticated,getUserDetail)
router.get("/patient/me",isPatientAuthenticated,getUserDetail)
router.get("/admin/logout",isAdminAuthenticated,logoutAdmin)
router.get("/patient/logout",isPatientAuthenticated,logoutPatient)
router.post("/doctor/addNew",isAdminAuthenticated,addNewDoctor)

export default router