export class AppError extends Error{
    constructor(message, statusCode=500, code=null){
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor)
    }
     toJSON() {
        return {
            name: this.name,
            message: this.message, 
            statusCode: this.statusCode,
            code: this.code,
            stack: this.stack
        };
    }
}