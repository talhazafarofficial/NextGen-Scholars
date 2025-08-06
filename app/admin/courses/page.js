'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const router = useRouter();

 useEffect(() => {
  const token = localStorage.getItem('token');
  fetch('/api/courses', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setCourses(data);
      } else {
        setCourses([]);
        // Optionally, show error: alert(data.message || 'Failed to fetch courses');
      }
    })
    .catch(() => setCourses([]));
}, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h2 className="page-title">All Courses</h2>
          <p className="page-subtitle">Manage all your courses in one place</p>
        </div>
        <button className="btn btn-secondary" onClick={() => router.push('/admin/courses/add')}>
          Add New
        </button>
      </div>

      {courses.length === 0 ? (
        <p className="no-data">No courses found.</p>
      ) : (
        <div className="courses-grid">
          {courses.map(c => (
            <div key={c._id} className="course-card">
              {c.image && <img src={c.image} alt={c.title} className="course-image" />}
              <div className="course-content">
                <div className="course-header">
                  <h3 className="course-title">{c.title}</h3>
                  <span className="course-level">{c.level}</span>
                </div>
                <p className="course-meta">Instructor: {c.instructorName}</p>
                <p className="course-meta">Duration: {c.duration}</p>
                <p className="course-meta">Total Students: {c.enrolledStudents ? c.enrolledStudents.length : 0}</p>
                <div className="course-actions">
                  <button className="btn btn-edit" onClick={() => router.push(`/admin/courses/${c._id}/edit`)}>
                    Edit
                  </button>
                  <button
                  style={{ marginLeft: 10 }}
                    className="btn btn-delete"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this course?')) {
                        const token = localStorage.getItem('token');
                        const res = await fetch(`/api/courses/${c._id}`, {
                          method: 'DELETE',
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        if (res.ok) {
                          setCourses(prev => prev.filter(course => course._id !== c._id));
                        } else {
                          alert('Failed to delete course');
                        }
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}