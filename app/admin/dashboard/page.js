'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

export default function AdminDashboard() {
  const router = useRouter();
  const [counts, setCounts] = useState({ students: 0, courses: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== 'admin') {
        return router.push('/dashboard'); // Redirect user if not admin
      }
    } catch (err) {
      console.error('Invalid token');
      return router.push('/login');
    }

    // Fetch data if user is admin
    Promise.all([
      fetch('/api/students', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(async res => {
        if (!res.ok) throw new Error('Students API: ' + (await res.text()));
        return res.json();
      }),
      fetch('/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(async res => {
        if (!res.ok) throw new Error('Courses API: ' + (await res.text()));
        return res.json();
      })
    ])
      .then(([students, courses]) => {
        setCounts({ students: students.length, courses: courses.length });
      })
      .catch(err => {
        alert('Admin dashboard error: ' + err.message);
        router.push('/login');
      });
  }, []);

  const navigate = (path) => router.push(path);

  
  return (
    <div style={{ maxWidth: 900 }} className="admin-dashboard-container" >
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <p className="dashboard-description">
        Welcome to the Admin Panel. From here, you can manage student enrollments, approve user requests, maintain course data, and oversee student records.
      </p>

      <div className="dashboard-stats">
        <div className="stat-card">
          <p className="stat-label">Total Students</p>
          <p className="stat-value">{counts.students}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Total Courses</p>
          <p className="stat-value">{counts.courses}</p>
        </div>
      </div>
 <h2 className="dashboard-title">Quick Actions</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/admin/enrolled')} className="dashboard-button">View Enrollments</button>
        <button onClick={() => navigate('/admin/request')} className="dashboard-button btn2">Approve/Reject Requests</button>
        <button onClick={() => navigate('/admin/students')} className="dashboard-button btn3">Manage Students</button>
        <button onClick={() => navigate('/admin/courses')} className="dashboard-button btn4">Manage Courses</button>
      </div>
    </div>
  );
}
