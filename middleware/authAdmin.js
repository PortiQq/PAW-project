const auth = require("../routes/auth");

function authAdmin(req, res, next) {
    if (!req.user || req.user.role !== true) {
        return res.status(403).send({ error: 'Access denied' });
    }
    next();
}

module.exports = authAdmin;