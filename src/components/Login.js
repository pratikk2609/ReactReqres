// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/users');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
                  Welcome Back
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: '#ecf0f1' }}>
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ borderRadius: '0 5px 5px 0' }}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: '#ecf0f1' }}>
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ borderRadius: '0 5px 5px 0' }}
                      />
                    </div>
                  </div>
                  {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {error}
                      <button type="button" className="btn-close" onClick={() => setError('')}></button>
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 mt-3"
                    style={{
                      background: 'linear-gradient(45deg, #3498db, #2980b9)',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '10px',
                      fontWeight: 'bold'
                    }}
                  >
                    Sign In
                  </button>
                </form>
                <p className="text-center mt-3 text-muted">
                  Use: eve.holt@reqres.in / cityslicka
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;