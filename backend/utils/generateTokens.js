import jwt from "jsonwebtoken";


const isProduction = process.env.NODE_ENV === "production";


export const accessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}


export const refreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "2d" });
}


export const setTokensInCookies = (res, id) => {
    const accessTokenValue = accessToken(id);
    const refreshTokenValue = refreshToken(id);

    res.cookie("accessToken", accessTokenValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 60 * 60 * 1000, 
        sameSite: isProduction ? 'None' : 'Lax',
    });

    res.cookie("refreshToken", refreshTokenValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite: isProduction ? 'None' : 'Lax',
    });

};