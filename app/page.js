"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/courses", { headers: {} })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleEnrollClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      if (decoded.role === "admin") {
        router.push("/admin/dashboard");
      } else if (decoded.role === "student") {
        router.push("/dashboard/courses");
      } else {
        router.push("/login");
      }
    } catch {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

return (
    <div>
      {/* Top Banner */}
      <div className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1>Explore Our Courses</h1>
          <p>Discover world-class education designed to advance your career with expert instructors and top-notch curriculum.</p>
        </div>
      </div>

      {/* Course Card Section */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">All Courses</h2>
          <button className="enroll-btn" onClick={handleEnrollClick}>Enroll</button>
        </div>

        {loading ? (
          <div className="message">
            Loading...<br />
            Please wait a moment. This demo uses a free-tier database, so loading may take a little longer than usual.
          </div>
        ) : courses.length === 0 ? (
          <div className="message">No courses found.</div>
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
                 <button className="btn" style={{ marginTop: 12 }} onClick={() => router.push(`/courses/${c._id}`)}>Detail</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      
      <div className="cta-container">
        <h2>Ready to Start Learning?</h2>
        <p>Join thousands of students who have already transformed their careers with our comprehensive courses and expert instruction.</p>
        <div className="cta-buttons">
          <Link href="/login" className="cta-btn blue">Get Started Today</Link>
          <Link href="/help" className="cta-btn gray">Need Help?</Link>
        </div>
      </div>
    </div>
  );
}