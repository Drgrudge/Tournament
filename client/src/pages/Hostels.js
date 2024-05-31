import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hostels = () => {
  const { token } = useSelector((state) => state.user);
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      const response = await axios.get('http://localhost:5000/api/hostels');
      setHostels(response.data);
    };
    fetchHostels();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hostels</h1>
      <Link to="/add-hostel" className="p-2 bg-blue-500 text-white rounded-md mb-4 inline-block">Add Hostel</Link>
      <div>
        {hostels.map((hostel) => (
          <div key={hostel._id} className="p-4 mb-4 border border-gray-300 rounded-md">
            <h2 className="text-xl font-bold">{hostel.name}</h2>
            <p>Location: {hostel.location}</p>
            <p>Contact Info: {hostel.contactInfo}</p>
            <p>Representative: {hostel.representative?.name || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hostels;
