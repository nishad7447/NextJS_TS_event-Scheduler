import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop<{}, Event>(Calendar); // Pass the Event type to DnDCalendar

interface Event {
  id: string;
  title: string;
  address: string;
  start: Date;
  end: Date;
}

interface EventCalendarProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onEventDrop: (data: { event: Event; start: Date; end: Date }) => void;
  onEventResize: (data: { event: Event; start: Date; end: Date }) => void;
}

const views = {
  month: true,
  week: true,
  agenda: true,
};

const EventCalendar: React.FC<EventCalendarProps> = ({
  events,
  onSelectEvent,
  onEventDrop,
  onEventResize,
}) => {
  // Custom accessor functions to get the start and end dates from the event object
  const getEventStart = (event: Event) => new Date(event.start);
  const getEventEnd = (event: Event) => new Date(event.end);

  return (
    <div className='h-screen'>
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor={getEventStart as (event: {}) => Date} // Cast the accessor function to the correct type
        endAccessor={getEventEnd as (event: {}) => Date} // Cast the accessor function to the correct type
        selectable
        onSelectEvent={onSelectEvent as ()=>{}}
        onEventDrop={onEventDrop as ()=>{}} // Use the onEventDrop handler passed as prop
        onEventResize={onEventResize as ()=>{}} // Use the onEventResize handler passed as prop
        views={views}
        defaultView='month'
        style={{ height: '100vh' }} // Adjust the height accordingly
      />
    </div>
  );
};

export default EventCalendar;
