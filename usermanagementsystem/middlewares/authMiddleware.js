const jwt = require('../utils/jwtHelper')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verifyToken(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
        next();
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied: Admins only' });
    next();
};

const isSelfOrAdmin = (req, res, next) => {
    const userId = parseInt(req.params.id);
    if (req.user.role === 'admin' || req.user.id === userId) {
        return next();
    }
    return res.status(403).json({ message: 'Access denied' });
};

module.exports = { authMiddleware, isAdmin, isSelfOrAdmin };