import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import errorHandler from "../Middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import moment from 'moment';

export const patientRegister = catchAsyncError(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, gender, password, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !role) {
        return next(new errorHandler("Please fill full form!", 400));
    }

    let user = await User.findOne({ email });

    if (user) {
        return next(new errorHandler("User already registered with this email", 400));
    }

    // Convert dob to a Date object
    const dobDate = moment(dob, 'DD/MM/YYYY').toDate();

    user = await User.create({ firstName, lastName, email, phone, dob: dobDate, gender, password, role });

    res.status(200).json({
        success: true,
        message: "User registered!"
    })
});

export const login = catchAsyncError(async (req,res,next) => {
    const {email,password,confirmPassword,role} = req.body

    if (!email||!password||!confirmPassword||!role) {
        return next(new errorHandler("Please Provide all the details!",400))
    }

    if (password !== confirmPassword) {
        return next(new errorHandler("Password and confirm password do not match!",400))
    }

    const user = await User.findOne({email}).select("+password")

    if (!user) {
        return next(new errorHandler("Invalid email or password!",400))
    }
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
        return next(new errorHandler("Invalid email or password!",400))
    }

    if (role !== user.role) {
        return next(new errorHandler("User with this role not found!",400))
    }

    res.status(200).json({
        success: true,
        message: "User logged in successfully!"
    })
})
