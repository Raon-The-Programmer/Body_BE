const bcrypt = require('bcrypt')
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { JWT_SECRET } = require('../utils/config')

const userController = {
    signUp:async(req,res)=>{
        try{
        const body = req.body
        if(!body.password || body.password.length < 2){
            return res.status(400).json({Message:"Stick to the password rules my friend:)"})
        }
        const passwordHash = await bcrypt.hash(body.password,10)
        const user = new User({
            name:body.name,
            email:body.email,
            phone:body.phone,
            passwordHash
        })
        const savedUser = await user.save()
        console.log(savedUser)
        return res.status(201).json({Message:"User created!!"})
    }
    catch(err){
        return res.status(500).json({Message:`Server Error: ${err}`})
    }
    },
    signIn:async(req,res)=>{
        try{
            const {email,password} = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(401).json({Message:"User not available:("})
            }
            const passwordCheck = await bcrypt.compare(password,user.passwordHash)
            if(!passwordCheck){
                return res.status(401).json({Message:"Invalid Password:("})
            }
            const payload = {
                name:user.name,
                phone:user.phone,
                email:user.email,
                id:user._id
            }
            const token = jwt.sign(payload,JWT_SECRET,{expiresIn:'10hr'})
            return res.status(201).json({name:user.name,Token:token})
        }
        catch(err){
            return res.status(500).json({Message:`Error occured while signin: ${err}`})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await User.findOne({ email: email })
           
            if (!user) {
                return res.status(500).json({ message: "User not Found:(" })
            }
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2h' })
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: "msdrahuljohn@gmail.com",
                    pass: "Google@2002 "
                }
        
            })
            const mailOption = {
                from: { name: 'John', address: 'msdrahuljohn@gmail.com' },
                to:email,
                subject: 'Reset Password',
                text: `http://localhost:3001/resetpassword/${user._id}/${token}`
            }
            transporter.sendMail(mailOption, (err, info) => {
                if (err) {
                    console.log({ error: err })
                }
                else {
                    console.log({ Information: info })
                }
            })
        }
        catch (err) {
            return res.status(401).json({ message: "Server error" })
        }
    },
    resetPassword: async (req, res) => {
        try {
        
          const { userId, token } = req.params;

          const { newPassword } = req.body;
    
          // Verify the token
          const decoded = jwt.verify(token, JWT_SECRET);
    
          if (decoded.id !== userId) {
            return res.status(401).json({ message: 'Invalid token' });
          }
    
          // Update the user's password
          const user = await User.findById(userId);
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.passwordHash = hashedPassword;
          await user.save();
    
          res.status(200).json({ message: 'Password reset successful' });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server error' });
        }
      },
      getProfile: async (req, res) => {
        try {
            const userId = req.userId
            const user = await User.findById(userId, {})
            console.log("user: ", user)
            return res.status(200).json(user)
        }
        catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    editProfile: async (req, res) => {
        try {
            const userId = req.userId
            const { name,phone,address } = req.body
            const user = await User.findByIdAndUpdate(userId, { name,phone,address }, { new: true })
            return res.status(200).json({ message: "User updated successfully!!", user })
        }
        catch (err) {
            return res.status(500).json({ error: err.message })
        }
    },
    deleteProfile: async (req, res) => {
        try {
            const userId = req.userId
            const user = await User.findByIdAndDelete(userId)
            return res.status(200).json({ message: "User deleted successsfully!!" })
        }
        catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }


}

module.exports=userController