// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: '#2c3e50' }}>User Directory</h2>
        <button
          className="btn btn-outline-danger"
          onClick={handleLogout}
          style={{ borderRadius: '20px', padding: '8px 20px' }}
        >
          <i className="bi bi-box-arrow-right me-2"></i>Logout
        </button>
      </div>
      <div className="row g-4">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 col-sm-6">
            <div
              className="card shadow-sm h-100"
              style={{
                borderRadius: '15px',
                transition: 'transform 0.2s',
                ':hover': { transform: 'translateY(-5px)' }
              }}
            >
              <div className="position-relative">
                <img
                  src={user.avatar}
                  className="card-img-top"
                  alt="Avatar"
                  style={{ borderRadius: '15px 15px 0 0', height: '200px', objectFit: 'cover' }}
                />
                <span
                  className="position-absolute top-0 end-0 badge bg-primary m-2"
                  style={{ borderRadius: '10px' }}
                >
                  ID: {user.id}
                </span>
              </div>
              <div className="card-body">
                <h5 className="card-title mb-3" style={{ color: '#34495e' }}>
                  {user.first_name} {user.last_name}
                </h5>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-primary flex-grow-1"
                    onClick={() => navigate(`/edit/${user.id}`)}
                    style={{ borderRadius: '20px' }}
                  >
                    <i className="bi bi-pencil me-1"></i>Edit
                  </button>
                  <button
                    className="btn btn-outline-danger flex-grow-1"
                    onClick={() => handleDelete(user.id)}
                    style={{ borderRadius: '20px' }}
                  >
                    <i className="bi bi-trash me-1"></i>Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          style={{ borderRadius: '20px', padding: '8px 20px' }}
        >
          <i className="bi bi-chevron-left"></i> Previous
        </button>
        <span className="badge bg-secondary" style={{ padding: '8px 15px', borderRadius: '20px' }}>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          style={{ borderRadius: '20px', padding: '8px 20px' }}
        >
          Next <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default UserList;