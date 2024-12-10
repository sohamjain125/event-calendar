import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

const EventModal = ({ day, onSave, onClose, editingEvent }) => {
  const [eventName, setEventName] = useState(editingEvent?.event.eventName || "");
  const [eventDescription, setEventDescription] = useState(editingEvent?.event.eventDescription || "");
  const [startTime, setStartTime] = useState(editingEvent?.event.startTime || "");
  const [endTime, setEndTime] = useState(editingEvent?.event.endTime || "");

  useEffect(() => {
    if (editingEvent) {
      setEventName(editingEvent.event.eventName);
      setEventDescription(editingEvent.event.eventDescription);
      setStartTime(editingEvent.event.startTime);
      setEndTime(editingEvent.event.endTime);
    } else {
      setEventName("");
      setEventDescription("");
      setStartTime("");
      setEndTime("");
    }
  }, [editingEvent]);

  const handleSubmit = () => {
    if (!eventName || !eventDescription || !startTime || !endTime) {
      alert("Event Name, Description, and Time are required!");
      return;
    }

    if (startTime >= endTime) {
      alert("End time must be later than start time.");
      return;
    }

    const eventData = {
      eventName,
      eventDescription,
      startTime,
      endTime,
    };

    onSave(eventData, editingEvent ? editingEvent.index : null);
    onClose();
  };

  return (
    <div className="modal">
      <div className="event-modal-header">
        <h3>{editingEvent ? "Edit Event" : "Create Event"}</h3>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <textarea
        placeholder="Event Description"
        value={eventDescription}
        onChange={(e) => setEventDescription(e.target.value)}
      />
      <input
        type="time"
        placeholder="Start Time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        placeholder="End Time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editingEvent ? "Save Changes" : "Create Event"}
      </button>
    </div>
  );
};

export default EventModal;
