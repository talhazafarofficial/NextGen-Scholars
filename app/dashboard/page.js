'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolledCount, setEnrolledCount] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        localStorage.removeItem('token');
        router.push('/login');
      });

    // Fetch enrolled courses count
    fetch('/api/enroll', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEnrolledCount(data.length);
        } else {
          setEnrolledCount(0);
        }
      })
      .catch(() => setEnrolledCount(0));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const goTo = (path) => router.push(path);

  if (loading) return (
    <div className="dashboard-loading">
      Loading...<br />
      Please wait a moment. This demo uses a free-tier database, so loading may take a little longer than usual.
    </div>
  );

  return (
    <div className="sddashboard-container">

      <h2 className="sddashboard-title">Welcome back, {user.name}!</h2>
      <p className="sddashboard-subtitle">Here’s your learning dashboard</p>

      <div className="sddashboard-grid">
        <div className="sddashboard-left">
          <div className="sddashboard-card">
            <h3 className="sdcard-title">Navigation</h3>
            <div className="button-group" style={{ display: 'flex', gap: '10px' }}>
              <button className="btn2" onClick={() => goTo('/dashboard/courses')}>Available Courses</button>
              <button className="btn3 " onClick={() => goTo('/dashboard/enrolled')}>Enrolled Courses</button>
              <button className="btn4" onClick={() => goTo('/dashboard/profile')}>Edit Profile</button>
            </div>
          </div>


          <div className="sddashboard-card">
            <h3 className="sdcard-title">Profile Info</h3>
            <div className="sdprofile-details">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Total Courses Enrolled:</strong> {enrolledCount !== null ? enrolledCount : '...'}</p>
            </div>
          </div>
        </div>
        <div className="mobileclass sddashboard-card">
          <h3 className="sdcard-title">Recent Activity</h3>
          <ul className="activity-list">
            <li className="activity-item">
              <span className="activity-icon blue"></span>
              New assignment posted in <strong>Advanced Mathematics</strong>
            </li>
            <li className="activity-item">
              <span className="activity-icon green"></span>
              Completed quiz in <strong>Computer Science Fundamentals</strong>
            </li>
            <li className="activity-item">
              <span className="activity-icon orange"></span>
              Upcoming lecture: <strong>Physics Lab</strong> - Tomorrow at 2PM
            </li>
            <li className="activity-item">
              <span className="activity-icon blue"></span>
              Missed deadline for <strong>Data Structures Project</strong>
            </li>
            <li className="activity-item">
              <span className="activity-icon green"></span>
              New course enrolled: <strong>Artificial Intelligence Basics</strong>
            </li>
            <li className="activity-item">
              <span className="activity-icon orange"></span>
              Feedback received on <strong>Web Development Assignment</strong>
            </li>
            <li className="activity-item">
              <span className="activity-icon blue"></span>
              Uploaded assignment in <strong>Database Systems</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
