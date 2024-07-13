import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import errorHandler from "../Middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/generateToken.js";
// import moment from 'moment';
import cloudinary from 'cloudinary'

export const patientRegister = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, gender, password, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !role) {
        return next(new errorHandler("Please fill entire form!", 400));
    }

    let user = await User.findOne({ email });

    if (user) {
        return next(new errorHandler("User already registered with this email", 400));
    }

    // Convert dob to a Date object
    

    user = await User.create({ firstName, lastName, email, phone, dob, gender, password, role });

    generateToken(user, "User registered!", 200, res)

});

export const login = catchAsyncError(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body

    if (!email || !password || !confirmPassword || !role) {
        return next(new errorHandler("Please Provide all the details!", 400))
    }

    if (password !== confirmPassword) {
        return next(new errorHandler("Password and confirm password do not match!", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user) {
        return next(new errorHandler("Invalid email or password!", 400))
    }
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        return next(new errorHandler("Invalid email or password!", 400))
    }

    if (role !== user.role) {
        return next(new errorHandler(`User with this role not found!`, 400))
    }

    generateToken(user, `${user.role} logged in successfully!`, 200, res)
})

export const newAdmin = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, gender, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password) {
        return next(new errorHandler("Please fill entire form!", 400));
    }

    const isRegisterd = await User.findOne({ email })
    if (isRegisterd) {
        return next(new errorHandler(`${isRegisterd.role} with this Email already exists!`, 400))
    }

    

    const admin = await User.create({ firstName, lastName, email, phone, dob, gender, password, role: "Admin" })
    res.status(200).json({
        success: true,
        message: "New Admin registered"
    })
})

export const getAllDoctors = catchAsyncError(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" })
    res.status(200).json({
        success: true,
        doctors
    })
})

export const getUserDetail = catchAsyncError(async (req, res, next) => {
    const user = req.user
    res.status(200).json({
        success: true,
        user
    })
})

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Admin logged out successfully!"
    })
})

export const logoutPatient = catchAsyncError(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient logged out successfully!"
    })
})

export const addNewDoctor = catchAsyncError(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new errorHandler("Doctor Avatar required"))
    }

    const { docAvatar } = req.files
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "images/jpg"]

    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new errorHandler("File Format not Supported!", 400))
    }
    const { firstName, lastName, email, phone, dob, gender, password, doctorDepartment } = req.body

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !doctorDepartment) {
        return next(new errorHandler("Please fill entire form!", 400));
    }

    const isRegisterd = await User.findOne({ email })
    if (isRegisterd) {
        return next(new errorHandler(`${isRegisterd.role} already registered with this Email`))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath)

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:",cloudinaryResponse.error || "unknown cloudinary error")
    }


    const doctor = await User.create( { firstName, lastName, email, phone, dob , gender, password, doctorDepartment, role : "Doctor",
        docAvatar : {
        public_id : cloudinaryResponse.public_id,
        url : cloudinaryResponse.secure_url

    } } )
    res.status(200).json({
        success : true,
        message : "New Doctor Registered!",
        doctor
    })
})