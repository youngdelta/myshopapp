import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="text-center my-5">
      <h1>Welcome to MyShop!</h1>
      <p className="lead">Your one-stop shop for all your needs.</p>
      <img src="https://picsum.photos/seed/homepage/600/300" alt="Shop Now" className="img-fluid rounded" />
      <div className="mt-4">
        <Link to="/products" className="btn btn-primary btn-lg me-2">Explore Products</Link>
        <Link to="/members" className="btn btn-secondary btn-lg">Register</Link>
      </div>
    </div>
  );
}

export default HomePage;
