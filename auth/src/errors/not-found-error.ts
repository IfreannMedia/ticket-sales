import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    public statusCode: number = 404;

    constructor() {
        super('Route note found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    public serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'not found' }];
    }

}