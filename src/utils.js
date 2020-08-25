// generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');

// generate token and return it
function generateToken(user) {

    if (!user) return null;

    var u = {
        userId: user.user_id,
        username: user.user_name,
        firstName: user.first_name,
        lastName : user.last_name,
        img: user.img,
        aboutMyself : user.about,
        coverPic: user.coverPic

    };

    return jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

// return basic user details
function getCleanUser(user) {
    if (!user) return null;

    return {
        userId: user.user_id,
        username: user.user_name,
        firstName: user.first_name,
        lastName : user.last_name,
        img: user.img,
        aboutMyself : user.about,
        cover_img: user.cover_img
    };
}

module.exports = {
    generateToken,
    getCleanUser
}