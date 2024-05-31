import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeUserPassword } from '../slices/userSlice';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((state) => state.user);

  const handleChangePassword = (e) => {
    e.preventDefault();
    dispatch(changeUserPassword({ token, passwordData: { oldPassword, newPassword } })).then((action) => {
      if (action.type === 'user/changePassword/fulfilled') {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/src/assets/tournament-bg.jpg')" }}>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block text-gray-700">Old Password</label>
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Change Password
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
