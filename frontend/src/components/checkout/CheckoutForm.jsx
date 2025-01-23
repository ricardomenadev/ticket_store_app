import React, { useState } from "react";
import { useStore } from "../../context/store/StoreContext";
import { useAuth } from "../../context/auth/AuthContext";

// Recibimos onSubmit como prop para comunicarnos con el componente padre (CheckoutPage)
const CheckoutForm = ({ onSubmit }) => {
  // Obtenemos el estado del carrito y datos del usuario de los contextos
  const { cart, cartTotal } = useStore();
  const { user } = useAuth();

  // Estados locales para los datos de entrega
  // Por defecto, asumimos entrega por email para entradas
  const [deliveryPreference, setDeliveryPreference] = useState("email");

  // Estado para la dirección de envío de productos físicos
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    additionalInfo: "",
  });

  // Verificamos qué tipos de items hay en el carrito
  const hasProducts = cart.some((item) => item.type === "product");
  const hasTickets = cart.some((item) => item.type === "ticket");

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparamos los datos del pedido para enviar al servidor
    const orderData = {
      items: cart,
      total: cartTotal,
      deliveryPreference,
      customerInfo: {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phone,
      },
      // Solo incluimos la dirección si el método es shipping
      ...(deliveryPreference === "shipping" && { shippingAddress }),
    };

    // Llamamos a la función onSubmit que recibimos como prop
    onSubmit(orderData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Finalizar compra</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información del Cliente */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Información del Cliente</h3>
          <p>
            Nombre: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
          <p>Teléfono: {user.phone}</p>
        </div>

        {/* Opciones de entrega para productos físicos */}
        {hasProducts && (
          <div>
            <h3 className="font-semibold mb-2">
              Método de Entrega para Productos
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="shipping"
                  checked={deliveryPreference === "shipping"}
                  onChange={(e) => setDeliveryPreference(e.target.value)}
                  className="form-radio"
                />
                <span>Envío a domicilio</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pickup"
                  checked={deliveryPreference === "pickup"}
                  onChange={(e) => setDeliveryPreference(e.target.value)}
                  className="form-radio"
                />
                <span>Retirar en sucursal</span>
              </label>
            </div>
          </div>
        )}

        {/* Preferencias de Entrega para Entradas */}
        {hasTickets && !hasProducts && (
          <div>
            <h3 className="font-semibold mb-2">
              Preferencia de Entrega de Entradas
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="email"
                  checked={deliveryPreference === "email"}
                  onChange={(e) => setDeliveryPreference(e.target.value)}
                  className="form-radio"
                />
                <span>Recibir por email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pickup"
                  checked={deliveryPreference === "pickup"}
                  onChange={(e) => setDeliveryPreference(e.target.value)}
                  className="form-radio"
                />
                <span>Retirar en sucursal</span>
              </label>
            </div>
          </div>
        )}

        {/* Formulario de dirección si eligió envío a domicilio */}
        {hasProducts && deliveryPreference === "shipping" && (
          <div className="space-y-4">
            <h3 className="font-semibold">Dirección de Envío</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Calle y Número
              </label>
              <input
                type="text"
                value={shippingAddress.street}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    street: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required={deliveryPreference === "shipping"}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ciudad
                </label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required={deliveryPreference === "shipping"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Código Postal
                </label>
                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required={deliveryPreference === "shipping"}
                />
              </div>
            </div>
          </div>
        )}

        {/* Resumen del Pedido */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Resumen del Pedido</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 font-bold flex justify-between">
            <span>Total:</span>
            <span>${cartTotal}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Confirmar Compra
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
