import Logger from '@configs/logger';
import { NextFunction, Request, Response } from 'express';
import HttpError from '@errors/Http';

const ErrorHandler = async (
    error: unknown,
    _req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    _next: NextFunction
) => {
    if (error instanceof HttpError) {
        Logger.error(
            `ErrorHandler: HttpError: ${JSON.stringify(error.Message)}`
        );

        return res.status(error.Status).send({ error: error.Message });
    }

    Logger.error((error as Error).message);

    return res.status(500).send({
        error: {
            code: 500,
            message: 'Internal Server Error'
        }
    });
};

export default ErrorHandler;
