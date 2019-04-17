
// const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.cookies.access_token;
        if (token) {
        next();
    } else {
        res.sendStatus(401);
    }
}

module.exports = verifyToken;