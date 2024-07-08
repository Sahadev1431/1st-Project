class errorHandler extends Error {
    constructor (message,statuscode) {
        super(message)
        this.statuscode = statuscode
    }
}

export const errorMiddleware = (err,req,res,next) => {
    err.message = err.message || "Internel Server Error"
    err.statuscode = err.statuscode || 500

    if ( err.code === 11000 ) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new errorHandler(message,400)
    }
    if ( err.name === "JsonWebTokenError" ) {
        const message = "Json web token is invalid, try again!" 
        err = new errorHandler(message,400)
    }
    if ( err.name === "TokenExpiredError" ) {
        const message = "Json web token is expired, try again!" 
        err = new errorHandler(message,400)
    }
    if ( err.name === "CastError" ) {
        const message = `Invalid ${err.path}`
        err = new errorHandler(message,400)
    }

    return res.status(err.statuscode).json({
        success : false,
        message : err.message
    })
}

export default errorHandler