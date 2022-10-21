import Logger from '@configs/logger';
import { NextFunction, Request, Response } from 'express';

const ErrorHandler = async (
    error: unknown,
    _req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    _next: NextFunction
) => {
    Logger.error((error as Error).message);

    res.status(500).send({
        error: {
            code: 500,
            message: 'Internal Server Error'
        }
    });
};

export default ErrorHandler;
