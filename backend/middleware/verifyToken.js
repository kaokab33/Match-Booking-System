const jwt = require('jsonwebtoken');
const JWT_SECRET = "dasjdnwjknejkq";
const verifyToken = async (req, res, next) => {
    try {
        var token = req.header('Authorization');
        if (!token) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};
module.exports = verifyToken;