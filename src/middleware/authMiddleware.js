// intercept request
// Read token 
// Verify token is correct for that particular user
import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next) {
    //  headerS
    const token = req.headers['authorization']
    console.log(`authMiddleware 02 ${token}`)
    if (!token) { return res.status(401).json({ message: "No token provided" }) }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) { return res.status(401).json({ message: "Invalid token" }) }
        req.userId = decoded.id
        console.log(`authMiddleware 03 ${decoded.id}`)
        next()
    })

}

export default authMiddleware;