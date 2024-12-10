import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const EventList = ({ events, onEdit, onDelete }) => {
  console.log("Rendering Events:", events);
  return (
    <div className="event-list">
      
      {events.length > 0 ? (
        events.map((event, index) => (
          <div key={index} className="event-item">
            <span>{event.eventName}</span>
            <div>
              <button onClick={() => onEdit(index)}><FaEdit /></button>
              <button onClick={() => onDelete(index)}><FaTrash /></button>
            </div>
          </div>
        ))
      ) : (
        <p>No events for this day</p>
      )}
    </div>
  );
};

export default EventList;
