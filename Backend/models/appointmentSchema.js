import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide a valid Email!"]
    },
    phone: {
        type: String,
        minLength: [10, "Phone number should contain exactly 10 digits!"],
        maxLength: [10, "Phone number should contain exactly 10 digits!"]
    },
    dob: {
        type: String,
        required: [true, "Please provide DOB"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "male", "Female", "female"]
    },
    appointment_date : {
        type : String,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    doctor : {
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        }
    },
    hasVisited : {
        type : Boolean,
        require : true,
    },
    doctorId : {
        type : mongoose.Schema.ObjectId,
        default : false
    },
    patientId : {
        type : mongoose.Schema.ObjectId,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["Pending","Accepted","Rejected"],
        default : "Pending"
    }
})

export const Appointment = mongoose.model("Appointment",appointmentSchema)