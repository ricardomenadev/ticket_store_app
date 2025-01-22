// src/context/auth/authReducer.js
import { AUTH_TYPES } from './types';

export const authReducer = (state, action) => {
    // El reducer es como un controlador de tráfico que decide cómo cambia el estado
    switch (action.type) {
        case AUTH_TYPES.LOGIN_START:
            // Cuando comenzamos el proceso de login
            return {
                ...state,
                loading: true,
                error: null
            };
            
        case AUTH_TYPES.LOGIN_SUCCESS:
            // Cuando el login es exitoso
            return {
                ...state,
                user: action.payload, // aquí payload es la información del usuario
                loading: false,
                isAuthenticated: true,
                error: null
            };
            
        case AUTH_TYPES.LOGIN_ERROR:
            // Cuando hay un error en el login
            return {
                ...state,
                loading: false,
                error: action.payload, // aquí payload es el mensaje de error
                isAuthenticated: false
            };
            
        case AUTH_TYPES.LOGOUT:
            // Cuando el usuario cierra sesión
            return {
                ...state,
                user: null,
                loading: false,
                isAuthenticated: false,
                error: null
            };
            
        default:
            return state;
    }
};