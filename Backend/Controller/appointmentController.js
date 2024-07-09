import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import errorHandler from "../Middleware/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import moment from "moment";

export const postAppointment = catchAsyncError ( async (req,res,next) => {
    const { firstName, lastName, email, phone, dob, gender, appointment_date, department, doctor_firstName, doctor_lastName, hasVisited, address } = req.body

    if ( !firstName|| !lastName|| !email|| !phone|| !dob || !gender|| !appointment_date|| !department|| !doctor_firstName|| !doctor_lastName || !address ) {
        return next(new errorHandler("Please provide entire detail",400))
    }

    const isConflict = await User.find( {
        firstName : doctor_firstName,
        lastName : doctor_lastName,
        role : "Doctor",
        doctorDepartment : department
    })

    if ( isConflict.length === 0 ){
        return next(new errorHandler("Doctor not found",404))
    }
    if ( isConflict.length > 1 ){
        return next(new errorHandler("Doctors conflict! Please contact through Email or Phone !",400))
    }

    const doctorId = isConflict[0]._id
    const patientId = req.user._id

    const dobDate = moment(dob, 'DD/MM/YYYY').toDate();

    const existingAppointment = await Appointment.findOne({doctorId,patientId})

    if (existingAppointment) {
        return next(new errorHandler("You already have an appointment with this doctor",400))
    }

    const appointment = await Appointment.create( { firstName, lastName, email, phone, dob : dobDate, gender, appointment_date, department, doctor : {firstName : doctor_firstName, lastName : doctor_lastName} , hasVisited, address, doctorId, patientId } )

    res.status(200).json({
        success : true,
        message : "Appointment sent successfully!",     
        appointment
    })
})