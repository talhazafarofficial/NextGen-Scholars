'use client';
import { useEffect, useState } from 'react';

export default function EnrolledLists() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/admin/enrolled', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setCourses);
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Courses & Enrollments</h2>
      <p className="dashboard-description">View all courses and enrolled students in a clean table</p>

      <div className="table-wrapper">
        <table className="enrolled-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Title</th>
              <th>Total Students</th>
              <th>Students (Name & Email)</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="no-data">No data available</td>
              </tr>
            ) : (
              courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course.title}</td>
                  <td>{course.count}</td>
                  <td>
                    {course.count > 0 ? (
                      <ul className="student-list-inline">
                        {course.enrolledStudents.map(s => (
                          <li key={s._id}>
                            <span className="student-name">{s.name}</span>
                            <span className="student-email">&nbsp;({s.email})</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="no-students">No students enrolled</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}