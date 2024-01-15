const reqLogger = (req,res,next)=>{
    console.log("Method: ",req.method)
    console.log("Path: ",req.path)
    console.log("Data: ",req.body)
    console.log('-------------------------------------')
    next()
}

module.exports = reqLogger