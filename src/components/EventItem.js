import React from "react";
import { useDrag } from "react-dnd";

const EventItem = ({ event, day }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "event",
    item: { event, day },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {event.eventName}
    </div>
  );
};

export default EventItem;