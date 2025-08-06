"use client";

export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="card-header">
        <h2 className="card-title">About Us</h2>
      </div>
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ color: '#2563eb', fontWeight: 600, fontSize: 22 }}>Welcome to NextGen Scholars</h3>
        <p style={{ color: '#374151', margin: '18px 0' }}>
          NextGen Scholars is a modern student portal designed to empower students and administrators with seamless course management, enrollment, and learning tools. Our mission is to make education accessible, engaging, and effective for everyone.
        </p>
        <ul style={{ color: '#374151', fontSize: 16, marginBottom: 24, lineHeight: 1.7 }}>
          <li><b>For Students:</b> Browse, enroll, and track your courses with ease.</li>
          <li><b>For Admins:</b> Manage courses, students, and requests efficiently.</li>
          <li><b>Modern UI:</b> Enjoy a clean, responsive, and intuitive interface.</li>
          <li><b>Secure & Reliable:</b> Your data and progress are always protected.</li>
        </ul>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <span style={{ color: '#6b7280', fontSize: 15 }}>Empowering your learning journey, every step of the way.</span>
        </div>
      </div>
    </div>
  );
}
