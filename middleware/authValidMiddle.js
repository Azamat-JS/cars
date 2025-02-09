const {authValidator, verifyValidator, loginValidator} = require("../validator/authValidator");
const CustomAPIError = require("./custom-api");

const authValidate = (req, res, next) => {
    try{
        const {error} = authValidator(req.body)
        if(error){
            return res.status(400).json({msg: error.details[0].message})
        }
        return next()
    }
    catch(error){
        throw CustomAPIError(error.message)
    }
}

const verifyValidate = (req, res, next) => {
    try {
        const {error} = verifyValidator(req.body)
        if(error){
            return res.status(400).json({msg: error.details[0].message})
        }
        return next()
    } catch (error) {
        throw CustomAPIError(error.message)
    }
}

const loginValidate = (req, res, next) => {
    try {
        const {error} = loginValidator(req.body)
        if(error){
            return res.status(400).json({msg: error.details[0].message})
        }
        return next()
    } catch (error) {
      throw CustomAPIError(error.message)  
    }
}


module.exports = {authValidate, verifyValidate, loginValidate}