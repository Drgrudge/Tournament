import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Users = () => {
  const { token, userInfo } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [hostels, setHostels] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState('');
  const [actionType, setActionType] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchHostels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hostels');
        setHostels(response.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchUsers();
    fetchHostels();
  }, [token]);

  const handleAssignRepresentative = async (userId, hostelId) => {
    try {
      await axios.post('http://localhost:5000/api/users/assign-representative', {
        userId,
        hostelId,
        action: 'assign'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Hostel representative assigned successfully');
      setSelectedUser(null);
      setSelectedHostel('');
      setActionType('');
      refreshUsers();
    } catch (error) {
      console.error('Error assigning representative:', error);
    }
  };

  const handleDemoteRepresentative = async (userId) => {
    try {
      await axios.post('http://localhost:5000/api/users/assign-representative', {
        userId,
        action: 'demote'
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Hostel representative demoted successfully');
      refreshUsers();
    } catch (error) {
      console.error('Error demoting representative:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('User deleted successfully');
      refreshUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const refreshUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error refreshing users:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <div>
        {users.map((user) => (
          <div key={user._id} className="p-4 mb-4 border border-gray-300 rounded-md">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <p>ID: {user._id}</p>
            {userInfo.role === 'Admin' && (
              <>
                {user.role === 'HostelBoarder' && (
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setActionType('assign');
                    }}
                    className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                  >
                    Assign as Representative
                  </button>
                )}
                {user.role === 'HostelRepresentative' && (
                  <button
                    onClick={() => handleDemoteRepresentative(user._id)}
                    className="mt-2 p-2 bg-yellow-500 text-white rounded-md"
                  >
                    Demote to Boarder
                  </button>
                )}
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="mt-2 ml-2 p-2 bg-red-500 text-white rounded-md"
                >
                  Delete User
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {selectedUser && actionType === 'assign' && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Assign {selectedUser.name} as Representative</h2>
            <select
              value={selectedHostel}
              onChange={(e) => setSelectedHostel(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-md w-full"
            >
              <option value="">Select Hostel</option>
              {hostels.map((hostel) => (
                <option key={hostel._id} value={hostel._id}>{hostel.name}</option>
              ))}
            </select>
            <button
              onClick={() => handleAssignRepresentative(selectedUser._id, selectedHostel)}
              className="p-2 bg-blue-500 text-white rounded-md"
            >
              Assign
            </button>
            <button
              onClick={() => setSelectedUser(null)}
              className="ml-2 p-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
