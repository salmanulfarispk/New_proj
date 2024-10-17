import jwt from "jsonwebtoken";


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
        maxAge: 60 * 60 * 1000,
        sameSite: 'Strict',
    });

    res.cookie("refreshToken", refreshTokenValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite: 'Strict',
    });
};