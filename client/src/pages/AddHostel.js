import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddHostel = () => {
  const { token } = useSelector((state) => state.user);
  const [newHostel, setNewHostel] = useState({
    name: '',
    location: '',
    contactInfo: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewHostel({ ...newHostel, [e.target.name]: e.target.value });
  };

  const handleCreateHostel = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/hostels', newHostel, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    navigate('/hostels');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Hostel</h1>
      <form onSubmit={handleCreateHostel}>
        <input
          type="text"
          name="name"
          placeholder="Hostel Name"
          value={newHostel.name}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newHostel.location}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Info"
          value={newHostel.contactInfo}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Add Hostel</button>
      </form>
    </div>
  );
};

export default AddHostel;
