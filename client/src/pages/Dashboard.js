import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { userInfo, token } = useSelector((state) => state.user);

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Render a loading state or a placeholder if the user data is not yet available
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-500">Welcome, {userInfo.name}!</h1>
      <p className="mt-4">This is your dashboard. Here you can see your overview and manage your account.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Profile Card */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
          <p className="mt-2 text-gray-600">Name: {userInfo.name}</p>
          <p className="mt-1 text-gray-600">Email: {userInfo.email}</p>
          <p className="mt-1 text-gray-600">Role: {userInfo.role}</p>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Activities</h2>
          <ul className="mt-2 space-y-2">
            <li className="text-gray-600">You registered for Event A.</li>
            <li className="text-gray-600">You joined Team B.</li>
            <li className="text-gray-600">You updated your profile.</li>
          </ul>
        </div>

        {/* Statistics */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Statistics</h2>
          <div className="mt-2">
            <p className="text-gray-600">Total Events Participated: 5</p>
            <p className="mt-1 text-gray-600">Total Teams Joined: 3</p>
            <p className="mt-1 text-gray-600">Total Points Earned: 120</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
