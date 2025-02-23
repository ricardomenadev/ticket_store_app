// src/pages/home/Home.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Importamos todos los iconos necesarios de react-icons
import {
  FaTractor,
  FaChalkboardTeacher,
  FaVrCardboard,
  FaUsers,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";

// Componente para la galería de imágenes
// Este componente utiliza CSS Grid y motion de Framer Motion para animaciones
const ImageGallery = () => {
  // Array de imágenes que podemos expandir según necesitemos
  const images = [
    { url: "/gallery/agronea1.jpg", title: "Exposición de Maquinaria" },
    { url: "/gallery/agronea2.jpg", title: "Conferencias" },
    { url: "/gallery/agronea3.jpg", title: "Charlas Técnicas" },
    { url: "/gallery/agronea4.jpg", title: "Demostraciones en Vivo" },
    { url: "/gallery/agronea5.jpg", title: "Tecnología Agrícola" },
    { url: "/gallery/agronea6.jpg", title: "Networking" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group overflow-hidden rounded-lg"
        >
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-center absolute inset-0 flex items-center justify-center">
              {image.title}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Componente para la grilla de sponsors
// Muestra los logos de los patrocinadores con efectos de hover
const SponsorsGrid = () => {
  const sponsors = [
    { name: "Case IH", logo: "/sponsors/case.png" },
    { name: "John Deere", logo: "/sponsors/deere.png" },
    { name: "New Holland", logo: "/sponsors/newholland.png" },
    { name: "Massey Ferguson", logo: "/sponsors/massey.png" },
    { name: "Deutz-Fahr", logo: "/sponsors/deutz.png" },
    { name: "Claas", logo: "/sponsors/claas.png" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
      {sponsors.map((sponsor, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="bg-white/5 p-4 rounded-lg backdrop-blur-sm"
        >
          <img
            src={sponsor.logo}
            alt={sponsor.name}
            className="w-full h-20 object-contain filter grayscale hover:grayscale-0 transition-all"
          />
        </motion.div>
      ))}
    </div>
  );
};

// Componente principal Home
const Home = () => {
  const navigate = useNavigate();

  // Datos de las conferencias destacadas
  const conferences = [
    {
      title: "Innovación en Agricultura de Precisión",
      speaker: "Dr. Juan Pérez",
      time: "28 de junio - 10:00hs",
      description:
        "Últimos avances en tecnología agrícola y su implementación en el campo argentino",
    },
    {
      title: "Sustentabilidad y Producción",
      speaker: "Ing. María González",
      time: "28 de junio - 14:00hs",
      description: "Estrategias para una producción agrícola sostenible",
    },
    {
      title: "El Futuro del Agro",
      speaker: "Dr. Carlos Rodríguez",
      time: "29 de junio - 11:00hs",
      description: "Tendencias y proyecciones para el sector agropecuario",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header Fijo */}
      <header className="bg-black/50 backdrop-blur-sm fixed w-full z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img src="/agronea-logo.png" alt="Agronea 2024" className="h-12" />
          <div className="flex items-center space-x-6">
            <Link
              to="#exposicion"
              className="text-[#FFD700] hover:text-white transition-colors"
            >
              Exposición
            </Link>
            <Link
              to="#conferencias"
              className="text-[#FFD700] hover:text-white transition-colors"
            >
              Conferencias
            </Link>
            <Link
              to="#ubicacion"
              className="text-[#FFD700] hover:text-white transition-colors"
            >
              Ubicación
            </Link>
            <Link
              to="/store"
              className="flex items-center space-x-2 bg-[#0A8F3C] text-white px-4 py-2 rounded-full hover:bg-[#0A8F3C]/90 transition-all"
            >
              <FaShoppingCart className="text-lg" />
              <span>Tienda</span>
            </Link>
            <Link
              to="/admin/login"
              className="text-white/40 hover:text-white/60 text-sm transition-colors"
            >
              Admin
            </Link>
          </div>
        </nav>
      </header>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        {/* Aquí podrías agregar un video o imagen de fondo */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl font-bold text-white mb-4"
            >
              <span className="text-[#0A8F3C]">AGRONEA 2024</span>
              <br />
              Inteligencia Agropecuaria
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-[#FFD700] font-medium mb-4"
            >
              28, 29 y 30 de junio
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-white/90 mb-8"
            >
              Charata - Chaco
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate("/store")}
              className="group relative bg-[#0A8F3C] text-white px-8 py-4 rounded-full text-lg font-bold 
                       hover:bg-[#0A8F3C]/90 transition-all transform hover:scale-105 
                       flex items-center space-x-2"
            >
              <span>Comprar Entradas</span>
              <FaShoppingCart
                className="text-xl opacity-0 group-hover:opacity-100 transform 
                                      translate-x-[-20px] group-hover:translate-x-0 transition-all"
              />
            </motion.button>
          </div>
        </div>
      </section>
      {/* [Resto de las secciones como en el código anterior] */}
      {/* Incluir las secciones de Galería, Conferencias, Sponsors, etc. */}
      Te ayudaré a añadir las secciones de conferencias y contacto al componente
      Home, explicando cada parte del código. Estas secciones deberían colocarse
      justo después del Hero Section: jsxCopy{/* Sección de Conferencias */}
      <section
        id="conferencias"
        className="py-20 bg-gradient-to-b from-black to-[#0A8F3C]/20"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-[#FFD700] mb-12 text-center"
          >
            Conferencias Destacadas
          </motion.h2>

          {/* Grid de conferencias que se adapta a diferentes tamaños de pantalla */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conferences.map((conf, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/50 p-6 rounded-lg backdrop-blur-sm border border-[#0A8F3C]/20 
                   hover:border-[#0A8F3C]/40 transition-all duration-300"
              >
                {/* Icono decorativo para cada conferencia */}
                <FaChalkboardTeacher className="text-[#FFD700] text-3xl mb-4" />

                <h3 className="text-xl font-bold text-white mb-2">
                  {conf.title}
                </h3>
                <p className="text-[#FFD700] font-medium">{conf.speaker}</p>
                <p className="text-white/70 text-sm">{conf.time}</p>
                <p className="text-white/60 mt-4 text-sm leading-relaxed">
                  {conf.description}
                </p>

                {/* Botón para más información */}
                <button className="mt-4 text-[#0A8F3C] hover:text-[#FFD700] transition-colors text-sm font-medium">
                  Más información →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Sección de Contacto */}
      <section
        id="contacto"
        className="py-20 bg-black relative overflow-hidden"
      >
        {/* Elemento decorativo de fondo */}
        <div className="absolute inset-0 bg-[#0A8F3C]/5 backdrop-blur-3xl transform -skew-y-12" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-[#0A8F3C] mb-12 text-center"
          >
            Contacto
          </motion.h2>

          {/* Grid que divide la sección en información de contacto y formulario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div className="space-y-6">
              <h3 className="text-[#FFD700] text-xl font-semibold mb-4">
                Información de Contacto
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-white/80">
                  <FaMapMarkerAlt className="text-[#FFD700]" />
                  <span>Ruta Nacional 89 Km 74.5, Charata, Chaco</span>
                </div>

                <div className="flex items-center space-x-3 text-white/80">
                  <FaPhone className="text-[#FFD700]" />
                  <span>+54 (xxx) xxx-xxxx</span>
                </div>

                <div className="flex items-center space-x-3 text-white/80">
                  <FaEnvelope className="text-[#FFD700]" />
                  <span>info@agronea.com.ar</span>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-[#0A8F3C]/20 rounded-lg px-4 py-3 text-white
                     focus:border-[#0A8F3C] focus:ring-1 focus:ring-[#0A8F3C] transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-white/5 border border-[#0A8F3C]/20 rounded-lg px-4 py-3 text-white
                     focus:border-[#0A8F3C] focus:ring-1 focus:ring-[#0A8F3C] transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Mensaje
                </label>
                <textarea
                  rows="4"
                  className="w-full bg-white/5 border border-[#0A8F3C]/20 rounded-lg px-4 py-3 text-white
                     focus:border-[#0A8F3C] focus:ring-1 focus:ring-[#0A8F3C] transition-all"
                  placeholder="Tu mensaje..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0A8F3C] text-white py-3 rounded-lg font-bold 
                   hover:bg-[#0A8F3C]/90 transition-colors"
              >
                Enviar Mensaje
              </button>
            </motion.form>
          </div>
        </div>
      </section>
     
      <p className="mt-8 text-center text-lg text-white/80 max-w-2xl mx-auto animate-slide-up-delay">
            Desarrollado por Ricardo A. Mena.
          </p>
      
    </div>
  );
};

export default Home;
