export enum StatusCode {
    OK = 200,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

class AppError extends Error {
    status: StatusCode

    constructor(message: string, status: StatusCode) {
        super(message)
        
        Object.setPrototypeOf(this, new.target.prototype)

        this.name = Error.name
        this.status = status

        Error.captureStackTrace(this)
    }
}

export default AppError
