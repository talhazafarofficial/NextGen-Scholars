import dbConnect from '@/lib/dbConnect';
import Enrollment from '@/models/Enrollment';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { success, user } = verifyToken(req);
  if (!success || user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  await dbConnect();
  // Get all courses with enrolledStudents populated
  const CourseModel = await import('@/models/Course').then(m => m.default);
  const UserModel = await import('@/models/User').then(m => m.default);
  const courses = await CourseModel.find().populate('enrolledStudents');
  // Format response: [{ title, enrolledStudents: [{_id, name, email}], count }]
  const result = courses.map(course => ({
    _id: course._id,
    title: course.title,
    enrolledStudents: course.enrolledStudents.map(s => ({ _id: s._id, name: s.name, email: s.email })),
    count: course.enrolledStudents.length
  }));
  return NextResponse.json(result);
}
