import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../slices/userSlice';

const Navigation = () => {
  const dispatch = useDispatch();
  const { userInfo, token } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          Inter Hostel Tournament Management System
        </div>
        <ul className="flex space-x-4">
          {!token ? (
            <>
              <li>
                <Link to="/register" className="text-white hover:text-gray-400">Register</Link>
              </li>
              <li>
                <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard" className="text-white hover:text-gray-400">Dashboard</Link>
              </li>
              <li>
                <Link to="/hostels" className="text-white hover:text-gray-400">Hostels</Link>
              </li>
              <li>
                <Link to="/events" className="text-white hover:text-gray-400">Events</Link>
              </li>
              <li>
                <Link to="/teams" className="text-white hover:text-gray-400">Teams</Link>
              </li>
              <li>
                <Link to="/scores" className="text-white hover:text-gray-400">Scores</Link>
              </li>
              <li>
                <Link to="/change-password" className="text-white hover:text-gray-400">Change Password</Link>
              </li>
              <li>
                <Link to="/users" className="text-white hover:text-gray-400">Users</Link>
              </li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="text-white hover:text-gray-400 focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
