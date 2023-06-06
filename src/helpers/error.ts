interface ErrorProps {
    message: string;
    statusCode: number;
    errors: any[]
}


class AppError extends Error {
    statusCode: number;
    errors: any[];

    constructor({ message, statusCode, errors = []}: ErrorProps) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

const HttpErrors = {
    BadRequest: (message = 'Bad Request', errors: any[] = []) =>
    new AppError({ message, statusCode: 400, errors }),
    Unauthorized: (message = 'Unauthorized', errors: any[] = []) =>
    new AppError({ message, statusCode: 401, errors }),
}

// маму классов ебал


export { AppError, HttpErrors };