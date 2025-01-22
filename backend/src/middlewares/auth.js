const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                error: 'Token no proporcionado' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ 
            success: false, 
            error: 'Token inválido' 
        });
    }
};

const isSuperAdmin = async (req, res, next) => {
    if (req.user.role.name !== 'SUPER_ADMIN') {
        return res.status(403).json({ 
            error: 'Acceso permitido solo para SUPER_ADMIN' 
        });
    }
    next();
};

const isAdminOrHigher = async (req, res, next) => {
    if (!['SUPER_ADMIN', 'ADMIN'].includes(req.user.role.name)) {
        return res.status(403).json({ 
            error: 'Acceso permitido solo para administradores' 
        });
    }
    next();
};

const isStaffOrHigher = async (req, res, next) => {
    if (!['SUPER_ADMIN', 'ADMIN', 'STAFF'].includes(req.user.role.name)) {
        return res.status(403).json({ 
            error: 'Acceso permitido solo para personal autorizado' 
        });
    }
    next();
};

module.exports = { verifyToken, isSuperAdmin, isAdminOrHigher, isStaffOrHigher };