import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 characters !"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Patient", "Admin", "Doctor"]
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

export const User = mongoose.model("User", userSchema)