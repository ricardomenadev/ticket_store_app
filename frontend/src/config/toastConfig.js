export const toastConfig = {
    position: "top-right",
    toastOptions: {
      // Estilo base para todas las notificaciones
      style: {
        background: '#333',
        color: '#fff',
        fontFamily: 'Poppins',
        borderRadius: '8px',
        padding: '16px',
      },
      // Configuración específica para cada tipo de notificación
      success: {
        duration: 3000,
        style: {
          background: '#059669',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#059669',
        },
      },
      error: {
        duration: 4000,
        style: {
          background: '#DC2626',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#DC2626',
        },
      },
      loading: {
        duration: Infinity,
        style: {
          background: '#2563EB',
        },
      },
    },
  };
  
  // También podemos crear funciones helper para mensajes comunes
  export const toastMessages = {
    loginSuccess: '¡Sesión iniciada correctamente!',
    loginError: 'Error al iniciar sesión',
    logoutSuccess: 'Sesión cerrada correctamente',
    networkError: 'Error de conexión',
    validationError: 'Por favor, completa todos los campos',
  };