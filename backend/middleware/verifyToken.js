import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
  
    const {token }= req.cookies;

    console.log(token);
    

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

   
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }
        
        req.userId = {id:decoded.id}

        next(); 
    });
};
