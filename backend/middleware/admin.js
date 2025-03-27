const jwt = require('jsonwebtoken');
const isAdmin = (req, res, next) => {
    const role = req.headers.role;
    if (role !== 'Admin') {
        return res.status(403).json({ msg: 'Only admins can approve or disapprove users' });
    }
    next();
};

module.exports = isAdmin;
