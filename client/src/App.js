import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Register from './pages/Register';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import Hostels from './pages/Hostels';
import AddHostel from './pages/AddHostel';
import Events from './pages/Events';
import AddEvent from './pages/AddEvent';
import Teams from './pages/Teams';
import Scores from './pages/Scores';
import Users from './pages/Users';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { token } = useSelector((state) => state.user);
  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ProtectedRoute element={ChangePassword} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/hostels" element={<ProtectedRoute element={Hostels} />} />
            <Route path="/add-hostel" element={<AddHostel />} />
            <Route path="/events" element={<ProtectedRoute element={Events} />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/teams" element={<ProtectedRoute element={Teams} />} />
            <Route path="/scores" element={<ProtectedRoute element={Scores} />} />
            <Route path="/users" element={<ProtectedRoute element={Users} />} />
            <Route path="/" element={<h2>Welcome to the Inter-Hostel Tournament Management System</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
