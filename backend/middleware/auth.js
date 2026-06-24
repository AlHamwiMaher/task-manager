const jwt = require('jsonwebtoken')
const authMiddleware = (req,res,next) => {
     if (!req.headers.authorization) {
        return res.status(401).json({ message: "No token provided" })
    }
    const userJWT = req.headers.authorization.split(" ")[1]
    try{
        const decodedToken = jwt.verify(userJWT, process.env.JWT_SECRET )
        req.userId = decodedToken.userId
        next()
    }catch(err){
        return res.status(401).json({ message: "Invalid Token"})
    }
}
module.exports = authMiddleware