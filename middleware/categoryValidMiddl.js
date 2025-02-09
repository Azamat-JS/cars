const  {categoryValidator}  = require('../validator/categoryValidator')
const CustomAPIError = require('./custom-api')

module.exports.categoryValidate = (req, res, next) => {
try{
    const {error} = categoryValidator(req.body)
if(error){
    return res.status(400).json({msg: error.details[0].message})
}
return next()
}
catch(error){
    throw CustomAPIError(error.message)
}
}