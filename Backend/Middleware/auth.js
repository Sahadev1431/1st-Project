import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import errorHandler from "./errorMiddleware.js";
import jwt from 'jsonwebtoken'

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.adminToken
    if (!token) {
        return next(new errorHandler("Admin is not authenticated", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id)
    if (req.user.role !== "Admin") {
        return next(errorHandler(`${req.user.role} is not authorized for these resources!`,403))
    }
    next()
})

export const isPatientAuthenticated = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.patientToken
    if (!token) {
        return next(new errorHandler("Patient is not authenticated", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    req.user = await User.findById(decoded.id)
    if (req.user.role !== "Patient") {
        return next(errorHandler(`${req.user.role} is not authorized for these resources!`,403))
    }
    next()
})