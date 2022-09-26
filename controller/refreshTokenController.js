const asyncHandler = require('express-async-handler');
const User = require('../models/Users')
const validator = require('validator');
const jwt = require('jsonwebtoken');

const handleRefreshToken = asyncHandler(async(req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) { /* Optional Chaining */
        res.status(401);
        throw new Error("Not Authorized")
    }
    // console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    const userExists = await User.findOne({refreshToken: refreshToken});
    if(!userExists) {
        res.status(403);
        throw new Error("Cannot Authorize, Forbidden");
    }
    // Evaluate JWT
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err || userExists.username !== decoded.username) {
            res.status(403);
            throw new Error("Cannot Authorize, Forbidden")
        }
        const accessToken = jwt.sign({
            userDetails: {
                username: decoded.username,
                isAdmin: userExists.isAdmin
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" })
        const { password, ...other } = userExists._doc;
        res.json({...other, accessToken});
    })
    
});

module.exports = {
    handleRefreshToken
}