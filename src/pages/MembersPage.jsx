import React, { useState, useEffect } from 'react';
import { fetchMembers, createMember } from '../api';

function MembersPage({ showAlert }) {
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [zipcode, setZipcode] = useState('');

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    const data = await fetchMembers();
    setMembers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMember({ email, password, city, street, zipcode });
      showAlert('Member registered successfully!', 'success');
      setEmail('');
      setPassword('');
      setCity('');
      setStreet('');
      setZipcode('');
      loadMembers();
    } catch (error) {
      console.error('Registration error:', error);
      showAlert('Member registration failed.', 'danger');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Member Registration / List</h1>
      <div className="card mb-4">
        <div className="card-header">Register New Member</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Register Member</button>
          </form>
        </div>
      </div>

      <h2 className="my-4">Registered Members</h2>
      <ul className="list-group">
        {members.map((member, index) => (
          <li key={index} className="list-group-item">{member.email} ({member.city}, {member.street}, {member.zipcode})</li>
        ))}
      </ul>
    </div>
  );
}

export default MembersPage;
