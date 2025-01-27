import React, { useState } from "react";
import { useStore } from "../../context/store/StoreContext";
import { useAuth } from "../../context/auth/AuthContext";
import toast from 'react-hot-toast';

// Recibimos onSubmit como prop para comunicarnos con el componente padre (CheckoutPage)
const CheckoutForm = ({ onSubmit }) => {
  // Obtenemos el estado del carrito y datos del usuario de los contextos
  const { cart, cartTotal } = useStore();
  const { user } = useAuth();

  // Estados locales para los datos de entrega
  // Por defecto, asumimos entrega por email para entradas

  const [ticketDelivery, setTicketDelivery] = useState("email");
  const [productDelivery, setProductDelivery] = useState("pickupInEvent");
  const [additionalEmail, setAdditionalEmail] = useState(user.email);
  const [isProcessing, setIsProcessing] = useState();

  // Verificamos qué tipos de items hay en el carrito
  const hasProducts = cart.some((item) => item.type === "product");
  const hasTickets = cart.some((item) => item.type === "ticket");

  // Datos estáticos para información de retiro
  const eventInfo = {
    address: "Av. Corrientes 1234",
    date: "15 de Marzo, 2024",
    time: "18:00 - 23:00",
    pickupHours: "17:00 - 20:00",
  };

  const officeInfo = {
    address: "Av. Rivadavia 5678",
    schedule: "Lunes a Viernes",
    hours: "9:00 - 18:00",
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      items: cart,
      total: cartTotal,
      ticketDelivery: hasTickets ? ticketDelivery : null,
      productDelivery: hasProducts ? productDelivery : null,
      customerInfo: {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phone,
      },
      ...(ticketDelivery === "email" && { additionalEmail }),
    };
    onSubmit(orderData);
  };

  const renderTicketInfo = () => {
    if (hasTickets && ticketDelivery === "pickup") {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h4 className="font-semibold text-gray-700">
            Información de Retiro de Entradas
          </h4>
          <p className="mt-2">Dirección: {officeInfo.address}</p>
          <p>Días: {officeInfo.schedule}</p>
          <p>Horario: {officeInfo.hours}</p>
          <p className="mt-2 text-sm text-gray-600">
            Presentar DNI y número de orden para retirar
          </p>
        </div>
      );
    }
    return null;
  };

  const renderProductInfo = () => {
    if (hasProducts) {
      if (productDelivery === "pickupInEvent") {
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="font-semibold text-gray-700">
              Información de Retiro de Productos
            </h4>
            <p className="mt-2">Dirección: {eventInfo.address}</p>
            <p>Fecha: {eventInfo.date}</p>
            <p>Horario del evento: {eventInfo.time}</p>
            <p>Horario de retiro: {eventInfo.pickupHours}</p>
            <p className="mt-2 text-sm text-gray-600">
              Presentar DNI y número de orden para retirar
            </p>
          </div>
        );
      } else if (productDelivery === "pickup") {
        return (
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="font-semibold text-gray-700">
              Información de Retiro de Productos
            </h4>
            <p className="mt-2">Dirección: {officeInfo.address}</p>
            <p>Días: {officeInfo.schedule}</p>
            <p>Horario: {officeInfo.hours}</p>
            <p className="mt-2 text-sm text-gray-600">
              Presentar DNI y número de orden para retirar
            </p>
          </div>
        );
      }
    }
    return null;
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

        {/* Sección de Entradas */}
        {hasTickets && (
          <div className="border p-4 rounded-md">
            <h3 className="font-semibold mb-4">Entrega de Entradas</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="email"
                  checked={ticketDelivery === "email"}
                  onChange={(e) => {
                    setTicketDelivery(e.target.value);
                    setAdditionalEmail(user.email);
                  }}
                  className="form-radio"
                />
                <span>Recibir por email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pickup"
                  checked={ticketDelivery === "pickup"}
                  onChange={(e) => setTicketDelivery(e.target.value)}
                  className="form-radio"
                />
                <span>Retirar en oficina</span>
              </label>
            </div>

            {ticketDelivery === "email" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email para recibir las entradas
                </label>
                <input
                  type="email"
                  value={additionalEmail}
                  onChange={(e) => setAdditionalEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                  placeholder={user.email}
                />
              </div>
            )}
          </div>
        )}

        {renderTicketInfo()}

        {/* Sección de Productos Físicos */}
        {hasProducts && (
          <div className="border p-4 rounded-md">
            <h3 className="font-semibold mb-4">Entrega de Productos</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pickupInEvent"
                  checked={productDelivery === "pickupInEvent"}
                  onChange={(e) => setProductDelivery(e.target.value)}
                  className="form-radio"
                />
                <span>Retiro en stand de Evento</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pickup"
                  checked={productDelivery === "pickup"}
                  onChange={(e) => setProductDelivery(e.target.value)}
                  className="form-radio"
                />
                <span>Retiro en oficina</span>
              </label>
            </div>
          </div>
        )}

        {renderProductInfo()}

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
