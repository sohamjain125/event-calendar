import { parseISO, isValid } from "date-fns";
import React, { useState, useEffect } from "react";
import { useCalendar } from "./hooks/useCalendar.js";
import CalendarGrid from "./components/CalendarGrid.js";
import EventModal from "./components/EventModal.js";
import EventList from "./components/EventList.js";
import { useDrag, useDrop } from "react-dnd";
import Header from "./components/Header.js";

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { days, nextMonth, prevMonth, currentMonth } = useCalendar(currentDate);
  const [editingEvent, setEditingEvent] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState(""); // State for search keyword

  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : {};
  });

  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredEvents = Object.entries(events).reduce(
    (acc, [dateKey, dayEvents]) => {
      const filteredDayEvents = dayEvents.filter((event) =>
        event.eventName.toLowerCase().includes(filterKeyword.toLowerCase())
      );
      if (filteredDayEvents.length) {
        acc[dateKey] = filteredDayEvents;
      }
      return acc;
    },
    {}
  );

  const saveEventsToStorage = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleDayClick = (day) => {
    try {
      if (!(day instanceof Date)) {
        console.error("Invalid Date object:", day);
        return;
      }

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const month = monthNames[day.getMonth()];
      const year = day.getFullYear();
      const date = day.getDate();

      if (!month || !year || !date) {
        console.error("Invalid day object:", day);
        return;
      }

      const dateString = `${year}-${(day.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
      const newSelectedDay = new Date(dateString);

      if (isNaN(newSelectedDay)) {
        console.error("Invalid Date:", newSelectedDay);
        return;
      }

      setSelectedDay(newSelectedDay);
      console.log("Selected Day:", newSelectedDay);
      setModalOpen(true);
    } catch (error) {
      console.error("Error processing day click:", error);
    }
  };

  const isOverlapping = (newEvent, dayEvents) => {
    return dayEvents.some(
      (event) =>
        newEvent.startTime < event.endTime && newEvent.endTime > event.startTime
    );
  };

  const handleSaveEvent = (eventData, index = null) => {
    const dateKey = selectedDay.toISOString().split("T")[0];
    const updatedEvents = { ...events };

    if (!updatedEvents[dateKey]) updatedEvents[dateKey] = [];

    if (isOverlapping(eventData, updatedEvents[dateKey])) {
      alert("Event time overlaps with another event.");
      return;
    }

    if (index !== null) {
      updatedEvents[dateKey][index] = eventData;
    } else {
      updatedEvents[dateKey].push(eventData);
    }

    saveEventsToStorage(updatedEvents); // Save to localStorage
  };

  const handleEventMove = (originalDate, newDate, event) => {
    const updatedEvents = { ...events };

    const originalDateKey = originalDate.toISOString().split("T")[0];
    const newDateKey = newDate.toISOString().split("T")[0];

    updatedEvents[originalDateKey] = updatedEvents[originalDateKey].filter(
      (e) => e !== event
    );
    if (!updatedEvents[newDateKey]) updatedEvents[newDateKey] = [];
    updatedEvents[newDateKey].push(event);

    saveEventsToStorage(updatedEvents);
  };

  const handleExportEvents = () => {
    const blob = new Blob([JSON.stringify(events, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "events.json";
    link.click();
  };

  const handleImportEvents = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedEvents = JSON.parse(e.target.result);
        setEvents(importedEvents);
        localStorage.setItem("events", JSON.stringify(importedEvents));
      } catch (error) {
        console.error("Error importing events:", error);
        alert("Failed to import events. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  const handleDeleteEvent = (eventIndex) => {
    if (!selectedDay || !(selectedDay instanceof Date)) {
      console.error("Invalid selectedDay:", selectedDay);
      return;
    }

    const dateKey = selectedDay.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    const updatedEvents = { ...events };

    // Remove the event from the array
    updatedEvents[dateKey].splice(eventIndex, 1);

    // If there are no events left for the selected day, delete the entry
    if (updatedEvents[dateKey].length === 0) {
      delete updatedEvents[dateKey];
    }

    saveEventsToStorage(updatedEvents); // Save the updated events to localStorage
  };

  const handleEditEvent = (eventIndex) => {
    if (!selectedDay || !(selectedDay instanceof Date)) {
      console.error("Invalid selectedDay:", selectedDay);
      return;
    }

    const dateKey = selectedDay.toISOString().split("T")[0];
    const eventToEdit = events[dateKey][eventIndex];

    setEditingEvent({ event: eventToEdit, index: eventIndex });
    setModalOpen(true);
  };

  return (
    <div>
      <Header />
      <h1>{currentMonth}</h1>
      <input
        type="text"
        placeholder="Search events..."
        value={filterKeyword}
        onChange={(e) => setFilterKeyword(e.target.value)}
        style={{ marginBottom: "10px", padding: "8px" }}
      />
      <button onClick={() => setCurrentDate(prevMonth())}>Previous</button>
      <button onClick={() => setCurrentDate(nextMonth())}>Next</button>
      <button onClick={handleExportEvents}>Export Events</button>

      <CalendarGrid
        days={days}
        onDayClick={handleDayClick}
        events={filteredEvents}
        onEventMove={handleEventMove}
      />

      {isModalOpen && (
        <EventModal
          day={selectedDay}
          onSave={handleSaveEvent}
          onClose={() => {
            setModalOpen(false);
            setEditingEvent(null);
          }}
          editingEvent={editingEvent}
        >
          
          
        </EventModal>
        
      )}
      <EventList
            events={events[selectedDay?.toISOString().split("T")[0]] || []}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent} // Pass handleDeleteEvent as onDelete prop
          />
    </div>
  );
}

export default App;
