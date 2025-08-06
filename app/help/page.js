"use client";

export default function HelpPage() {
  return (
    <div className="page-container">
      <div className="card-header">
        <h2 className="card-title">Help Center</h2>
      </div>
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ color: '#2563eb', fontWeight: 600, fontSize: 22 }}>How can we help you?</h3>
        <p style={{ color: '#374151', margin: '18px 0' }}>
          Welcome to the NextGen Scholars Help Center. Here you can find answers to common questions, troubleshooting tips, and ways to contact support.
        </p>
        <ul style={{ color: '#374151', fontSize: 16, marginBottom: 24, lineHeight: 1.7 }}>
          <li><b>Forgot your password?</b> Use the <span style={{ color: '#2563eb' }}>reset password</span> available in Profile section.</li>
          <li><b>Need to enroll in a course?</b> Go to the main page and click the <b>Enroll</b> button.</li>
          <li><b>Having trouble accessing your dashboard?</b> Make sure you are logged in with the correct credentials.</li>
          <li><b>Still need help?</b> Contact our support team at <a href="mailto:talhaameer147@gmail.com" style={{ color: '#2563eb' }}>talhaameer147@gmail.com</a>.</li>
        </ul>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <span style={{ color: '#6b7280', fontSize: 15 }}>We’re here to help you succeed!</span>
        </div>
      </div>
    </div>
  );
}
