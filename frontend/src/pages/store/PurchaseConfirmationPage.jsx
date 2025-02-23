import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QRCode from "react-qr-code";

const PurchaseConfirmationPage = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const  { orderData } = location.state || { };
const [tickets, setTickets] = useState([]);

useEffect(() => {
  if (!orderData) {
    navigate('/store');
    return;
  }

  if (orderData.hasTickets) {
    //Generar numeros de ticket y codigos QR
  const generatedTickets = orderData.items.filter(item => item.type === 'ticket').map(ticket => ({
    id: Math.random().toString(36).substr(2, 9),
          number: `TCK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          eventName: ticket.name,
          eventDate: ticket.date,
          qrData: JSON.stringify({
            ticketId: ticket.id,
            eventId: ticket.eventId,
            purchaseDate: new Date().toISOString()
          })
  }))
  setTickets(generatedTickets);
  }

}, [orderData, navigate]);
  

const renderMessage = () => {
  const hasTickets = orderData?.items.some(item => item.type === 'ticket');
  const hasProducts = orderData?.items.some(item => item.type === 'product');

  if (hasTickets && hasProducts) {
    return (
      <div className='text-center m-8'>
        <h2 className='text-2xl font-bold text-green-600 mb-4'>¡Compra realizada con éxito</h2>
<p className='text-lg mb-2'>Tu entradas y productos estan listos.</p>
{orderData.ticketIDelivery === 'email' && (
  <p>Las entradas han sido enviadas a {orderData.additionalEmail}</p>
)}
<div className='mt-4 p-4 bg-blue-50 rounded-lg'>
  <h3 className='font-semibold mb-2'>Información Importante</h3>
  <ul className='list-disc list-inside text-left'>
    <li>Las entradas {orderData.ticketDelivery === 'email' ? 'han sido enviadas a su casilla de correo' : 'pueden retirarse en la oficina'}</li>
    <li>Los productos pueden {orderData.productDelivery === 'pickupInEvent' ? 'retirarse en el evento' : 'retirarse en la oficina'}</li>
  </ul>
</div>



      </div>
    );
  }

}


}

export default PurchaseConfirmationPage;