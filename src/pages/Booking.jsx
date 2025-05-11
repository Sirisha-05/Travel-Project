import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/main.css';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { stay, flight, car, members, date } = location.state || {};

  const item = stay || flight || car;
  if (!item) return <div className="page"><p>No booking data available.</p></div>;

  const totalAmount = item.price * members;

  const handleConfirm = () => {
    navigate('/payment', { state: { item, members, date, totalAmount } });
  };

  return (
    <div className="page">
      <h2>Booking Confirmation</h2>
      <div className="card">
        <h3>{item.name || item.route}</h3>
        {stay && (
          <>
            <p>Location: {item.location}</p>
            <p>Rating: {item.rating}</p>
          </>
        )}
        {flight && (
          <>
            <p>Airline: {item.airline}</p>
            <p>Departure: {item.departure}</p>
            <p>Arrival: {item.arrival}</p>
          </>
        )}
        {car && (
          <>
            <p>Seats: {item.seats}</p>
            <p>Transmission: {item.transmission}</p>
          </>
        )}
        <p>Price per person: ₹{item.price}</p>
        <p>Number of Persons: {members}</p>
        <p>Date: {date}</p>
        <p>Total Amount: ₹{totalAmount}</p>
        <button className="btn" onClick={handleConfirm}>Proceed to Payment</button>
      </div>
    </div>
  );
}