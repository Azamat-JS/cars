const Auth = require('../models/auth')
const BaseError = require('../errors/base_error')

const getProfile = async(req, res, next) =>{
  const id = req.user.userId
  const user = await Auth.findById(id)
  if(!user){
    return next(BaseError.BadRequestError('You should register or login'))
  }
 res.status(200).json( user )
}

const updateProfile = async(req, res, next) => {
    const id = req.user.userId
    const newData = {...req.body}
    if(req.fileUrl){
        newData.image = req.fileUrl
    }
    const data = await Auth.findByIdAndUpdate(id, newData, {
        new:true, runValidators:true
    })
    if(!data){
        return next(BaseError.BadRequestError('No user found with id: ' + id))
    }
    res.status(200).json({message: 'Your profile udpated successfully', data})
}

const deleteProfile = async(req, res, next) => {
    const id = req.user.userId
    const user = await Auth.findByIdAndDelete(id)
    if(!user){
        return next(BaseError.NotFoundError('No user found with id: ' + id))
    }
    res.status(200).send('Your profile was deleted successfully')
}

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
}