import jwt from "jsonwebtoken";
import { accessToken } from "../utils/generateTokens.js"; 




export const verifyTokens = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) return res.sendStatus(401); 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => { 

        if (err) {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return res.sendStatus(403); 

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {  
                if (err) return res.sendStatus(403); 
                  
                
                const newAccessToken = accessToken(decode.id);

                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'Strict',
                });

                req.user = { id: decode.id }; 
                next(); 
            });
        } else {
            req.user = { id: decode.id }; 
            next(); 
        }
    });
};



