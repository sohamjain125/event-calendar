# Event Calendar

This project is an Event Calendar application built with React. It allows users to create, edit, delete, and search for events on specific dates. The application also supports drag-and-drop functionality for moving events between dates.

## Features

- **Create Events**: Users can create events by selecting a date and filling out the event details.
- **Edit Events**: Users can edit existing events.
- **Delete Events**: Users can delete events.
- **Search Events**: Users can search for events using keywords.
- **Drag and Drop**: Users can drag and drop events to different dates.
- **Export Events**: Users can export events to a JSON file.
- **Import Events**: Users can import events from a JSON file.

## Components

### `App.js`

The main component that manages the state and logic of the application. It includes the following functionalities:

- State management for current date, events, selected day, and modal visibility.
- Filtering events based on search keywords.
- Handling day clicks to open the event modal.
- Saving events to local storage.
- Handling event creation, editing, deletion, and moving.
- Exporting and importing events.

### `EventModal.js`

A modal component for creating and editing events. It includes:

- Input fields for event name, description, start time, and end time.
- Validation for required fields and time conflicts.
- Submitting the event data to the parent component.

### `EventList.js`

A component that displays a list of events for the selected day. It includes:

- Buttons for editing and deleting events.
- Conditional rendering for when there are no events.

### `EventItem.js`

A component that represents an individual event item. It includes:

- Drag-and-drop functionality using `react-dnd`.

### `CalendarGrid.js`

A component that displays the calendar grid. It includes:

- Day headers (Sun, Mon, Tue, etc.).
- Day cells that display the date and events.
- Drag-and-drop functionality for moving events between dates.
- Highlighting the current day.

### `index.js`

The entry point of the application. It includes:

- Rendering the `App` component within a `DndProvider` for drag-and-drop functionality.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sohamjain125/event-calendar
   ```
2. Navigate to the project directory:
   ```bash
   cd event-calendar
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. Use the navigation buttons to switch between months.
2. Click on a day to open the event modal and create a new event.
3. Use the search bar to filter events by keywords.
4. Drag and drop events to different dates.
5. Use the export button to download events as a JSON file.
6. Use the import button to upload events from a JSON file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [react-dnd](https://react-dnd.github.io/react-dnd/)
- [date-fns](https://date-fns.org/)
