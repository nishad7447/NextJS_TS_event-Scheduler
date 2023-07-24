import React, { useState, ChangeEvent, FormEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Event {
    id: string;
  title: string;
  address: string;
  start: Date;
  end: Date;
}

interface EventFormProps {
  onSubmit: (eventData: Event) => void;
}


const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [eventData, setEventData] = useState<Event>({
    id: '',
    title: '',
    address: '',
    start: new Date(),
    end: new Date()
  });

  const handleChange = (name: string, value: string | Date) => {
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEventData({
        id: '',
      title: '',
      address: '',
      start: new Date(),
      end: new Date()
    });
    onSubmit(eventData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-3">
      <div className="flex space-x-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Event Title:
          </label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.name, e.target.value)
            }
            required
            className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="address" className="text-sm font-medium text-gray-700">
            Event Address:
          </label>
          <input
            type="text"
            name="address"
            value={eventData.address}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.name, e.target.value)
            }
            required
            className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col flex-1">
          <label htmlFor="start" className="text-sm font-medium text-gray-700">
            Event Start Time:
          </label>
          <DatePicker
            selected={eventData.start}
            onChange={(date: Date) => handleChange('start', date)}
            showTimeSelect
            dateFormat="Pp"
            required
            className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label htmlFor="end" className="text-sm font-medium text-gray-700">
            Event End Time:
          </label>
          <DatePicker
            selected={eventData.end}
            onChange={(date: Date) => handleChange('end', date)}
            showTimeSelect
            dateFormat="Pp"
            required
            className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-indigo-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
