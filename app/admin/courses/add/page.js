'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCourse() {
  const [course, setCourse] = useState({
    title: '',
    level: 'beginner',
    description: '',
    instructorName: '',
    duration: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();

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

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    await fetch('/api/courses', {
      method: 'POST',
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
      <h2 className="form-title">Add Course</h2>
      
      <div className="form-group">
        <label className="form-label">Title</label>
        <input className="form-input" placeholder="Title" value={course.title} onChange={e => setCourse({ ...course, title: e.target.value })} />
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
        <textarea className="form-input" placeholder="Description" value={course.description} onChange={e => setCourse({ ...course, description: e.target.value })} />
      </div>

      <div className="form-group">
        <label className="form-label">Instructor Name</label>
        <input className="form-input" placeholder="Instructor Name" value={course.instructorName} onChange={e => setCourse({ ...course, instructorName: e.target.value })} />
      </div>

      <div className="form-group">
        <label className="form-label">Duration</label>
        <input className="form-input" placeholder="Duration (e.g. 10 weeks)" value={course.duration} onChange={e => setCourse({ ...course, duration: e.target.value })} />
      </div>

      <div className="form-group">
        <label className="form-label">Course Image</label>
        <input className="form-input" type="file" accept="image/*" onChange={handleImageChange} />
        {course.image && <img src={course.image} alt="Course" className="preview-image" />}
      </div>

      <div className="form-buttons">
        <button className="btn btn-primary" onClick={handleAdd}>Save</button>
        <button className="btn btn-secondary" onClick={() => router.back()}>Cancel</button>
      </div>
    </div>
  );
}
