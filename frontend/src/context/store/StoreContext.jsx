// src/context/store/StoreContext.js
import { createContext, useContext, useReducer } from 'react';
import { storeReducer } from './storeReducer';
import { STORE_TYPES } from './types';
import api from '../../services/api';
import toast from 'react-hot-toast';

// Creamos el contexto de la tienda
const StoreContext = createContext(null);

// Estado inicial de la tienda
const initialState = {
    cart: [],
    loading: false,
    error: null,
    // Datos de demostración - En una versión real vendrían de la API
    storeItems: {
        ticket: {
            id: 1,
            type: 'ticket',
            name: 'Entrada Evento Principal',
            description: 'Entrada General',
            price: 1500,
            date: '2024-03-15',
            location: 'Teatro Principal'
        },
        products: [
            {
                id: 2,
                type: 'product',
                name: 'Gorra Oficial',
                description: 'Gorra negra con logo',
                price: 2500,
                image: '/gorra.jpg'
            },
            {
                id: 3,
                type: 'product',
                name: 'Remera Evento',
                description: 'Remera conmemorativa',
                price: 3000,
                image: '/remera.jpg'
            }
        ]
    }
};

export function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    // Función para agregar al carrito
    const addToCart = (item) => {
        dispatch({ type: STORE_TYPES.ADD_TO_CART, payload: item });
        toast.success('¡Agregado al carrito!');
    };

    // Función para remover del carrito
    const removeFromCart = (itemId) => {
        dispatch({ type: STORE_TYPES.REMOVE_FROM_CART, payload: itemId });
        toast.success('Producto eliminado del carrito');
    };

    // Función para procesar la compra
    const processPurchase = async () => {
        try {
            dispatch({ type: STORE_TYPES.START_PURCHASE });
            
            const response = await api.post('/orders', {
                items: state.cart,
                total: calculateTotal(state.cart)
            });

            dispatch({ type: STORE_TYPES.PURCHASE_SUCCESS });
            toast.success('¡Compra realizada con éxito!');
            return response.data;
        } catch (error) {
            dispatch({ 
                type: STORE_TYPES.PURCHASE_ERROR,
                payload: error.response?.data?.error 
            });
            throw error;
        }
    };

    // Función auxiliar para calcular el total
    const calculateTotal = (cartItems) => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <StoreContext.Provider value={{
            ...state,
            addToCart,
            removeFromCart,
            processPurchase,
            cartTotal: calculateTotal(state.cart)
        }}>
            {children}
        </StoreContext.Provider>
    );
}

// Hook personalizado para usar el contexto de la tienda
export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore debe ser usado dentro de un StoreProvider');
    }
    return context;
};