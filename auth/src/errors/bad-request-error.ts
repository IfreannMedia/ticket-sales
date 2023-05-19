import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    public serializeErrors() {
        return [{message: this.message}];
        // return this.errors.map((error: ValidationError) => {
        //     if (error.type === 'field') {
        //         return { message: error.msg, field: error.path };
        //     }
        //     return { message: error.msg };
        // });
    }
}