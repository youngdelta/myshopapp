import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import MembersPage from './pages/MembersPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderStatisticsPage from './pages/OrderStatisticsPage';
import BatchRunnerPage from './pages/BatchRunnerPage';
import BatchDashboardPage from './pages/BatchDashboardPage'; // BatchDashboardPage 임포트
import AlertMessage from './components/AlertMessage';
import { logout } from './api';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const handleCloseAlert = () => {
    setAlert({ message: '', type: '' });
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('loggedInUser');
      setIsLoggedIn(false);
      showAlert('Logged out successfully!', 'success');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      showAlert('Logout failed.', 'danger');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">🛍️ MyShop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/members">Members</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/order-statistics">Order Statistics</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/batch-runner">Batch Runner</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/batch-dashboard">Batch Dashboard</Link> {/* 새로운 메뉴 */}
              </li>
            </ul>
            <ul className="navbar-nav">
              {isLoggedIn ? (
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/cart">🛒 Cart</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4 mb-5" style={{ minHeight: 'calc(100vh - 150px)' }}>
        {alert.message && (
          <AlertMessage message={alert.message} type={alert.type} onClose={handleCloseAlert} />
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/members" element={<MembersPage showAlert={showAlert} />} />
          <Route path="/products" element={<ProductsPage showAlert={showAlert} />} />
          <Route path="/cart" element={<CartPage showAlert={showAlert} />} />
          <Route path="/orders" element={<OrdersPage showAlert={showAlert} />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} showAlert={showAlert} />} />
          <Route path="/order-statistics" element={<OrderStatisticsPage showAlert={showAlert} />} />
          <Route path="/batch-runner" element={<BatchRunnerPage showAlert={showAlert} />} />
          <Route path="/batch-dashboard" element={<BatchDashboardPage showAlert={showAlert} />} /> {/* 새로운 라우트 */}
        </Routes>
      </div>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          <p>&copy; 2025 MyShop. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
