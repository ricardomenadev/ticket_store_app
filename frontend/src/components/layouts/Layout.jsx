// src/components/layouts/Layout.jsx
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaStore, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Layout = () => {
  // Obtenemos la información del usuario y funciones de autenticación
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Manejador para el cierre de sesión
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Enlaces de navegación principales
  const navLinks = [
    { to: "/home", label: "Inicio", icon: FaHome },
    { to: "/store", label: "Tienda", icon: FaStore },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar con efecto de vidrio */}
      <nav className="bg-black/50 backdrop-blur-sm border-b border-[#0A8F3C]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo y nombre */}
            <Link 
              to="/home"
              className="flex items-center space-x-3 group"
            >
              <img 
                src="/agronea-logo.png" 
                alt="Agronea" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-[#0A8F3C] to-[#FFD700] text-transparent bg-clip-text">
                AGRONEA 2024
              </span>
            </Link>

            {/* Enlaces de navegación */}
            <div className="flex items-center space-x-8">
              {/* Mapeo de enlaces principales */}
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center space-x-2 text-white/70 hover:text-[#FFD700] transition-colors"
                >
                  <Icon className="text-lg" />
                  <span>{label}</span>
                </Link>
              ))}

              {/* Información del usuario y botón de logout */}
              {user && (
                <div className="flex items-center space-x-4 pl-8 border-l border-white/10">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center space-x-2"
                  >
                    <FaUserCircle className="text-[#0A8F3C] text-xl" />
                    <span className="text-white/80 text-sm">
                      {user.email}
                    </span>
                  </motion.div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full
                             text-red-500 hover:text-red-400 hover:bg-red-500/10
                             transition-all duration-300"
                  >
                    <FaSignOutAlt />
                    <span className="text-sm font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal con efecto de aparición */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default Layout;