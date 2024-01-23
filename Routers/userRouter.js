const userController = require('../Controllers/userController')
const AuthMiddleware = require('../middleware/authMiddleware')
const userRouter = require('express').Router()

userRouter.post('/signup',userController.signUp)
userRouter.post('/signin',userController.signIn)
userRouter.post('/forgotpassword',userController.forgotPassword)
userRouter.post('/resetpassword/:userId/:token', userController.resetPassword);
userRouter.get('/profile',AuthMiddleware.verifyToken,userController.getProfile)
userRouter.put('/profile',AuthMiddleware.verifyToken,userController.editProfile)

module.exports=userRouter