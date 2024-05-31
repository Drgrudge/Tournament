import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEvent = () => {
  const { token } = useSelector((state) => state.user);
  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'Sports',
    date: '',
    venue: '',
    participation: 'Solo'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', newEvent, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please check the console for more details.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Event</h1>
      <form onSubmit={handleCreateEvent} className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <select
          name="type"
          value={newEvent.type}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="Sports">Sports</option>
          <option value="Cultural">Cultural</option>
          <option value="Academic">Academic</option>
        </select>
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={newEvent.venue}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <select
          name="participation"
          value={newEvent.participation}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="Solo">Solo</option>
          <option value="Team">Team</option>
        </select>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
