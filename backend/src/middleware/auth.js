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