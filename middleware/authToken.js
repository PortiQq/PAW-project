const jwt = require('jsonwebtoken');

const SECRET_KEY = 'PAWkino';

function authToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        res.status(403).send({ error: 'Invalid or expired token.' });
    }
}

module.exports = authToken;