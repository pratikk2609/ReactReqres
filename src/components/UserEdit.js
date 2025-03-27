// src/components/UserEdit.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UserEdit() {
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      setMessage('User updated successfully');
      setTimeout(() => navigate('/users'), 2000);
    } catch (err) {
      setMessage('Error updating user');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      navigate('/users');
    } catch (err) {
      setMessage('Error deleting user');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            placeholder="First Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          Update
        </button>
        <button type="button" className="btn btn-danger me-2" onClick={handleDelete}>
          Delete
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/users')}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UserEdit;