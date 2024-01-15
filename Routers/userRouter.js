const userController = require('../Controllers/userController')
const userRouter = require('express').Router()

userRouter.post('/signup',userController.signUp)
userRouter.post('/signin',userController.signIn)
userRouter.post('/forgotpassword',userController.forgotPassword)
userRouter.post('/resetpassword/:userId/:token', userController.resetPassword);


module.exports=userRouter