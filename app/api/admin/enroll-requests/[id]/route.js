import dbConnect from '@/lib/dbConnect';
import Enrollment from '@/models/Enrollment';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Approve or reject an enrollment request
export async function PATCH(req, { params }) {
  const { success, user } = verifyToken(req);
  if (!success || user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }
  await dbConnect();
  const { status } = await req.json(); // status: 'approved' or 'rejected'
  if (!['approved', 'rejected'].includes(status)) {
    return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
  }
  const enrollment = await Enrollment.findByIdAndUpdate(
    params.id,
    { status },
    { new: true }
  ).populate('student').populate('course');
  if (!enrollment) {
    return NextResponse.json({ message: 'Enrollment not found' }, { status: 404 });
  }
  // If approved, update Course and User models
  if (status === 'approved') {
    const CourseModel = await import('@/models/Course').then(m => m.default);
    const UserModel = await import('@/models/User').then(m => m.default);
    await CourseModel.findByIdAndUpdate(enrollment.course._id, {
      $addToSet: { enrolledStudents: enrollment.student._id }
    });
    await UserModel.findByIdAndUpdate(enrollment.student._id, {
      $addToSet: { enrolledCourses: enrollment.course._id }
    });
  }
  return NextResponse.json(enrollment);
}
