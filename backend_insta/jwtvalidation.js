
module.exports =(req,res,next)=>{
    var token=req.header
    // console.log(token)   
    jwt.verify(token, "calwin123", (err, decode) => {
        if (err) {
            res.send('invalid auth')
        } 
        else {
            req.token=decode
            next()
        }
    }
    )

}
