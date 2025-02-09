const joi = require("joi");

const authValidator = (data) => {
    const schema = joi.object({
        username: joi.string().min(3).max(55).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
        role: joi.string().max(30)
    });
    return schema.validate(data);
}

const verifyValidator = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        code: joi.number().required()
    })
    return schema.validate(data)
}

const loginValidator = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).required()
    })
    return schema.validate(data)
}

module.exports = {authValidator, verifyValidator, loginValidator}