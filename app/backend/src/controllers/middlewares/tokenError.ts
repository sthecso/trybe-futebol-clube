import { ErrorRequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";

const tokenError: ErrorRequestHandler = (err, _req, res, next) => {
    if(err instanceof JsonWebTokenError) {
        return res.status(400).json({ message: 'Invalid token format'});
    }

    next(err);
}

export default tokenError;
