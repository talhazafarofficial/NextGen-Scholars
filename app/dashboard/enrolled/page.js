'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EnrolledCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/enroll', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="card-header">
        <h2 className="card-title">My Enrolled Courses</h2>
      </div>
      {loading ? (
        <div className="message">
          Loading...<br />
          Please wait a moment. This demo uses a free-tier database, so loading may take a little longer than usual.
        </div>
      ) : courses.length === 0 ? (
        <div className="message">No enrolled courses found.</div>
      ) : (
        <div className="courses-list">
          {courses.map(enroll => (
            <div className="course-card" key={enroll._id}>
              {enroll.course.image && (
                <img className="course-image" src={enroll.course.image} alt={enroll.course.title} />
              )}
              <div className="course-info">
                <div className="course-header">
                  <span className="course-title">{enroll.course.title}</span>
                  <span className="course-badge">{enroll.course.level}</span>
                </div>
                <div className="course-detail">Instructor: {enroll.course.instructorName}</div>
                <div className="course-detail">Duration: {enroll.course.duration}</div>
                <div className="course-detail">Total Students: {enroll.course.enrolledStudents?.length || 0}</div>
                <div className="course-detail">Status: <b>{enroll.status}</b></div>
                <button className="btn" style={{ marginTop: 12 }} onClick={() => router.push(`/courses/${enroll.course._id}`)}>Detail</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}