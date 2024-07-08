import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema( {
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        validate : [validator.isEmail , "Please Provide a valid Email!"]
    },
    phone : {
        type : String,
        minLength : [10,"Phone number should contain exactly 10 digits!"],
        maxLength : [10,"Phone number should contain exactly 10 digits!"]
    },
    message : {
        type : String,
        require : true,
        minLength : [10,"Message should contain at least 10 characters!"]
    }
})

export const Message = mongoose.model("Message",messageSchema)