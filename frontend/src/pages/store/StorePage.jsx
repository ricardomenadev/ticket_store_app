// src/pages/store/StorePage.jsx
import { useStore } from '../../context/store/StoreContext';
import toast from 'react-hot-toast';

export default function StorePage() {
    const { 
        storeItems, 
        cart, 
        addToCart, 
        removeFromCart,
        processPurchase,
        cartTotal 
    } = useStore();

    const handlePurchase = async () => {
        if (cart.length === 0) {
            return toast.error('El carrito está vacío');
        }

        try {
            await processPurchase();
            toast.success('¡Compra realizada con éxito!');
        } catch (error) {
            toast.error('Error al procesar la compra');
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-900">Tienda Virtual</h1>

            {/* Sección de Entradas */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Entrada Disponible
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-medium">{storeItems.ticket.name}</h3>
                    <p className="text-gray-600 mt-2">{storeItems.ticket.description}</p>
                    <div className="mt-4">
                        <p className="text-gray-600">Fecha: {storeItems.ticket.date}</p>
                        <p className="text-gray-600">Lugar: {storeItems.ticket.location}</p>
                        <p className="text-xl font-bold mt-2">${storeItems.ticket.price}</p>
                    </div>
                    <button
                        onClick={() => addToCart(storeItems.ticket)}
                        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Comprar Entrada
                    </button>
                </div>
            </section>

            {/* Sección de Productos */}
            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Productos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {storeItems.products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-medium">{product.name}</h3>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                            <p className="text-xl font-bold mt-4">${product.price}</p>
                            <button
                                onClick={() => addToCart(product)}
                                className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Carrito flotante */}
            {cart.length > 0 && (
                <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-6 w-80">
                    <h3 className="text-lg font-semibold mb-4">Carrito</h3>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center mb-2">
                            <span>{item.name}</span>
                            <div className="flex items-center space-x-2">
                                <span>${item.price}</span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${cartTotal}</span>
                        </div>
                        <button
                            onClick={handlePurchase}
                            className="w-full mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}