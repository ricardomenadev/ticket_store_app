// src/context/auth/AuthContext.js
import { createContext, useContext, useReducer, useEffect } from "react";
import { authReducer } from "./authReducer";
import { AUTH_TYPES } from "./types";
import api from "../../services/api";
import toast from "react-hot-toast";

// Creamos el contexto con un valor inicial nulo
const AuthContext = createContext(null);

// Definimos el estado inicial de nuestra autenticación
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// El AuthProvider es el componente que envuelve nuestra aplicación
export const AuthProvider = ({ children }) => {
  // Utilizamos useReducer para manejar el estado complejo de autenticación
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Este efecto se ejecuta al montar el componente para verificar si hay una sesión activa
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          dispatch({ type: AUTH_TYPES.LOGIN_START });

          const response = await api.get("/auth/verify");

          dispatch({
            type: AUTH_TYPES.LOGIN_SUCCESS,
            payload: response.data.user,
          });
        } catch (error) {
          console.error("Full login error:", error);
          console.error("Error response:", error.response?.data);
          console.error("Error status:", error.response?.status);
          dispatch({ type: AUTH_TYPES.LOGIN_ERROR });
          localStorage.removeItem("token");
        }
      }
    };
    checkAuth();
  }, []);

  // Función para manejar el inicio de sesión
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_TYPES.LOGIN_START });

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("Respuesta de login:", response.data);
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);

      dispatch({
        type: AUTH_TYPES.LOGIN_SUCCESS,
        payload: user,
      });

      return response.data;
    } catch (error) {
      console.error("Error en login:", error.response?.data);
      dispatch({
        type: AUTH_TYPES.LOGIN_ERROR,
        payload: error.response?.data?.error || "Error al iniciar sesión",
      });
      throw error;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    dispatch({ type: AUTH_TYPES.LOGOUT });
    localStorage.removeItem("token");
    toast.success("Sesión cerrada correctamente");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
