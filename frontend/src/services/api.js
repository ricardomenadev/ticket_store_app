// src/services/api.js
import axios from 'axios';
import toast from 'react-hot-toast';

// Creamos nuestra instancia de axios con la configuración base
const api = axios.create({
    // En desarrollo usaremos localhost, pero en producción usaríamos la URL real
    baseURL: 'http://localhost:7070/api',
    // Establecemos headers por defecto
    headers: {
        'Content-Type': 'application/json'
    }
});

// Agregamos un interceptor para las peticiones
// Este código se ejecutará antes de cada petición
api.interceptors.request.use(
    (config) => {
        // Buscamos si hay un token guardado
        const token = localStorage.getItem('token');
        
        // Si existe el token, lo agregamos al header de la petición
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // Si hay un error en la petición, lo manejamos aquí
        toast.error('Error al realizar la petición');
        return Promise.reject(error);
    }
);

// Agregamos un interceptor para las respuestas
// Este código se ejecutará después de cada petición
api.interceptors.response.use(
    (response) => {
        // Si todo sale bien, retornamos la respuesta
        return response;
    },
    (error) => {
        // Manejamos diferentes tipos de errores
        if (error.response) {
            // El servidor respondió con un código de error
            switch (error.response.status) {
                case 401:
                    // No autorizado - eliminamos el token y redirigimos al login
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    toast.error('Sesión expirada, por favor vuelve a iniciar sesión');
                    break;
                case 403:
                    toast.error('No tienes permisos para realizar esta acción');
                    break;
                case 404:
                    toast.error('Recurso no encontrado');
                    break;
                case 500:
                    toast.error('Error en el servidor, intenta más tarde');
                    break;
                default:
                    toast.error(error.response.data.message || 'Ocurrió un error');
            }
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            toast.error('No se pudo conectar con el servidor');
        } else {
            // Algo salió mal al configurar la petición
            toast.error('Error al procesar la solicitud');
        }
        
        return Promise.reject(error);
    }
);

export default api;