import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Events = () => {
  const { token, userInfo } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please check the console for more details.');
    }
  };

  const handleParticipateSolo = async (eventId) => {
    try {
      await axios.post('http://localhost:5000/api/participation/solo', { eventId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Successfully registered for the solo event');
    } catch (error) {
      console.error('Error participating in solo event:', error);
      alert('Failed to participate in the solo event. Please check the console for more details.');
    }
  };

  const handleCreateTeam = async (eventId) => {
    if (!userInfo.hostel) {
      console.error('Hostel information is missing for the user.');
      alert('Hostel information is missing for the user.');
      return;
    }

    const payload = { name: teamName, eventId, hostel: userInfo.hostel };
    console.log('Creating team with payload:', payload);

    try {
      const response = await axios.post('http://localhost:5000/api/events/teams', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response from server:', response.data);
      alert('Successfully created the team');
      setTeamName('');
    } catch (error) {
      console.error('Error creating team:', error.response ? error.response.data : error.message);
      alert('Failed to create team. Please check the console for more details.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Events</h1>
      {(userInfo.role === 'Admin' || userInfo.role === 'Organizer') && (
        <Link to="/add-event" className="p-2 bg-blue-500 text-white rounded-md mb-4 inline-block">Add Event</Link>
      )}
      <div>
        {events.length > 0 ? events.map((event) => (
          <div key={event._id} className="p-4 mb-4 border border-gray-300 rounded-md">
            <h2 className="text-xl font-bold">{event.name}</h2>
            <p>Type: {event.type}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Venue: {event.venue}</p>
            <p>Participation: {event.participation}</p>
            {(userInfo.role === 'Admin' || userInfo.role === 'Organizer') && (
              <div>
                <Link to={`/edit-event/${event._id}`} className="mt-2 p-2 bg-yellow-500 text-white rounded-md">
                  Edit Event
                </Link>
                <button
                  onClick={() => handleDeleteEvent(event._id)}
                  className="mt-2 ml-2 p-2 bg-red-500 text-white rounded-md"
                >
                  Delete Event
                </button>
              </div>
            )}
            {event.participation === 'Solo' && (
              <button
                onClick={() => handleParticipateSolo(event._id)}
                className="mt-2 p-2 bg-green-500 text-white rounded-md"
              >
                Participate Solo
              </button>
            )}
            {event.participation === 'Team' && userInfo.role === 'HostelRepresentative' && (
              <div>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Team Name"
                  className="mt-2 mb-2 p-2 border border-gray-300 rounded-md w-full"
                />
                <button
                  onClick={() => handleCreateTeam(event._id)}
                  className="mt-2 p-2 bg-green-500 text-white rounded-md"
                >
                  Create Team
                </button>
              </div>
            )}
          </div>
        )) : <p>No events available</p>}
      </div>
    </div>
  );
};

export default Events;
