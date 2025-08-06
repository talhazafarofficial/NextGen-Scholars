'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/students', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error(data.error);
          return;
        }
        setStudents(data);
      })
      .catch(err => console.error('Failed to fetch students:', err));
  }, [router]);

   return (
    <div className="page-container">
      <h2 className="page-title">All Students</h2>
      {students.length === 0 ? (
        <p className="no-data">No students found.</p>
      ) : (
        students.map(stu => (
          <div className="student-card" key={stu._id}>
            <div className="student-row"><strong>Name:</strong> {stu.name}</div>
            <div className="student-row"><strong>Email:</strong> {stu.email}</div>
            <div className="student-row"><strong>Courses Enrolled:</strong> {stu.count}</div>
            {stu.count > 0 && (
              <details className="course-details">
                <summary>Show Courses</summary>
                <div className="course-list">
                  {stu.enrolledCourses.map(c => (
                    <div className="course-item" key={c._id}>{c.title}</div>
                  ))}
                </div>
              </details>
            )}
            <button style={{ marginTop: "25px", marginBottom:"25px" }} className="btn" onClick={() => router.push(`/admin/students/${stu._id}/edit`)}>Edit</button>
          </div>
        ))
      )}
    </div>
  );
}