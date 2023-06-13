import jwt from "jsonwebtoken"


const checkJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) 
        return res.sendStatus(401)

    jwt.verify(token, "cat123", (err, user) => {
        if(err) 
            return res.sendStatus(403)
        req.user = user
        next()
    })
}

export default checkJwt