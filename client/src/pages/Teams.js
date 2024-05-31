import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Teams = () => {
  const { token } = useSelector((state) => state.user);
  const [teams, setTeams] = useState([]);
  const [eligibleUsers, setEligibleUsers] = useState({});
  const [selectedUsers, setSelectedUsers] = useState({});
  const [replaceUserIds, setReplaceUserIds] = useState({});

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teams', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, [token]);

  const fetchEligibleUsers = async (hostelId, teamId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/hostel/${hostelId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEligibleUsers((prev) => ({ ...prev, [teamId]: response.data }));
    } catch (error) {
      console.error('Error fetching eligible users:', error);
    }
  };

  const handleUserSelectionChange = (teamId, userId) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [teamId]: prev[teamId]?.includes(userId)
        ? prev[teamId].filter((id) => id !== userId)
        : [...(prev[teamId] || []), userId]
    }));
  };

  const handleAddMembers = async (teamId) => {
    const userIds = selectedUsers[teamId];
    if (!userIds || userIds.length === 0) return;

    try {
      await axios.post(
        `http://localhost:5000/api/teams/${teamId}/members`,
        { userIds },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const response = await axios.get('http://localhost:5000/api/teams', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTeams(response.data);
      setSelectedUsers((prev) => ({ ...prev, [teamId]: [] }));
    } catch (error) {
      console.error('Error adding members to team:', error);
      alert('Failed to add members. Please check the console for more details.');
    }
  };

  const handleDeleteMember = async (teamId, userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/teams/${teamId}/members/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const response = await axios.get('http://localhost:5000/api/teams', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTeams(response.data);
    } catch (error) {
      console.error('Error deleting member from team:', error);
      alert('Failed to delete member. Please check the console for more details.');
    }
  };

  const handleReplaceMember = async (teamId) => {
    const { oldUserId, newUserId } = replaceUserIds[teamId] || {};
    if (!oldUserId || !newUserId) return;

    try {
      await axios.put(
        `http://localhost:5000/api/teams/${teamId}/members/${oldUserId}/${newUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      const response = await axios.get('http://localhost:5000/api/teams', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTeams(response.data);
      setReplaceUserIds((prev) => ({ ...prev, [teamId]: {} }));
    } catch (error) {
      console.error('Error replacing member in team:', error);
      alert('Failed to replace member. Please check the console for more details.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Teams</h1>
      <div>
        {teams.length > 0 ? (
          teams.map((team) => (
            <div key={team._id} className="p-4 mb-4 border border-gray-300 rounded-md">
              <h2 className="text-xl font-bold">{team.name}</h2>
              <p>Event: {team.event?.name}</p>
              <p>Hostel: {team.hostel?.name}</p>
              <p>Members: {team.members.map(member => (
                <div key={member._id} className="flex items-center">
                  <span>{member.name} ({member.email})</span>
                  <button
                    onClick={() => handleDeleteMember(team._id, member._id)}
                    className="ml-2 p-1 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              ))}</p>
              <button
                onClick={() => fetchEligibleUsers(team.hostel._id, team._id)}
                className="p-2 bg-blue-500 text-white rounded-md mb-2"
              >
                Show Eligible Users
              </button>
              {eligibleUsers[team._id] && (
                <div className="mb-2">
                  {eligibleUsers[team._id].map((user) => (
                    <div key={user._id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedUsers[team._id]?.includes(user._id) || false}
                        onChange={() => handleUserSelectionChange(team._id, user._id)}
                        className="mr-2"
                      />
                      <span>{user.name} ({user.email})</span>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddMembers(team._id)}
                    className="p-2 bg-green-500 text-white rounded-md mt-2"
                  >
                    Add Selected Members
                  </button>
                </div>
              )}
              {team.members.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mt-4">Replace Member</h3>
                  <div className="flex items-center mb-2">
                    <select
                      value={replaceUserIds[team._id]?.oldUserId || ''}
                      onChange={(e) => setReplaceUserIds((prev) => ({
                        ...prev,
                        [team._id]: { ...prev[team._id], oldUserId: e.target.value }
                      }))}
                      className="p-2 border border-gray-300 rounded-md mr-2"
                    >
                      <option value="">Select old member</option>
                      {team.members.map(member => (
                        <option key={member._id} value={member._id}>{member.name}</option>
                      ))}
                    </select>
                    <select
                      value={replaceUserIds[team._id]?.newUserId || ''}
                      onChange={(e) => setReplaceUserIds((prev) => ({
                        ...prev,
                        [team._id]: { ...prev[team._id], newUserId: e.target.value }
                      }))}
                      className="p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select new member</option>
                      {eligibleUsers[team._id]?.map(user => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleReplaceMember(team._id)}
                      className="p-2 bg-yellow-500 text-white rounded-md ml-2"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No teams available</p>
        )}
      </div>
    </div>
  );
};

export default Teams;
