module.exports = class BaseError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
    }
    static UnauthorizedError(message, errors = []) {
        return new BaseError(401, message, errors);
    }
    static BadRequestError(message, errors = []) {
        return new BaseError(400, message, errors);
    }
    static NotFoundError(message, errors = []) {
        return new BaseError(404, message, errors);
    }
}
