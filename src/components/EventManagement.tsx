import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Event {
    id: string;
  title: string;
  address: string;
  start: Date;
  end: Date;
}

interface EventManagementProps {
  event: Event;
  onEdit: (editedEvent: Event) => void;
  onDelete: (deletedEvent: Event) => void;
}

const Modal: React.FC<{
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 border rounded-md mr-2 bg-indigo-600 text-white"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md bg-red-600 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const EventManagement: React.FC<EventManagementProps> = ({ event, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Set the initial state of editedEvent to the event passed as a prop
    setEditedEvent(event);
  }, [event]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(event);
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    if (editedEvent) {
      onEdit(editedEvent);
    }
    setIsEditing(false);
  };

  const handleChange = (fieldName: string, value: any) => {
    if (editedEvent) {
      setEditedEvent({ ...editedEvent, [fieldName]: value });
    }
  };

  return (
    <div className={`p-4 ${isEditing ? 'bg-white shadow-md' : ''}`}>
      {editedEvent && (
        <div>
          {isEditing ? (
            <>
              <div className="flex space-x-4">
                <div className="flex flex-col flex-1">
                  <label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Event Title:
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editedEvent.title}
                    onChange={(e) => handleChange('title', e.target.value)}
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
                    value={editedEvent.address}
                    onChange={(e) => handleChange('address', e.target.value)}
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
                    selected={editedEvent.start}
                    onChange={(date) => handleChange('start', date)}
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
                    selected={editedEvent.end}
                    onChange={(date) => handleChange('end', date)}
                    showTimeSelect
                    dateFormat="Pp"
                    required
                    className="border rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring focus:border-indigo-500"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className={`text-lg font-semibold text-gray-900 ${isEditing ? 'mb-2' : ''}`}>
                {editedEvent.title}
              </h2>
              <p className={`text-sm text-gray-500 ${isEditing ? 'mb-2' : ''}`}>
                Address: {editedEvent.address}
              </p>
              <p className={`text-sm text-gray-500 ${isEditing ? 'mb-2' : ''}`}>
                Start Time: {new Date(editedEvent.start).toLocaleString('en-US', {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })}
              </p>
              <p className={`text-sm text-gray-500 ${isEditing ? 'mb-2' : ''}`}>
                End Time: {new Date(editedEvent.end).toLocaleString('en-US', {
                  dateStyle: 'long',
                  timeStyle: 'short',
                })}
              </p>
            </>
          )}
          {isEditing ? (
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleSave}
                className="px-2 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-2 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleEdit}
                className="px-2 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-2 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          )}
          {showModal && (
            <Modal
              message="Are you sure you want to delete this event?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EventManagement;
