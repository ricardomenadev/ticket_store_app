// src/pages/home/Welcome.jsx
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Welcome = () => {
  return (
    // Usamos un fondo negro puro con un sutil degradado para dar profundidad
    <div className="min-h-screen bg-black flex flex-col justify-between relative">
      {/* Overlay con efecto de gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-[#0A8F3C]/10" />

      {/* Contenido Principal */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center relative z-10">
        {/* Logo con animación suave */}
        <div className="mb-12 transform transition-all duration-1000 hover:scale-105">
          <img 
            src="/agronea-logo.png" 
            alt="Agronea 2024" 
            className="w-72 md:w-96"
          />
        </div>
        
        {/* Textos con animación de entrada */}
        <div className="space-y-6 mb-12">
          
          <p className="text-xl text-[#FFD700] font-semibold animate-slide-up">
            19ª EDICIÓN
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto animate-slide-up-delay">
            El evento de empresas agropecuarias más grande del Norte Argentino.
          </p>
        </div>

        {/* Botón de Ingreso con efecto hover */}
        <Link 
          to="/home"
          className="group relative px-12 py-4 overflow-hidden rounded-full"
        >
          <div className="absolute inset-0 w-full h-full transition-all duration-300 
                        bg-[#FFD700] opacity-90 group-hover:opacity-100" />
          <span className="relative z-10 text-[#0A8F3C] font-bold text-xl 
                         group-hover:text-black transition-colors duration-300">
            INGRESAR
          </span>
        </Link>
      </main>

      {/* Footer con Redes Sociales */}
      <footer className="py-8 relative z-10">
        <div className="flex justify-center space-x-8">
          {[
            { Icon: FaFacebook, url: 'https://facebook.com/agronea' },
            { Icon: FaInstagram, url: 'https://instagram.com/agronea' },
            { Icon: FaTwitter, url: 'https://twitter.com/agronea' },
            { Icon: FaYoutube, url: 'https://youtube.com/agronea' }
          ].map(({ Icon, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD700]/80 hover:text-[#FFD700] transform hover:scale-110 
                       transition-all duration-300"
            >
              <Icon size={28} />
            </a>
          ))}
          
        </div>
        <p className="mt-8 text-center text-lg text-white/80 max-w-2xl mx-auto animate-slide-up-delay">
            Desarrollado por Ricardo A. Mena.
          </p>
      </footer>
    </div>
  );
};

export default Welcome;