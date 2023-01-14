import { Request, Response } from 'express'
import AppError from 'utils/error'

const errorHandler = (
    { message = 'Something went wrong', stack, status = 500 }: AppError,
    _: Request,
    res: Response,
) => {
    res
        .status(status)
        .json({
            success: false,
            status,
            message,
            stack: process.env.NODE_ENV === 'development' ? stack : {}
        })
}

export default errorHandler
