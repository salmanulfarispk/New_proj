import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";
 

export const verifyAndRegenerateAccessToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;


  if (!accessToken) {
    if (!refreshToken) {
      return res.status(401).json({ message: "Access token and refresh token not found." });
    }


    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedRefresh) => {
        
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token." });
      }

    
      const newAccessToken = jwt.sign({ id: decodedRefresh.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure:  process.env.NODE_ENV === "production",
        maxAge: 1 * 60 * 60 * 1000, 
        sameSite: isProduction ? "None" : "Lax",
      });

      req.user = {id:decodedRefresh.id};
      return next(); 
    });
  }

  
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
       
        if (!refreshToken) {
          return res.status(401).json({ message: "Access token expired and no refresh token available." });
        }

       
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decodedRefresh) => {
          if (err) {
            return res.status(403).json({ message: "Invalid refresh token." });
          }

        
          const newAccessToken = jwt.sign({ id: decodedRefresh.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
          });

          
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure:  process.env.NODE_ENV === "production",
            maxAge: 1 * 60 * 60 * 1000, 
            sameSite: isProduction ? "None" : "Lax",
          });

          req.user = {id:decodedRefresh.id}
          return next(); 
        });
      }

      
      return res.status(403).json({ message: "Invalid access token." });
    }

    
    req.user = {id:decoded.id}
    next();
  });
};
