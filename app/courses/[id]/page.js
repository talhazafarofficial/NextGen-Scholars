"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="message">Loading course details...</div>;
  }
  if (!course || course.error) {
    return <div className="message">Course not found.</div>;
  }

  return (
    <div style={{ margin: "40px auto" }}>
      <div className="course-card" style={{ flexDirection: "row", alignItems: "flex-start", gap: 32, padding: "20px" }}>
        {course.image && (
          <img src={course.image} alt={course.title} className="course-image" style={{ width: 220, height: 160, objectFit: "cover", borderRadius: 8, background: "#e5e7eb" }} />
        )}
        <div className="course-details" style={{ flex: 1 }}>
          <div className="course-header" style={{ marginBottom: 10 }}>
            <h2 className="course-title" style={{ fontSize: 26, margin: 0 }}>{course.title}</h2>
            <span className="course-level level-tag">{course.level}</span>
          </div>
          <div className="course-meta">Instructor: <b>{course.instructorName}</b></div>
          <div className="course-meta">Duration: <b>{course.duration}</b></div>
          <div className="course-meta">Total Students: <b>{course.enrolledStudents ? course.enrolledStudents.length : 0}</b></div>
          <div className="course-description" style={{ marginTop: 18 }}>{course.description}</div>
          <button className="btn" style={{ marginTop: 24 }} onClick={() => router.back()}>Back</button>
        </div>
      </div>
    </div>
  );
}
