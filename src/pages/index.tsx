"use client"
import React, { useCallback, useRef, useState } from 'react';
import EventForm from '../components/EventForm';
import EventCalendar from '../components/EventCalendar';
import EventManagement from '../components/EventManagement';
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

interface Event {
  id: string;
  title: string;
  address: string;
  start: Date;
  end: Date;
}

const Home: React.FC = () => {
  const bottomRef = useRef<HTMLHeadingElement | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventCreate = (eventData: Event) => {
    const newEvent = { ...eventData, id: Date.now().toString() };
    setEvents([...events, newEvent]);
    console.log(events);
    toast.success("Successfully created new Event")
  };

  const handleEventSelect = (eventId: { id: string }) => {
    const selectedEvent = events.find((event) => event.id === eventId.id);
    setSelectedEvent(selectedEvent || null);

    // Scroll to the bottomRef element only if selectedEvent is truthy
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEventEdit = (editedEvent: Event) => {
    console.log(editedEvent, 'evntEdit clg');
    const updatedEvents = events.map((event) =>
      event.id === editedEvent.id ? editedEvent : event
    );
    setEvents(updatedEvents);
    toast.success("Successfully edited new Event")

  };

  const handleEventDelete = (deletedEvent: Event) => {
    setEvents(events.filter((event) => event.id !== deletedEvent.id));
    setSelectedEvent(null);
    toast.error("Even deleted successfully")
  };

   // Drag and drop function for handling event drop
   const handleEventDrop = useCallback(
    (data: { event: Event; start: Date; end: Date }) => {
      const { event, start, end } = data;

      // Update the event in the 'myEvents' state array with the new 'start' and 'end' values
      const updatedEvent: Event = {
        ...event,
        start,
        end,
      };

      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev.id === event.id ? updatedEvent : ev))
      );
    },
    []
  );

  // Drag and drop function for handling event resize
  const handleEventResize = useCallback(
    (data: { event: Event; start: Date; end: Date }) => {
      const { event, start, end } = data;

      // Update the event in the 'myEvents' state array with the new 'start' and 'end' values
      const updatedEvent: Event = {
        ...event,
        start,
        end,
      };

      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev.id === event.id ? updatedEvent : ev))
      );
    },
    []
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex">
              <div className="hidden md:block">
                <h1 className="ml-4 text-xl font-bold text-gray-900">
                  Event Scheduler
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="flex flex-col md:flex-col gap-4 mt-8">
              <div className="bg-white shadow sm:rounded-lg px-4 py-4 flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg leading-6 font-bold text-gray-900 mb-5">
                    Upcoming Events
                  </h2>
                </div>
                <EventForm onSubmit={handleEventCreate} />
                <EventCalendar
                  events={events}
                  onSelectEvent={handleEventSelect}
                  onEventDrop={handleEventDrop}
                  onEventResize={handleEventResize}
                />
              </div>
              {selectedEvent && (
                <div className="bg-white shadow sm:rounded-lg px-4 py-4">
                  <div className="flex items-center justify-between">
                    <h2 ref={bottomRef} className="text-lg leading-6 font-bold text-gray-900">
                      Event Details
                    </h2>
                  </div>
                  <EventManagement
                    event={selectedEvent}
                    onEdit={handleEventEdit}
                    onDelete={handleEventDelete}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <ToastContainer/>
    </div>
  );
};

export default Home;
