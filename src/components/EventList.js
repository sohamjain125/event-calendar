import React from "react";
import '../index.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EventList = ({ events, onEdit, onDelete }) => {
  return (
    <div className="event-list">
      {events.map((event, index) => (
        <div key={index} className="event-item">
          <span>{event.eventName}</span>
          <div>
            <button onClick={() => onEdit(index)}><FaEdit /></button>
            <button onClick={() => onDelete(index)}><FaTrash /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;