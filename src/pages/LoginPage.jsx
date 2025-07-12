import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setIsLoggedIn, showAlert }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      showAlert(`Login successful! Welcome, ${response.email}`, 'success');
      localStorage.setItem('loggedInUser', JSON.stringify(response)); // 로그인 정보 저장
      setIsLoggedIn(true); // App.jsx의 로그인 상태 업데이트
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      showAlert('Login failed. Please check your credentials.', 'danger');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Login</h1>
      <div className="card mb-4">
        <div className="card-header">Login to MyShop</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;