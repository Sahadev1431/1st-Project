import { Message } from '../models/messageSchema.js'
import { catchAsyncError } from '../Middleware/catchAsyncError.js'
import errorHandler from '../Middleware/errorMiddleware.js'

export const sendMesage = catchAsyncError(async ( req,res,next ) => {
    const {firstName,lastName,email,phone,message} = req.body
    if ( !firstName || !lastName || !email || !phone || !message ) {
        return next(new errorHandler("Please Fill full Form !",400))
    }

    await Message.create({ firstName, lastName, email, phone, message })
    return res.status(200).json( {
        success  : true,
        message : "Message sent successfully!"
    })
})

export const getAllMessages = catchAsyncError ( async (req,res,next) => {
    const messages = await Message.find()
    res.status(200).json( {
        success : true,
        messages
    })
})