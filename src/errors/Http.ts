export default class HttpError extends Error {
    private status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;

        Object.setPrototypeOf(this, HttpError.prototype);
    }

    public get Status(): number {
        return this.status;
    }

    public get Message(): string {
        return this.message;
    }

    public static badRequest(message: string): HttpError {
        return new HttpError(400, message);
    }

    public static unauthorized(message: string): HttpError {
        return new HttpError(401, message);
    }

    public static forbidden(message: string): HttpError {
        return new HttpError(403, message);
    }

    public static notFound(message: string): HttpError {
        return new HttpError(404, message);
    }

    public static conflict(message: string): HttpError {
        return new HttpError(409, message);
    }
}
