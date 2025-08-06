'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditStudent() {
  const router = useRouter();
  const { id } = useParams();
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`/api/students/${id}`, { headers: { Authorization: `Bearer ${token}` } })
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  })
  .then(setUser)
  .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });
    router.back();
  };

   return (
    <div className="form-container">
      <h2 className="form-title">Edit Student</h2>
      <div className="form-group">
        <label className="form-label">Name</label>
        <input className="form-input" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input className="form-input" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
      </div>
      <div className="form-actions">
        <button className="btn" onClick={handleUpdate}>Save</button>
        <button className="btn cancel" onClick={() => router.back()}>Cancel</button>
      </div>
    </div>
  );
}