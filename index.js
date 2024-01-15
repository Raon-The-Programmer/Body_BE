const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URL, PORT } = require('./utils/config')
const userRouter = require('./Routers/userRouter')
const reqLogger = require('./utils/reqLogger')


const app = express()


mongoose.set('strictQuery',false)

console.log('Connecting...')
mongoose.connect(MONGODB_URL)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log("CONNECTED!!")
            console.log(`Server running at port ${PORT}`)
        })
    })
    .catch((err)=>{
        console.error("Error caused while connecting to the server: ",err)
    })


app.use(express.json())    
app.use(cors())
app.use(reqLogger)

app.use('/user',userRouter)