import { useStore } from '../../context/store/StoreContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function StorePage() {
    const navigate = useNavigate();
    const { storeItems, cart, addToCart, removeFromCart, cartTotal } = useStore();

    // Expandimos los productos disponibles
    const merchandiseItems = [
        ...storeItems.products,
        {
            id: 4,
            type: 'product',
            name: 'Taza Térmica AGRONEA',
            description: 'Taza térmica de acero inoxidable con logo',
            price: 1800,
            image: '/merch/taza.jpg'
        },
        {
            id: 5,
            type: 'product',
            name: 'Mochila Ejecutiva',
            description: 'Mochila porta notebook con logo bordado',
            price: 4500,
            image: '/merch/mochila.jpg'
        },
        {
            id: 6,
            type: 'product',
            name: 'Kit Mate AGRONEA',
            description: 'Mate de calabaza, bombilla y bolso',
            price: 3800,
            image: '/merch/mate.jpg'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white p-8">
            {/* Header de la tienda */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto mb-12"
            >
                <h1 className="text-4xl font-bold text-[#FFD700] mb-4">Tienda AGRONEA</h1>
                <p className="text-white/80">Entradas y productos oficiales del evento</p>
            </motion.div>

            {/* Sección de Entradas */}
            <section className="max-w-7xl mx-auto mb-16">
                <h2 className="text-2xl font-semibold text-[#0A8F3C] mb-6">Entradas al Evento</h2>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 rounded-xl backdrop-blur-sm border border-[#0A8F3C]/20 p-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="flex-1">
                            <h3 className="text-2xl font-medium text-white mb-4">{storeItems.ticket.name}</h3>
                            <p className="text-white/70 mb-4">{storeItems.ticket.description}</p>
                            <div className="space-y-2 text-white/60">
                                <p>Fecha: {storeItems.ticket.date}</p>
                                <p>Ubicación: {storeItems.ticket.location}</p>
                                <ul className="list-disc list-inside mt-4 space-y-1">
                                    <li>Acceso a todas las exposiciones</li>
                                    <li>Charlas y conferencias incluidas</li>
                                    <li>Área de networking</li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full md:w-72 bg-black/20 p-6 rounded-lg text-center">
                            <p className="text-3xl font-bold text-[#FFD700] mb-4">
                                ${storeItems.ticket.price}
                            </p>
                            <button
                                onClick={() => addToCart(storeItems.ticket)}
                                className="w-full bg-[#0A8F3C] text-white px-6 py-3 rounded-lg
                                         hover:bg-[#0A8F3C]/90 transition-colors flex items-center justify-center gap-2"
                            >
                                <FaShoppingCart />
                                <span>Agregar al Carrito</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Sección de Productos */}
            <section className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold text-[#0A8F3C] mb-6">Merchandising Oficial</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {merchandiseItems.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 rounded-xl backdrop-blur-sm border border-[#0A8F3C]/20 
                                     p-6 hover:border-[#0A8F3C]/40 transition-all group"
                        >
                            <div className="aspect-square rounded-lg bg-black/20 mb-4 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">{product.name}</h3>
                            <p className="text-white/60 mb-4 text-sm">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-[#FFD700] text-xl font-bold">${product.price}</p>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-[#0A8F3C]/80 text-white px-4 py-2 rounded-lg
                                             hover:bg-[#0A8F3C] transition-colors flex items-center gap-2"
                                >
                                    <FaShoppingCart />
                                    <span>Agregar</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Carrito flotante */}
            {cart.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="fixed bottom-8 right-8 bg-black/95 backdrop-blur-lg rounded-xl 
                             shadow-lg p-6 w-96 border border-[#0A8F3C]/20"
                >
                    <h3 className="text-xl font-semibold text-[#FFD700] mb-4">Tu Carrito</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-white">{item.name}</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-[#FFD700]">${item.price}</span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between text-lg font-semibold mb-4">
                            <span className="text-white">Total:</span>
                            <span className="text-[#FFD700]">${cartTotal}</span>
                        </div>
                        <button
                            onClick={() => navigate('/store/checkout')}
                            className="w-full bg-[#0A8F3C] text-white py-3 rounded-lg font-bold
                                     hover:bg-[#0A8F3C]/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaShoppingCart />
                            <span>Finalizar Compra</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}