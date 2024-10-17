import jwt from "jsonwebtoken"



const accessToken=(id)=>{
    return jwt.sign({ id },process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "1h" })
}

 const refreshToken=(id)=>{
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}


export const setTokensInCookies = (res, id) => {
    
    const accessTokenValue = accessToken(id);
    const refreshTokenValue = refreshToken(id);
  
     
    res.cookie("accessToken", accessTokenValue, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === "production", 
      maxAge: 60 * 60 * 1000, 
    });
  
    res.cookie("refreshToken", refreshTokenValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, 
    });
  };