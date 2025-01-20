import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { toastMessage } from '../config/toastConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        try {
            setLoading(true);
            const loadingToast = toast.loading('Iniciando sesión...');

            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);

            toast.success(toastMessage.loginSuccess, { id: loadingToast });
            return response.data

        }   catch (error) {
    }