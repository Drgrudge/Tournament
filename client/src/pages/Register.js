import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../slices/userSlice';
import axios from 'axios';
import { motion } from 'framer-motion';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('HostelBoarder');
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hostels');
        setHostels(response.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };
    fetchHostels();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      role,
      hostel: role === 'HostelBoarder' && selectedHostel ? selectedHostel : null
    };
    dispatch(register(userData)).then((action) => {
      if (action.type === 'user/register/fulfilled') {
        navigate('/login');
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/src/assets/tournament-bg.jpg')" }}
    >
      <div className="max-w-md mx-auto mt-10 p-6 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Admin">Admin</option>
              <option value="Organizer">Organizer</option>
              <option value="HostelRepresentative">Hostel Representative</option>
              <option value="HostelBoarder">Hostel Boarder</option>
            </select>
          </div>
          {role === 'HostelBoarder' && (
            <div className="mb-4">
              <label className="block text-gray-700">Hostel</label>
              <select
                value={selectedHostel}
                onChange={(e) => setSelectedHostel(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Hostel</option>
                {hostels.map((hostel) => (
                  <option key={hostel._id} value={hostel._id}>{hostel.name}</option>
                ))}
                <option value="day-scholar">Day Scholar</option>
              </select>
            </div>
          )}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error.message || error}</p>}
      </div>
    </motion.div>
  );
};

export default Register;
