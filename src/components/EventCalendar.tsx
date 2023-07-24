import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

interface EventCalendarProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
}

const views = {
  month: true,
  week: true,
  agenda: true,
};

const EventCalendar: React.FC<EventCalendarProps> = ({ events, onSelectEvent }) => {
  return (
    <div className='h-screen'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        selectable
        onSelectEvent={onSelectEvent}
        views={views} // Pass the views prop to customize available views
        defaultView='month' // Set the default view to 'month'
      />
    </div>
  );
};

export default EventCalendar;
