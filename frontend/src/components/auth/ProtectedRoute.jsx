// src/components/auth/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Mientras verificamos la autenticación, mostramos un loading
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si no está autenticado, redirigimos al login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Si hay roles permitidos y el usuario no tiene el rol adecuado
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Redirigimos según el rol
        return <Navigate to={user.role === 'CUSTOMER' ? '/store' : '/dashboard'} replace />;
    }

    // Si todo está bien, mostramos el contenido
    return children;
};

export default ProtectedRoute;