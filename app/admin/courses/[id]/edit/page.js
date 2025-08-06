'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditCourse() {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState({
    title: '',
    level: '',
    description: '',
    instructorName: '',
    duration: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`/api/courses/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(setCourse);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourse(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await fetch(`/api/courses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(course)
    });
    router.back();
  };

return (
  <div className="form-container">
    <h2 className="form-title">Edit Course</h2>

    <div className="form-group">
      <label className="form-label">Title</label>
      <input className="form-input" value={course.title} onChange={e => setCourse({ ...course, title: e.target.value })} />
    </div>

    <div className="form-group">
      <label className="form-label">Level</label>
      <select className="form-input" value={course.level} onChange={e => setCourse({ ...course, level: e.target.value })}>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>

    <div className="form-group">
      <label className="form-label">Description</label>
      <textarea className="form-input" value={course.description} onChange={e => setCourse({ ...course, description: e.target.value })} />
    </div>

    <div className="form-group">
      <label className="form-label">Instructor Name</label>
      <input className="form-input" value={course.instructorName} onChange={e => setCourse({ ...course, instructorName: e.target.value })} />
    </div>

    <div className="form-group">
      <label className="form-label">Duration</label>
      <input className="form-input" value={course.duration} onChange={e => setCourse({ ...course, duration: e.target.value })} />
    </div>

    <div className="form-group">
      <label className="form-label">Course Image</label>
      <input className="form-input" type="file" accept="image/*" onChange={handleImageChange} />
      {course.image && <img src={course.image} alt="Course" className="preview-image" />}
    </div>

    <div className="form-buttons">
      <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
      <button className="btn btn-secondary" onClick={() => router.back()}>Cancel</button>
    </div>
  </div>
);
}
