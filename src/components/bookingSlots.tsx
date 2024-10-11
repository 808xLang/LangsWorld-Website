// components/BookingSlots.js
import React from 'react';

const BookingSlots = ({ selectedDate, availableSlots, onBook }) => {
  return (
    <div>
      <h2>Available Time Slots for {selectedDate.toDateString()}</h2>
      <ul>
        {availableSlots.map((slot, index) => (
          <li key={index}>
            <button onClick={() => onBook(slot)}>
              {slot}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingSlots;
