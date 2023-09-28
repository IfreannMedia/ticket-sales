import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ExpressValidator } from 'express-validator';

interface UserPayload {
    id: string;
    email: string;
}

// solve currentUser prop not on express Request by extending it and substituting our own AuthrRequest?
// interface AuthRequest extends Request {
//     currentUser: UserPayload;
// }

// solve currentUser prop not on express Request by reaching by modifying that interface directly
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

// middleware to extract JWT info and set it on req.currentUser if user is logged in
// so all endpoints can read it
export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (error) {

    }
    next();
}