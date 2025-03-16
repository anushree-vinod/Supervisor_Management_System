// src/components/Login.tsx

import React, { useState } from 'react';
import apiClient from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');  // Renamed to match the variable name for consistency
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message
  const [error, setError] = useState('');  // New state to store error messages
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send login request to the API
      const response = await apiClient.post('/user_management/login/', {
        email: email,  
        password: password,
      });

      //save tokens in localStorage (Ensure your backend sends the correct tokens)
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      setSuccessMessage("Login Successful");
      setTimeout(() => {
        navigate("/"); // Navigate to the dashboard or another protected route
      }, 1000);

    } catch (error: any) {
      console.error('Login failed:', error);
      setSuccessMessage("");
      if (error.response) {
        // Handle different error statuses more gracefully (e.g. wrong credentials)
        setError(error.response.data.detail || 'Invalid username or password');
      } else {
        setError('An error occurred, please try again.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      
      {/* Display error message if login fails */}
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleLogin} style={{ display: 'inline-block', textAlign: 'left' }}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
            placeholder="Enter your email"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Login
        </button>
      </form>

      {/* Show success message if available */}
      {successMessage && <div style={{color: "green", marginTop: "10px", fontSize: "16px"}}>{successMessage}</div>}

    </div>
  );
};

export default Login;
