import { CustomError } from "./custom-error";


export class NotAuthorizedError extends CustomError {
    public statusCode: number = 401;

    private readonly error = { message: 'not authorized' };

    constructor() {
        super('not authorized');

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    public serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [this.error];
    }

}