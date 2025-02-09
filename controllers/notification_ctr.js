const BaseError = require('../errors/base_error');
const Notification = require('../models/notification')

const getAllNotifications = async (req, res, next) => {
  const notifications = await Notification.find();
  if(!notifications){
 return next(BaseError.NotFoundError(`There is no notifications in the website`))
  }
  res.status(200).json(notifications);
};

const getOneNotification = async(req, res, next) => {
  const {notificationId} = req.params
  const notification = await Notification.findById(notificationId)
  if(!notificationId){
     return next(BaseError.NotFoundError(`There is no notification with id: ${notificationId}`))
  }
  res.status(200).json(notification)
}

const addNotification = async (req, res, next) => {
  const notification = await Notification.create(req.body);
  if(!notification){
   return next(BaseError.BadRequestError(`Please provide notification`))
  }
  res.status(201).json({
    msg: "Notification added successfully",
    notification});
};

const updateNotification = async (req, res) => {
  const {params:{notificationId}, body: {notification}} = req;
  
  if(!notificationId || !notification){
    throw BaseError.BadRequestError('Please provide id or notification field')
  }
  const notification1 = await Notification.findByIdAndUpdate(notificationId, req.body,
    {new:true, runValidators:true}
  )
  if(!notification1){
    return next(BaseError.NotFoundError(`There is no notification with id: ${notificationId}`))
  }
  res.status(200).json({
    msg: "Notification updated successfully",
    notification1})
}

const deleteNotification = async (req, res) => {
  const {notificationId} = req.params
   const notification = await Notification.findByIdAndDelete(notificationId)
   if(!notification){
    return next(BaseError.NotFoundError(`There is no notification with id: ${notificationId}`))
   }
  res.status(200).json({msg:"Notification deleted successfully"})
}


module.exports = {
  getAllNotifications,
  addNotification,
  getOneNotification,
  updateNotification,
  deleteNotification
};