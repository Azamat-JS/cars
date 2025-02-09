const {carValidator} = require('../validator/carsValidator')
const CustomAPIError = require('./custom-api')

module.exports.carValidate = (req, res, next) => {
try{
    const {error} = carValidator(req.body)
if(error){
    return res.status(400).json({msg: error.details[0].message})
}
return next()
}
catch(error){
    throw CustomAPIError(error.message)
}
}