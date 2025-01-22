// src/context/store/storeReducer.js
import { STORE_TYPES } from './types';

export const storeReducer = (state, action) => {
    switch (action.type) {
        case STORE_TYPES.ADD_TO_CART: {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                // Si el item ya existe, actualizamos su cantidad
                const updatedCart = state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                return { ...state, cart: updatedCart };
            }

            // Si es un item nuevo, lo agregamos con cantidad 1
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, quantity: 1 }]
            };
        }

        case STORE_TYPES.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            };

        case STORE_TYPES.UPDATE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };

        case STORE_TYPES.START_PURCHASE:
            return {
                ...state,
                loading: true,
                error: null
            };

        case STORE_TYPES.PURCHASE_SUCCESS:
            return {
                ...state,
                cart: [],
                loading: false,
                error: null
            };

        case STORE_TYPES.PURCHASE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case STORE_TYPES.CLEAR_CART:
            return {
                ...state,
                cart: []
            };

        default:
            return state;
    }
};