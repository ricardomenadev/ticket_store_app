import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/store/StoreContext';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { processPurchase, cart } = useStore();
    const [isProcessing, setIsProcessing] = useState(false);

    // Verificar si hay items en el carrito
    if (cart.length === 0) {
        navigate('/store');
        return null;
    }

    const handleCheckoutSubmit = async (orderData) => {
        try {
          setIsProcessing(true);
          const result = await processPurchase(orderData);
          navigate('/store/purchase-confirmation', { 
            state: { 
              orderData: {
                ...orderData,
                orderId: result.orderId,
                purchaseDate: new Date().toISOString()
              } 
            }
          });
        } catch (error) {
          toast.error('Error al procesar la compra: ' + error.message);
        } finally {
          setIsProcessing(false);
        }
      };

    return (
        <div className="container mx-auto px-4 py-8">
            {isProcessing ? (
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <p className="mt-4 text-lg">Procesando tu compra...</p>
                </div>
            ) : (
                <CheckoutForm onSubmit={handleCheckoutSubmit} />
            )}
        </div>
    );
};

export default CheckoutPage;