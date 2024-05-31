import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Scores = () => {
  const { token } = useSelector((state) => state.user);
  const [scores, setScores] = useState([]);
  const [newScore, setNewScore] = useState({
    event: '',
    team: '',
    score: 0
  });

  useEffect(() => {
    const fetchScores = async () => {
      const response = await axios.get('http://localhost:5000/api/scores');
      setScores(response.data);
    };
    fetchScores();
  }, []);

  const handleChange = (e) => {
    setNewScore({ ...newScore, [e.target.name]: e.target.value });
  };

  const handleAddScore = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/scores', newScore, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const response = await axios.get('http://localhost:5000/api/scores');
    setScores(response.data);
    setNewScore({ event: '', team: '', score: 0 });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Scores</h1>
      <form onSubmit={handleAddScore} className="mb-4">
        <input
          type="text"
          name="event"
          placeholder="Event ID"
          value={newScore.event}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          name="team"
          placeholder="Team ID"
          value={newScore.team}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="number"
          name="score"
          placeholder="Score"
          value={newScore.score}
          onChange={handleChange}
          className="mb-2 p-2 border border-gray-300 rounded-md w-full"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">Add Score</button>
      </form>
      <div>
        {scores.map((score) => (
          <div key={score._id} className="p-4 mb-4 border border-gray-300 rounded-md">
            <h2 className="text-xl font-bold">Event: {score.event.name}</h2>
            <p>Team: {score.team.name}</p>
            <p>Score: {score.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scores;
