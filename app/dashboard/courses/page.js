'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/courses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const enroll = async (courseId) => {
    const token = localStorage.getItem('token');
    await fetch('/api/enroll', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Application submitted. Our team will contact you.');
    router.push('/dashboard');
  };

  return (
    <div className="page-container">
      <div className="card-header">
        <h2 className="card-title">Available Courses</h2>
      </div>
      {/* No enrollMessage UI, alert is used instead */}
      {loading ? (
        <div className="message">
          Loading...<br />
          Please wait a moment. This demo uses a free-tier database, so loading may take a little longer than usual.
        </div>
      ) : courses.length === 0 ? (
        <div className="message">No courses available.</div>
      ) : (
        <div className="courses-list">
          {courses.map((c) => (
            <div className="course-card" key={c._id}>
              {c.image && (
                <img className="course-image" src={c.image} alt={c.title} />
              )}
              <div className="course-info">
                <div className="course-header">
                  <span className="course-title">{c.title}</span>
                  <span className="course-badge">{c.level}</span>
                </div>
                <div className="course-detail">Instructor: {c.instructorName}</div>
                <div className="course-detail">Duration: {c.duration}</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <button className="btn" onClick={() => enroll(c._id)}>Enroll</button>
                  <button className="btn" onClick={() => router.push(`/courses/${c._id}`)}>Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}