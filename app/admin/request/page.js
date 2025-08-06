'use client';
import { useEffect, useState } from 'react';

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/admin/enroll-requests', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRequests(data);
        } else {
          setRequests([]);
        }
      });
  }, []);

  const handleAction = async (id, status) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/admin/enroll-requests/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    setRequests(requests => requests.filter(r => r._id !== id));
  };

 return (
    <div className="page-container">
      <h2 className="page-title">Enrollment Requests</h2>
      {requests.length === 0 ? (
        <p className="no-data">No pending requests.</p>
      ) : (
        <table className="request-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r._id}>
                <td>{r.student?.email || r.student?._id}</td>
                <td>{r.course?.title || r.course?._id}</td>
                <td>
                  <button className="btn-approve" onClick={() => handleAction(r._id, 'approved')}>Approve</button>
                  <button style={{ marginLeft: 10 }} className="btn-reject" onClick={() => handleAction(r._id, 'rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}