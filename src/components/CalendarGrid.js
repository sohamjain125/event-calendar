import React from "react";
import { useDrop } from "react-dnd";
import EventItem from "./EventItem";
import "../index.css";
import { isToday } from "date-fns";

function CalendarGrid({ days, onDayClick, events, onEventMove }) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar-grid">
      {/* Render day names (headers) */}
      {dayNames.map((dayName) => (
        <div key={dayName} className="calendar-day-header">
          {dayName}
        </div>
      ))}

      {/* Render calendar days */}
      {days.map((day) => {
        const dayKey = day.toISOString().split("T")[0];
        const dayEvents = events[dayKey] || [];
        const today = isToday(day); // Check if this day is today

        return (
          <Day
            key={dayKey}
            day={day}
            events={dayEvents}
            onDayClick={onDayClick}
            onEventMove={onEventMove}
            isToday={today} // Pass whether this is today
          />
        );
      })}
    </div>
  );
}

const Day = React.memo(({ day, events, onDayClick, onEventMove, isToday }) => {
  const [, drop] = useDrop({
    accept: "event",
    drop: (item) => {
      onEventMove(item.day, day, item.event);
    },
  });

  return (
    <div
      ref={drop}
      className={`calendar-day ${isToday ? "highlight-today" : ""}`} // Highlight today
      onClick={() => onDayClick(day)} // Call onDayClick when this day is clicked
    >
      <div className="day-number">{day.getDate()}</div>
      <div className="events">
        {events.map((event, index) => (
          <EventItem key={index} event={event} day={day} />
        ))}
      </div>
    </div>
  );
});

export default CalendarGrid;
