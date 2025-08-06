'use client';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/user/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setUser);
  }, []);

  const updateProfile = async () => {
    setError('');
    setSuccess('');
    if (user.password && user.password.length > 0 && user.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    const token = localStorage.getItem('token');
    await fetch('/api/user/update', {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (user.password && user.password.length >= 8) {
      setSuccess('Profile updated');
    } else {
      setSuccess('Profile updated');
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Edit Profile</h2>
      <div className="profile-form">
        {error && <div className="profile-error" style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        {success && <div className="profile-success" style={{ color: 'green', marginBottom: 10 }}>{success}</div>}
        <input
          className="profile-input"
          value={user.name || ''}
          onChange={e => setUser({ ...user, name: e.target.value })}
          placeholder="Name"
        />
        <input
          className="profile-input"
          value={user.email || ''}
          disabled
          placeholder="Email"
        />
        <input
          type="password"
          className="profile-input"
          value={user.password || ''}
          onChange={e => setUser({ ...user, password: e.target.value })}
          placeholder="New Password"
        />
        <button className="profile-button" onClick={updateProfile}>Save</button>
      </div>
    </div>
  );
}
