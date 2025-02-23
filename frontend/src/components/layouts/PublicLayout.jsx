// src/components/layouts/PublicLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaStore, FaShoppingCart } from "react-icons/fa";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Barra de navegación con efecto de vidrio esmerilado */}
      <nav className="bg-black/50 backdrop-blur-sm border-b border-[#0A8F3C]/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo y nombre */}
            <Link 
              to="/home" 
              className="flex items-center space-x-3"
            >
              <img 
                src="/agronea-logo.png" 
                alt="Agronea" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-[#0A8F3C]">
                AGRONEA 2024
              </span>
            </Link>

            {/* Enlaces de navegación */}
            <div className="flex items-center space-x-8">
              <Link
                to="/home"
                className="flex items-center space-x-2 text-white/70 hover:text-[#FFD700] transition-colors"
              >
                <FaHome />
                <span>Inicio</span>
              </Link>
              
              <Link
                to="/store"
                className="flex items-center space-x-2 text-white/70 hover:text-[#FFD700] transition-colors"
              >
                <FaStore />
                <span>Tienda</span>
              </Link>

              {/* Link discreto para admin */}
              <Link
                to="/admin/login"
                className="text-white/30 hover:text-white/50 text-sm transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal con animación de entrada */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default PublicLayout;